const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Fetch sucessfully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
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

module.exports = app;
