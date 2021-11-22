let { Todo } = require("../../models/Todo.model");

const createNewTodo = async (req, res) => {
	try {
		let { event } = req.body;

		if (!event) return res.status(400).json({ msg: "Please type an event" });

		const newTodo = new Todo({
			event,
			user: req.user._id,
		});


		if (!newTodo)
			return res
				.status(500)
				.json({ success: false, msg: "An error has occurred" });

		await newTodo.save();

		return res.status(201).json({
			success: true,
			msg: "Todo event created",
			newTodo,
		});
	} catch (err) {
		return res.status(500).json({ success: false, msg: err.message });
	}
};

module.exports = createNewTodo;
