const { User } = require("../../models/User.model");
const bcryptjs = require("bcryptjs");
const { compare } = bcryptjs;
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
	try {
		let { userEmail, userPassword } = req.body;

		if (!userEmail | !userPassword)
			return res
				.status(400)
				.json({ success: false, msg: "All fields are required" });

		let userName = userEmail.toLowerCase().replace(/ /g, "");

		let findUser = await User.findOne({ email: userName });

		if (!findUser)
			return res
				.status(400)
				.json({ success: false, msg: "Username does not exist" });

		let userPasswordMatch = await compare(userPassword, findUser.password);

		if (!userPasswordMatch)
			return res
				.status(403)
				.json({ success: false, msg: "Invalid login credential" });

		let token = jwt.sign({ findUser }, process.env.JWT_SECRET, {
			expiresIn: "365d",
		});

		res.status(200).json({
			success: true,
			msg: "Login successful",
			data: {
				token,
				user: {
					...findUser._doc,
					userPassword: "",
				},
			},
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = loginUser;
