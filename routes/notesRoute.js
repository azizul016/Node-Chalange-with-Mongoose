const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

//controllers
const {
  getNotesController,
  getNoteController,
  addNoteController,
  updateNoteController,
  deleteNoteController,
} = require("../controlers/noteControler");

//middleware
const { auth } = require("../middleware/auth");

//get all notes;
router.get("/", getNotesController);

//get single note;
router.get(
  "/:noteId",
  [check("noteId", "Note not found").isMongoId()],
  getNoteController
);

//add note
router.post(
  "/",
  [
    auth,
    check("title", "Title is required").notEmpty(),
    // .withMessage("Title must be required")
    // .isLength({ min: 3, max: 10 })
    // .withMessage("Title must be content at least 3 to 10 character"),
    check("description", "Description must be required").notEmpty(),
  ],
  addNoteController
);

//updated note
router.put(
  "/:noteId",
  [
    auth,
    check("noteId", "Note not found").isMongoId(),
    check("title", "Title is required").optional().notEmpty(),
    check("description", "Description must be required").optional().notEmpty(),
  ],
  updateNoteController
);

//delete note
router.delete(
  "/:noteId",
  [auth, check("noteId", "Note not found").isMongoId()],
  deleteNoteController
);

module.exports = router;
