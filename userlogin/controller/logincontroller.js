const { User } = require("../model/UserModel");
const { Note } = require("../model/Notesmodel");
const bcrypt = require("bcrypt");

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

    // const id = userwithusername._id.toString();
    //check if the user enetered passwoed matches with the DB password
    if (bcrypt.compareSync(req.body.password, userwithusername.password)) {
      //if matches - send the user thir nots        -----------------------------               //TODO
      // const user = await User.findById(id);

      return res.json({ message: "you are now in ", user: userwithusername });
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
