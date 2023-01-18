import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { Todo } from '../Models/Todo';
import axios from 'axios';

type ErrorType = {
	error: string;
	todos?: null;
	todo?: null;
};

type GetTodoType = {
	message: string;
	todos: Todo[];
};

type PostTodoType = {
	message: string;
	todo: Todo;
};

type ToastType = {
	show: boolean;
	message: string;
	type: 'success' | 'error';
};

type TodoContextTypes = {
	tasks: Todo[];
	toast: ToastType;
	createTask: (task: Todo) => void;
	editTask: (task: Todo) => void;
	deleteTask: (taskId: string) => void;
	toggleToast: () => void;
};

export const TodoContext = React.createContext<TodoContextTypes>({
	tasks: [],
	toast: { show: false, message: '', type: 'success' },
	createTask: (task: Todo) => {},
	editTask: (task: Todo) => {},
	deleteTask: (taskId: string) => {},
	toggleToast: () => {},
});

const createToast = (
	message: string,
	show: boolean,
	type: 'success' | 'error' = 'error'
) => ({
	show,
	type,
	message,
});

const TodoProvider = ({ children }: { children?: ReactNode }) => {
	const [tasks, setTasks] = useState<Todo[]>([]);
	const [toast, setToast] = useState<ToastType>({
		show: false,
		type: 'success',
		message: '',
	});
	const fetchTodos = async () => {
		try {
			const response = await axios.get('http://localhost:8080/todos');
			if (response.status !== 200) {
				setToast(createToast('Not Fetched Properly', true));
				return;
			}
			const data: GetTodoType | ErrorType = await response.data;
			if (data.todos) {
				setTasks(data.todos);
				setToast(createToast('Fetch Successful', true, 'success'));
			} else {
				setToast(createToast(data.error, true));
			}
		} catch (err) {
			setToast(createToast('Fetching Failed, Please Try Again', true));
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const createTask = async (task: Todo) => {
		try {
			const response = await axios.post(
				'http://localhost:8080/todos',
				task
			);
			const data: PostTodoType | ErrorType = await response.data;
			if (response.status !== 201) {
				setToast(createToast('Not able to Post', true));
				return;
			}

			if (data.todo) {
				const createdTasks =
					data.todo.priority === 'high'
						? [data.todo, ...tasks]
						: [...tasks, data.todo];
				setTasks(createdTasks);
				setToast(createToast('Created Successfully', true, 'success'));
			} else {
				setToast(createToast(data.error, true));
			}
		} catch (err) {
			setToast(createToast('Failed to Create', true));
		}
	};

	const editTask = async (task: Todo) => {
		const editFilterTasks = tasks.filter((t) => t.id !== task.id);
		try {
			const response = await axios.patch(
				`http://localhost:8080/todos/${task.id}`,
				task
			);
			if (response.status !== 201) {
				setToast(createToast('Not able to Update', true));
				return;
			}
			const data: PostTodoType | ErrorType = await response.data;
			if (data.todo) {
				const editedTasks =
					data.todo.priority === 'high'
						? [data.todo, ...editFilterTasks]
						: [...editFilterTasks, data.todo];
				setTasks(editedTasks);
				setToast(createToast('Edited Successfully', true, 'success'));
			} else {
				setToast(createToast(data.error, true));
			}
		} catch (err) {
			setToast(createToast('Failed to Update', true));
		}
	};

	const deleteTask = async (taskId: string) => {
		const taskIdx = tasks.findIndex((task) => task.id === taskId);
		try {
			const response = await axios.patch(
				`http://localhost:8080/todos/delete/${taskId}`
			);
			const data: PostTodoType | ErrorType = await response.data;

			if (response.status !== 201) {
				setToast(createToast('Not able to Delete', true));
				return;
			}

			if (data.todo) {
				const copyTasks = [...tasks];
				copyTasks[taskIdx].isDeleted = true;
				setTasks(copyTasks);
				setToast(createToast('Deleted Successfully', true, 'success'));
			} else {
				setToast(createToast(data.error, true));
			}
		} catch (err) {
			setToast(createToast('Failed to Delete', true));
		}
	};

	const toggleToast = useCallback(() => setToast(createToast('', false)), []);

	const value = {
		tasks,
		createTask,
		editTask,
		deleteTask,
		toast,
		toggleToast,
	};

	return (
		<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
	);
};

export default TodoProvider;
