const Todos = require('./models');

exports.getTodos = async (req, res) => {
	const todos = await Todos.find();

	if (!todos && todos.length === 0) {
		return res.status(404).json({ error: 'No Todos Found' });
	}

	return res.status(200).json({
		todos: todos.map((todo) => todo.toObject({ getters: true })),
		message: 'Successfully Fetched Todos',
	});
};

exports.postTodos = async (req, res) => {
	const todos = req.body;
	const newTodo = new Todos(todos);
	await newTodo.save();
	return res.status(201).json({
		todo: newTodo.toObject({ getters: true }),
		message: 'Successfully Created Todo',
	});
};

exports.patchTodos = async (req, res) => {
	const { tid } = req.params;
	const todoData = req.body;
	const todo = await Todos.findById(tid);
	if (!todo) return res.status(404).json({ error: 'Invalid Todo ID' });
	Object.keys(todoData).map((data) => (todo[data] = todoData[data]));
	const savedTodo = await todo.save();
	return res.status(201).json({
		todo: savedTodo.toObject({ getters: true }),
		message: 'Successfully Updated Todo',
	});
};

exports.deleteTodos = async (req, res) => {
	const { tid } = req.params;
	const todo = await Todos.findById(tid);
	if (!todo) return res.status(404).json({ error: 'Invalid Todo ID' });
	todo.isDeleted = true;
	const deletedTodo = await todo.save();
	return res.status(201).json({
		message: 'Successfully Deleted Todo',
		todo: deletedTodo.toObject({ getters: true }),
	});
};
