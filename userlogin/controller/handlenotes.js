const { Note } = require("../model/Notesmodel");
const jwt = require("jsonwebtoken");

const getallnotes = async (req, res) => {
  try {
    const allnotes = await Note.find({ username: req.username });

    return res.json({ allnotes, totalnotes: allnotes.length });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const createnotes = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.send("both  title and  description is required");
  }
  const addnote = await Note.create({
    title,
    description,
    username: req.username,
  });

  return res.json({ addnote });
};

const getasinglenote = async (req, res) => {
  if (!req.params.id) return res.send("no id provided");

  const founditme = await Note.findById(req.params.id);
  if (!founditme) {
    return res.send("no item found");
  }
  if (founditme.username == req.username) {
    return res.json({ message: founditme });
  }
  return res.send("you are not the auther of this note");
};

const deletenote = async (req, res) => {
  if (!req.params.id) return res.send("no notes provided");

  const notetobedeleted = await Note.findById(req.params.id);

  if (!notetobedeleted) return res.send("no note found with the note id");

  if (notetobedeleted.username !== req.username)
    return res.send("invalid note || invalid user");

  const deletednote = await Note.findByIdAndDelete(req.params.id);

  if (!deletednote) {
    return res.send("no item found");
  }

  const restofnotes = await Note.find({ username: req.username });

  return res.json({ restofnotes });
};

const updateanote = async (req, res) => {
  if (!req.body.title && !req.body.description) {
    return res.send("please add something to update");
  }

  const getnote = await Note.findById(req.params.id);

  if (!getnote) return res.send("no note found");

  if (getnote.username != req.username) return res.send("invalid user or item");

  const oldnote = await Note.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    username: req.username,
  });
  if (!oldnote) return res.send("note id is not correct");
  const updateanote = await Note.findById(req.params.id);

  return res.send({ updateanote });
};

const deletemany = async (req, res) => {
  try {
    const deleteditems = await Note.deleteMany({ username: req.username });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getallnotes,
  createnotes,
  getasinglenote,
  deletenote,
  updateanote,
  deletemany,
};
