const Note = require("../model/Notesmodel");

const getallnotes = async (req, res) => {
  const allnotes = await Note.find();
  return res.json({ allnotes, lenght: allnotes.length });
};

const createnotes = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.send("noth  title and  description is required");
  }
  const addnote = await Note.create({
    title,
    description,
  });

  return res.json({ addnote });
};

const getasinglenote = async (req, res) => {
  console.log(req.params.id);
  const founditme = await Note.findById(req.params.id);
  if (!founditme) {
    return res.send("no item found");
  }

  return res.json({ message: founditme });
};

const deletenote = async (req, res) => {
  const deletedntoe = await Note.findByIdAndDelete(req.params.id);
  if (!deletedntoe) {
    return res.send("no item found");
  }

  const restofnotes = await Note.find();
  return res.json({ restofnotes });
};

const updateanote = async (req, res) => {
  if (!req.body.title && !req.body.description) {
    return res.send("please add something to update");
  }

  const oldnote = await Note.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
  });
  const updateanote = await Note.findById(req.params.id);

  return res.send({ updateanote });
};

module.exports = {
  getallnotes,
  createnotes,
  getasinglenote,
  deletenote,
  updateanote,
};
