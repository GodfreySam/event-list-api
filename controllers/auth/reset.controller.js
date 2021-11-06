const { User } = require("../../models/User.model");
const resetPasswordEmail = require("../../utils/resetPasswordEmail");
const randomstring = require("randomstring");

const resetPassword = async (req, res, next) => {
	try {
		let { email } = req.body;

		let user = await User.findOne({ email: email });

		if (!user)
			return res.status(400).json({ success: false, msg: "Email not found" });

		let token = randomstring.generate(7);

		user.secretToken = token;
		await	user.save();
		await resetPasswordEmail(req, user.fullname, user.email, user.secretToken);
		res.status(201).json({
			success: true,
			msg: "Please check your email for the reset token.",
      });
      
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = resetPassword;
