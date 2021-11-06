const { User } = require("../../models/User.model");
const bcryptjs = require("bcryptjs");
// const welcomeEmail = require("../../utils/welcomeEmail");
const randomstring = require("randomstring");

const creatNewUser = async (req, res, next) => {
	try {
		let { fullname, email, password } = req.body;
		 
		if (!fullname || !email || !password)
			return res
				.status(400)
				.json({ success: false, msg: "All fields are required" });

		if (password.length < 6)
			return res
				.status(400)
				.json({ success: false, msg: "Password must be six characters or more" });

		const user_email = await User.findOne({ email });
		if (user_email)
			return res.status(400).json({ success: false, msg: "Email already exists" });

		let hashedPassword = bcryptjs.hashSync(password, 12);

		let secretToken = randomstring.generate(7);
		
		const newUser = new User({
			fullname,
			email,
			password: hashedPassword,
		});

		await newUser.save();
		if (!newUser) return res.status(500).json({ success: false, msg: "An error has occurred" });

		res.status(201).json({
			success: true,
			msg: "User registration successful",
			user: newUser,
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = creatNewUser;
