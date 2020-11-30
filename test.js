const express = require("express");
const app = express();

//middleware;
app.use(express.json());

const port = 2020;

let notes = [
  {
    id: 1,
    title: "Note id 1",
    description: "Note description 1",
  },
  {
    id: 2,
    title: "Note id 2",
    description: "Note description 2",
  },
  {
    id: 3,
    title: "Note id 3",
    description: "Note description 3",
  },
];

//Get home page
app.get("/", (req, res) => {
  res.send("This is note application of home page.");
});

//get all notes;
app.get("/notes", (req, res) => {
  if (notes.length === 0) return res.send("No Notes Found.");
  res.send(notes);
});

//get single note;
app.get("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find((note) => note.id === noteId);
  if (note) return res.send(note);
  res.status(404).send("Note Not Found");
});

//add note
app.post("/notes", (req, res) => {
  const note = req.body;
  notes = [...notes, note];
  res.send(notes);
});

//updated note
app.put("/notes/:noteId", (req, res) => {
  const noteId = parseInt(req.params.noteId);
  const noteInput = req.body;
  const gotNoteInput = Object.keys(noteInput);
  const allowedUpdates = ["title", "description"];
  try {
    const isAllowed = gotNoteInput.every((updates) =>
      allowedUpdates.includes(updates)
    );
    if (!isAllowed) {
      return res.status(500).send("Invalid Operation");
    }
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      //success update
      notes = notes.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            ...noteInput,
          };
        } else {
          return note;
        }
      });
      return res.send(notes);
    } else {
      //Deal with note that not Found
      return res.status(404).send("Note not found");
    }
  } catch (err) {
    //server error
    res.status(500).send("Internal Server Error");
  }
});

//delete note
app.delete("/notes/:noteId", (req, res) => {
  const noteId = parseInt(req.params.noteId);
  try {
    //find the note
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      notes = notes.filter((note) => note.id !== noteId);
      res.send(notes);
    } else {
      //note not Found
      res.status(404).send("Note not found or unable to update");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
//Not Found
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server in created and listening on port ${port}`);
});

///// fOR lEARNING PURPOSE

// app.get("/hello", (req, res) => {
//     res.send("Hello Azizul")
// });
// app.get("/hello/:name/:age", (req, res) => {
//     const name = req.params.name;
//     const age = req.params.age;
// res.send(`Hello ${age}`)
// })

// app.get('/fruit/:fruitName/:fruitColor', function(req, res) {
//     // console.log(req.params.fruitName  );
//     // console.log(req.params.fruitColor  );
//     const name = req.params.fruitName;
//     const color = req.params.fruitColor;
//     // var data = {
//     //     "fruit": {
//     //         "apple": req.params.fruitName,
//     //         "color": req.params.fruitColor
//     //     }
//     // };

//     // res.send(data);
//     res.send(`${name} ${color}`);
// });
