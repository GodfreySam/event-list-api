const { Todo } = require("../../models/Todo.model");
const getAllTodos = async (req, res) => {
	try {
		const allTodos = await Todo.find({user: req.user}).sort({ _id: -1 });
		if (!allTodos)
			return res.status(500).json({ success: false, msg: "No event found" });
		
		return res.status(200).json({
			success: true,
			msg: "All events",
			allTodos,
		});
	} catch (err) {
		return res.status(500).json({ success: false, msg: err.message });
	}
};

module.exports = getAllTodos;
