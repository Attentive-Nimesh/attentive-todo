import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { Todo } from '../Models/Todo';
import { getTodos, postTodos, putTodos, createToast } from '../utils/api';

export type ToastType = {
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
	toast: { message: '', type: 'success' },
	createTask: (task: Todo) => {},
	editTask: (task: Todo) => {},
	deleteTask: (taskId: string) => {},
	toggleToast: () => {},
});

const TodoProvider = ({ children }: { children?: ReactNode }) => {
	const [tasks, setTasks] = useState<Todo[]>([]);
	const [toast, setToast] = useState<ToastType>({
		type: 'success',
		message: '',
	});

	const fetchTodos = async () => {
		try {
			const response = await getTodos();
			if (Array.isArray(response)) {
				setTasks(response);
			} else {
				setToast(response);
			}
		} catch (err) {
			setToast(createToast('Fetch Failed'));
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const createTask = async (task: Todo) => {
		try {
			const response = await postTodos(task);
			setToast(response);
		} catch (err) {
			setToast(createToast('Failed to Create'));
		}
		fetchTodos();
	};

	const editTask = async (task: Todo) => {
		try {
			const response = await putTodos(task);
			setToast(response);
		} catch (err) {
			setToast(createToast('Failed to Update'));
		}
		fetchTodos();
	};

	const deleteTask = async (taskId: string) => {
		try {
			const response = await putTodos(taskId, true);
			setToast(response);
		} catch (err) {
			setToast(createToast('Failed to Delete'));
		}
		fetchTodos();
	};

	const toggleToast = useCallback(() => setToast(createToast('')), []);

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
