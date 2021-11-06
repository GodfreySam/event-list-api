const express = require("express");
const router = express.Router();
const registerUser = require('../../controllers/auth/register.controller');
const loginUser = require("../../controllers/auth/login.controller");
const resetPassword = require('../../controllers/auth/reset.controller');
const effectResetPassword = require('../../controllers/auth/effectReset.controller');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset", resetPassword);
router.post("/reset-password", effectResetPassword);


module.exports = router;
