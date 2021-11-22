const { User } = require("../../models/User.model");
const getAvatar = async (req, res) => {
   try {
      let userId = req.user._id;
		let loggedInUser = await User.findById(userId);
		if (!loggedInUser)
			return res
				.status(404)
				.json({ success: false, msg: "Not permitted!" });

		let largeAvi = loggedInUser.avatar;
		let smallAvi = loggedInUser.avatarSmall;

		return res.status(200).json({
			success: true,
			msg: "Profile image updated",
			userAvatar: {largeAvi, smallAvi},
		});
	} catch (err) {
		return res.status(500).json({ success: false, msg: err.message });
	}
};

module.exports = getAvatar;
