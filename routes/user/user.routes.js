const express = require("express");
const router = express.Router();
const profilePicUpload = require('../../controllers/user/profilePic.controller');
const upload = require('../../config/multerSetup');
const verify = require("../../middleware/authjwt");
const getAvatar = require("../../controllers/user/getAvatar.controller");


router.post(
	"/update-avatar",
	verify,
	upload.single("profilePic"),
	profilePicUpload,
);

router.get("/", verify, getAvatar);


module.exports = router;
