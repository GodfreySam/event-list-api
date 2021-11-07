const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let todoSchema = new Schema(
	{
		event: String,
		user: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

module.exports = {
	Todo: model("todo", todoSchema),
};
