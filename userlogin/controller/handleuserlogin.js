const { User } = require("../model/UserModel");
const bcrypt = require("bcrypt");

const getallusers = async (req, res) => {
  try {
    const allusers = await User.find();
    return res.json({ allusers, totalusers: allusers.length });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const getasingleuser = async (req, res) => {
  try {
    const singleuser = await User.findById(req.params.id);
    return res.json({ singleuser });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const createuser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.send("please provide both password and username");
  }
  const hash = await bcrypt.hashSync(req.body.password, 10);

  try {
    const userindb = await User.findOne({
      username: req.body.username,
    });

    if (userindb) {
      return res.send("user already exist");
    }
    const createduser = await User.create({
      username: req.body.username,
      password: hash,
    });
    return res.json({ createduser });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const changepassword = async (req, res) => {
  if (!req.body.password) {
    return res.send("password can not be empty");
  }
  try {
    const olduser = await User.findByIdAndUpdate(req.params.id, {
      password: req.body.password,
    });
    if (!olduser) {
      return res.sendStatus(400);
    }
    const user = await User.findById(req.params.id);
    return res.json({ message: "chnage pswed", user: user });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const deleteuser = async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(200);
  }

  try {
    const deleteduser = await User.findByIdAndDelete(req.params.id);
    return res.json({ message: deleteduser });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const deleteall = async (req, res) => {
  try {
    const deleteone = await User.remove({});
    return res.send(deleteone);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createuser,
  changepassword,
  getallusers,
  getasingleuser,
  deleteuser,
  deleteall,
};
