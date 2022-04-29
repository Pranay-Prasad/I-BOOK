const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs'); //Password hasing tool
const jwt = require('jsonwebtoken'); // Token Provider
const JWT_Secret = "Pranay";
const fetchuser = require('../middleware/Fetchuser');
//ROUTE 1: Create a user using: POST "/api/auth/Createuser"
router.post('/Createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','Password should be minimum 3 characters long').isLength({min:3}),
], async (req,res)=>{
    // If found errors return BAD REQUEST
    const errors  = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array()})
    }
    // Check if the User exist or not.
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success,error: "User with this email already exist"});
        }
        success = true;
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        // .then(user => res.json(user))
        // .catch(err=> {console.log(err)
        // res.json({error: 'Please enter a unique value',message: err.message})})
        const data = {
            user:{
                id: user.id
            }
        }
        const token = jwt.sign(data,JWT_Secret);
        res.json({success,token});
        // console.log(token);
    }catch (error){
        // console.error(error.message);
        res.status(500).send("Some error occured");
    }
    
})


//ROUTE 2: Authenticate a user using: POST "/api/auth/login",no login required
router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter a valid password').exists()
], async (req,res)=>{
    // If found errors return BAD REQUEST
    const errors  = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array()})
    }

    const {email,password}= req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success,error: "Incorrect credentials"});
        } 
        const passwordcompare = await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            return res.status(400).json({success,error: "Incorrect credentials"});
        }
        success = true;
        const data = {
            user:{
                id: user.id
            }
        }
        const token = jwt.sign(data,JWT_Secret);
        res.json({success,token});
    }catch (error){
        console.error(error.message);
        res.status(500).send("Internal server occured");
    }
})

//ROUTE 3: loged in User details using: POST "/api/auth/getuser",login required
router.post('/getuser',fetchuser, async (req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch (error){
        console.error(error.message);
        res.status(500).send("Internal server occured");
    }
})

module.exports = router