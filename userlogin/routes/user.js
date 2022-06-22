const express = require("express");

const {
  getallnotes,
  createnotes,
  getasinglenote,
  deletenote,
  updateanote,
} = require("../controller/handlelogin");

const router = express.Router();

router.route("/").get(getallnotes).post(createnotes);

router.route("/:id").get(getasinglenote).delete(deletenote).patch(updateanote);

module.exports = router;
