const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const notes = require("./routes/notes");
const users = require("./routes/users");
const login = require("./routes/login");
const app = express();

app.use(express.json());

app.use("/", users);
app.use("/notes", notes);
app.use("/login", login);

// app.use("/allnotes", allnotes);

app.all("*", (req, res) => {
  return res.send("no routes found");
});

mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server starting at ${PORT}`));
