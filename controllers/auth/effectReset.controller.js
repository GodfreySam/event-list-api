const { User } = require("../../models/User.model");
const bcryptjs = require("bcryptjs");

const passwordReset = async (req, res, next) => {
	try {
		let { password, token } = req.body;
		if (password.length < 6)
			return res
				.status(400)
				.json({ success: false, msg: "Password must be six characters or more" });

		if (!token)
			return res
				.status(400)
				.json({ success: false, msg: "Please enter the valid token" });

		let user = await User.findOne({ secretToken: token });
		// console.log(user);
		if (!user)
			return res.status(400).json({
				success: false,
				msg: "Please make sure you have the valid user credentials",
			});

		const salt = await bcryptjs.genSalt();
		const newHashedPassword = await bcryptjs.hash(password, salt);

		user.password = newHashedPassword;
		// console.log(user.password);
		await user.save();
		res.status(201).json({
			success: true,
			msg: "Password reset successfully, you may now login",
		});
		
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = passwordReset;
