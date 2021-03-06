const { User } = require("../model/UserModel");
const { Note } = require("../model/Notesmodel");
const bcrypt = require("bcrypt");

// 1) import JWT package
const jwt = require("jsonwebtoken");

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

    //2) Create AccessToken and RefreshToken using username as payload and secret saved in .env
    const Accesstoken = jwt.sign(
      { username: req.body.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const Refreshtoken = jwt.sign(
      { username: req.body.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //3) add refresh token to DB and send refresh and access token to frontend

    const createduser = await User.create({
      username: req.body.username,
      password: hash,
      RefreshToken: Refreshtoken,
    });
    // 4) Send Access Token and RefreshToekn to User
    //    send AcessToken to frontend and ask them to store in memory
    //    send RefreshToken to frontend using cookie but secretly (http only)
    //    now create verifyJWT middleware to verify jwt for every incoming request
    res.cookie("jwt", Refreshtoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
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
    const deleteallnotes = await Note.remove({});
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
