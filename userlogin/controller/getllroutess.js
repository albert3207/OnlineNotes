const { Note } = require("../model/Notesmodel");

const getallroutes = async (req, res) => {
  //   const allnotes = await Note.findOne({});

  return res.json("hello");
};

module.exports = getallroutes;
