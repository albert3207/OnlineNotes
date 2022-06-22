const express = require("express");
const {
  createuser,
  changepassword,
  getallusers,
  getasingleuser,
  deleteuser,
  deleteall,
} = require("../controller/handleuserlogin");

// const { rolecheck } = require("../middleware/roles");
// const { ROLE } = require("../model/UserModel");

const router = express.Router();

router.route("/").post(createuser).get(getallusers).delete(deleteall);

router
  .route("/:id")
  .patch(changepassword)
  .get(getasingleuser)
  .delete(deleteuser);

module.exports = router;
