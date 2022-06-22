const express = require("express");

const {
  createnotes,
  getasinglenote,
  getallnotes,
  deletenote,
  updateanote,
  deleteall,
} = require("../controller/handlenotes");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.route("/:id").get(getasinglenote).delete(deletenote).patch(updateanote);

router.route("/").post(createnotes).get(getallnotes);

module.exports = router;
