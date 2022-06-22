const mongoose = require("mongoose");

ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const { Schema } = mongoose;

//creating user in db with uername and password protpery
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER" },
});

const User = mongoose.model("User", userSchema);

module.exports = { User, ROLE };
