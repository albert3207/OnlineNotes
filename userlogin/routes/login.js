const { checkuserlogin } = require("../controller/logincontroller");
const express = require("express");
const router = express.Router();

router.route("").post(checkuserlogin);

module.exports = router;
