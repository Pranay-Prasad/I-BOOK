const express = require('express');
const router  = express.Router();
const fetchuser = require('../middleware/Fetchuser');
const Notes = require('../models/Notes');
const {body,validationResult} = require('express-validator');
//Route 1: Get all the Notes using: GET "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);   
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 2: Add Notes using: Post "/api/notes/addnote" login required
router.post('/addnote',fetchuser, [
    body('title','Enter a valid Title').isLength({min:3}),
    body('description','Atleast 5 characters').isLength({min:5})

],async (req,res)=>{
    try {
        const errors  = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {title,description,tags} = req.body;
        const note = new Notes({
            title,description,tags,user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 3: Upade existing Notes using: Post "/api/notes/updatenote" login required
router.put('/updatenote/:id',fetchuser,async (req,res) =>{
    try {
        const {title,description,tags} = req.body;
        //Create a new note object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tags){newNote.tags = tags};
    
        //Find the note to be updated and update
        var note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("NOT FOUND")};
        if(note.user.toString() != req.user.id){
            return res.status(401).send("NOT ALLOWED");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
        res.json({note});
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 4: Delete existing Notes using: Post "/api/notes/deletenote" login required
router.delete('/deletenote/:id',fetchuser,async (req,res) =>{
    try {
        const note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("NOT found")};
        if(note.user.toString() != req.user.id){
            return res.status(401).send("NOT ALLOWED");
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.send("Deleted");
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("Some error occured");
    }
})
module.exports = router