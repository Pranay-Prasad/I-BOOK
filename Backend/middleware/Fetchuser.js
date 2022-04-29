var jwt = require('jsonwebtoken');
const JWT_Secret = "Pranay";
const fetchuser = (req,res,next)=>{
    //get the user from the jwt token and append an ID
    const token  = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token,JWT_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token"});
    }
    
}

module.exports = fetchuser;