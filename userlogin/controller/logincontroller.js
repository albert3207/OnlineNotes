const { User } = require("../model/UserModel");
const { Note } = require("../model/Notesmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkuserlogin = async (req, res) => {
  //1) check if the user entered username and password both
  if (!req.body.username || !req.body.password) {
    return res.send("please add username and password");
  }
  //2) now query the DB
  try {
    //get the user from the DB using username
    const userwithusername = await User.findOne({
      username: req.body.username,
    }).catch((err) => res.json({ messaage: "no user found", message: err }));

    // if the user do not exist
    if (!userwithusername) {
      return res.send("no user found, please sign up");
    }

    const accesstoken = jwt.sign(
      { username: req.body.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshtoken = jwt.sign(
      { username: req.body.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // const id = userwithusername._id.toString();
    //check if the user enetered passwoed matches with the DB password
    if (bcrypt.compareSync(req.body.password, userwithusername.password)) {
      //if matches - send the user their notes        -----------------------------               //TODO

      //sending all user notes  back to the user once they login
      const getallusernotes = await Note.find({ username: req.username });
      res.cookie("jwt", refreshtoken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        message: "you are now in ",
        user: getallusernotes,
        accesstoken,
      });
    }

    //if password do not match
    else {
      return res.json({ message: " invalid password" });
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = { checkuserlogin };
