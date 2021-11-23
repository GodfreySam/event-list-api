const { User } = require("../../models/User.model");
const cloudinary = require("cloudinary").v2;
const cloudinarySetup = require("../../config/cloudinarySetup");

const dpUpload = async (req, res) => {
	try {
		let userId = req.user._id;
		if (!req.file)
			return res
				.status(400)
				.json({ success: false, msg: "Please upload an image" });

		let loggedInUser = await User.findById(userId);
		if (!loggedInUser)
			return res
				.status(404)
				.json({ success: false, msg: "Please login to continue" });

		await cloudinarySetup();

		const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
			eager: [
				{ height: 100, width: 100, crop: "fill" },
				{ height: 150, width: 150, crop: "fill" },
			],
		});

		if (!uploadedImage)
			return res
				.status(500)
				.json({ success: false, msg: "An error occurred while uploading" });

		loggedInUser.avatarSmall = uploadedImage.eager[0].secure_url;
		loggedInUser.avatar = uploadedImage.eager[1].secure_url;
		await loggedInUser.save();

		return res.status(201).json({
			success: true,
			msg: "Profile image updated successfully",
			uploadedImage,
		});
	} catch (err) {
		// return res.status(500).json({ success: false, msg: err.message });
		console.log(err);
	}
};

module.exports = dpUpload;
