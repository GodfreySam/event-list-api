const { Todo } = require("../../models/Todo.model");
const updateTodos = async (req, res) => {
	try {
		const updatedTodo = await Todo.findByIdAndUpdate({_id: req.params.id}, {$set: req.body});
		if (!updatedTodo)
			return res.status(500).json({ success: false, msg: "No such event found" });

		return res.status(200).json({
			success: true,
			msg: "Event updated!",
		});
	} catch (err) {
		return res.status(500).json({ success: false, msg: err.message });
	}
};

module.exports = updateTodos;
