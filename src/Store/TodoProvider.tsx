import React, { useState, useCallback, ReactNode } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Todo } from '../Models/Todo';
import { getTodos, postTodos, createToast, patchTodos } from '../utils/api';

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
	isTaskLoading: boolean;
	isCreating: boolean;
	isEditing: boolean;
	isDeleting: boolean;
};

export const TodoContext = React.createContext<TodoContextTypes>({
	tasks: [],
	toast: { message: '', type: 'success' },
	createTask: (task: Todo) => {},
	editTask: (task: Todo) => {},
	deleteTask: (taskId: string) => {},
	toggleToast: () => {},
	isTaskLoading: false,
	isCreating: false,
	isDeleting: false,
	isEditing: false,
});

const TodoProvider = ({ children }: { children?: ReactNode }) => {
	const [tasks, setTasks] = useState<Todo[]>([]);
	const [toast, setToast] = useState<ToastType>({
		type: 'success',
		message: '',
	});

	const { isLoading: isTaskLoading } = useQuery({
		queryKey: ['todos'],
		queryFn: getTodos,
		onSuccess: (data: Todo[]) => {
			setTasks(data);
		},
		onError: (err: Error) => {
			setToast(createToast(err.message));
		},
	});

	const createQuery = useMutation({
		mutationFn: (task: Todo) => postTodos(task),
	});

	const putQuery = useMutation({
		mutationFn: (task: Todo) => patchTodos(task),
	});

	const deleteQuery = useMutation({
		mutationFn: (taskId: string) => patchTodos(taskId, true),
	});

	const createTask = async (task: Todo) => {
		createQuery.mutate(task);
	};

	const editTask = async (task: Todo) => {
		putQuery.mutate(task);
	};

	const deleteTask = async (taskId: string) => {
		deleteQuery.mutate(taskId);
	};

	const toggleToast = useCallback(() => setToast(createToast('')), []);

	const value = {
		tasks,
		createTask,
		editTask,
		deleteTask,
		toast,
		toggleToast,
		isTaskLoading,
		isCreating: createQuery.isLoading,
		isEditing: putQuery.isLoading,
		isDeleting: deleteQuery.isLoading,
	};

	return (
		<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
	);
};

export default TodoProvider;
