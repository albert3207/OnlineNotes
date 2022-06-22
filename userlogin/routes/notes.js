const express = require("express");

const {
  createnotes,
  getasinglenote,
  getallnotes,
  deletenote,
  updateanote,
  deletemany,
} = require("../controller/handlenotes");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router
  .route(":id")
  .get(verifyJWT, getasinglenote)
  .delete(verifyJWT, deletenote)
  .patch(verifyJWT, updateanote);

router
  .route("")
  .post(verifyJWT, createnotes)
  .delete(verifyJWT, deletemany)
  .get(verifyJWT, getallnotes);

module.exports = router;
