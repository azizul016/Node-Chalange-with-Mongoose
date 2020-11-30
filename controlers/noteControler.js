const { validationResult } = require("express-validator");
const Note = require("../models/notes")
//get all notes
module.exports.getNotesController =  async (req, res) => {
    try {
      const notes = await Note.find();
      res.send(notes);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

//single notes
module.exports.getNoteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    try {
      const id = req.params.noteId;
      const note = await Note.findById(id).populate('owner', 'firstName lastName');
      if (!note) return res.status(404).send("No Not Found");
      res.send(note);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

//add note
module.exports.addNoteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    try {
      const note = new Note({
        ...req.body,
        owner: req.user._id
      });
      await note.save();
      res.send(note);
    } catch (err) {
      // res.status(400).send("Something failed in server and data can't be saved")
      res.status(400).send(err);
    }
  }

//update note
module.exports.updateNoteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).send(errors.array());
    }
    try {
      const id = req.params.noteId;
      const noteInput = req.body;
      const gotNoteInput = Object.keys(noteInput);
      const allowedUpdates = ["title", "description"];
      const isAllowed = gotNoteInput.every((updates) =>
        allowedUpdates.includes(updates)
      );
      if (!isAllowed) return res.status(400).send("Invalid updates");
      const note = await Note.findOneAndUpdate({ 
        _id: id,
        owner: req.user._id
      }, noteInput, {
        new: true,
        runValidators: true,
      });
      if (!note) return res.status(404).send("Note not found and cannot be updated");
      res.send(note);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

//delete note
module.exports.deleteNoteController = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(404).send(errors.array())
    }
  
   try{
    const id = req.params.noteId;
    const note = await Note.findOneAndDelete({
      _id: id,
      owner: req.user._id
    });
    if(!note) return res.status(404).send("Note Not Found and cannot be deleted");
    res.send(note);
   }catch (err) {
     return res.status(500).send(err);
   }
  }