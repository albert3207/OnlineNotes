const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./routes/user");
const app = express();

app.use(express.json());

app.use("/", router);

mongoose.connect(process.env.MONGODB_URI);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server starting at ${PORT}`));
