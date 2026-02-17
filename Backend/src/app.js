const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("working as fine as wine");
});

app.post("/notes", async (req, res) => {
  const { title, Content } = req.body;

  const note = await noteModel.create({
    title,
    Content,
  });
  res.status(201).json({
    message: "Note created sucessfully",
    note,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Fetch sucessfully",
    notes,
  });
});

app.patch("/notes/title/:id", async (req, res) => {
  // console.log(req.params.id);
  const { title } = req.body;

  const note = await noteModel.findById(req.params.id);
  console.log(note);

  note.title = title;
  await note.save();
  res.json(note);
});

app.patch("/notes/content/:id", async (req, res) => {
  const { Content } = req.body;

  const note = await noteModel.findByIdAndUpdate(
    req.params.id,
    {
      Content: Content,
    },
    { returnDocument: "after" },
  );
  res.status(201).json({
    message: "Content updated successfully",
    note,
  });
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  if (await noteModel.findById(id)) {
    const notes = await noteModel.findByIdAndDelete(id);
    res.status(201).json({
      message: "Note deleted sucessfully",
      notes,
    });
  } else {
    res.status(404).json({
      message: "Note not found",
    });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


module.exports = app;
