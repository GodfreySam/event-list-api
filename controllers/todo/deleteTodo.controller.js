const { Todo } = require("../../models/Todo.model");

const deleteTodos = async (req, res) => {
	try {
		const id = req.params.id;
		const allTodos = await Todo.findByIdAndDelete({_id: id});
		if (!allTodos)
			return res.status(500).json({ success: false, msg: "No such event found" });

		return res.status(200).json({
			success: true,
			msg: "Todo event deleted!"
		});
	} catch (err) {
		return res.status(500).json({ success: false, msg: err.message });
	}
};

module.exports = deleteTodos;
