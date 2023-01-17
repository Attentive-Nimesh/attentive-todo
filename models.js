const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
	task: {
		type: String,
		required: true,
	},
	assignee: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	hours: {
		type: Number,
		required: true,
	},
	days: {
		type: Number,
		required: true,
	},
	priority: {
		type: String,
		required: true,
	},
	isDeleted: {
		type: Boolean,
		required: true,
	},
});

const Todos = model('Todos', todoSchema);
module.exports = Todos;
