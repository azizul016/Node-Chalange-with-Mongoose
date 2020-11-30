const mongoose = require("mongoose");
// const { Schema } = mongoose;

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be required"],
    //   minlength: [3, "Title must be at least min 3 characters"],
    //   maxlength: [10, "Title must be at least max 10 characters"],
    },
    description: {
      type: String,
      required: [true, "Title must be required"],
      minlength: [10, "Title must be at least min 10 characters"],
      maxlength: [100, "Title must be at least max 100 characters"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;
