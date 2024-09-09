const express = require("express");
const fetchuser = require("../middelware/fetchuser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes GET "api/notes/fetchuser ", login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    let notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add a new  notes using POST "api/notes/addnote ", login required

router.post(
  "/addnote",
  fetchuser,
  [
    body(
      "title",
      "Enter a valid title, title has at least 3 character"
    ).isLength({ min: 3 }),
    body(
      "description",
      "Enter a valid title, description at least 5 character"
    ).isLength({ min: 5 }),
  ],

  async (req, res) => {
    const { title, description, tag } = req.body;

    try {
      //if there are error ,return bad request
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Update an existing note  PUT "api/notes/updatenote:id ", login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // create a new Note Object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Fonud");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4: Delete an existing note  Delete "api/notes/deletenote:id ", login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
 
  try {
    //find the note to be deleted and deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Fonud");
    }
    // Allow the deletion if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note Has been Deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
