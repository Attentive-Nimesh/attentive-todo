import React, {
	useState,
	useEffect,
	useCallback,
	ChangeEvent,
	ReactNode,
} from 'react';
import { Todo } from '../Models/Todo';
import { SelectChangeEvent } from '@mui/material';
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

type TodoContextTypes = {
	tasks: Todo[];
	filteredTasks: Todo[];
	searchFilteredTasks: Todo[];
	filter: string;
	search: string;
	showToast: boolean;
	toastMessage: string;
	createTask: (task: Todo) => void;
	editTask: (task: Todo) => void;
	deleteTask: (taskId: string) => void;
	changeFilter: (e: SelectChangeEvent<string>) => void;
	changeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	clearFilter: () => void;
	toggleToast: () => void;
	toastSuccess: boolean;
};

export const TodoContext = React.createContext<TodoContextTypes>({
	tasks: [],
	filteredTasks: [],
	searchFilteredTasks: [],
	filter: '',
	search: '',
	showToast: false,
	toastMessage: '',
	createTask: (task: Todo) => {},
	editTask: (task: Todo) => {},
	deleteTask: (taskId: string) => {},
	changeFilter: (e: SelectChangeEvent<string>) => {},
	changeSearch: (e: ChangeEvent<HTMLInputElement>) => {},
	clearFilter: () => {},
	toggleToast: () => {},
	toastSuccess: false,
});

const TodoProvider = ({ children }: { children?: ReactNode }) => {
	const [tasks, setTasks] = useState<Todo[]>([]);
	const [filteredTasks, setFilteredTasks] = useState(tasks);
	const [searchFilteredTasks, setSearchFilteredTasks] = useState(tasks);
	const [filter, setFilter] = useState('');
	const [search, setSearch] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastSuccess, setToastSuccess] = useState(false);

	/*
	taking board data from localstorage api if not present setting board data
	for filteredTasks and tasks as well as json version in localstorage
	*/
	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const response = await axios.get('http://localhost:8080/todos');
				if (response.status !== 200) {
					setShowToast(true);
					setToastMessage('Not Fetched Properly');
					return;
				}
				const data: GetTodoType | ErrorType = await response.data;
				if (data.todos) {
					setTasks(data.todos);
					setFilteredTasks(data.todos);
					setSearchFilteredTasks(data.todos);
				} else {
					setShowToast(true);
					setToastMessage(data.error);
					setToastSuccess(false);
				}
			} catch (err) {
				setToastMessage('Fetching Failed, Please Try Again');
				setToastSuccess(false);
				setShowToast(true);
			}
		};

		fetchTodos();
	}, []);

	//setting filter as well as filtering tasks using includes function of string
	const changeFilter = (e: SelectChangeEvent<string>) => {
		setFilter(e.target.value);
		if (e.target.value === '') {
			setFilteredTasks(tasks);
			setSearchFilteredTasks(tasks);
			return;
		}
		const filterTask = tasks.filter(
			(task) => task.assignee === e.target.value
		);
		setFilteredTasks(filterTask);
		setSearchFilteredTasks(filterTask);
	};

	const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setFilteredTasks(
			searchFilteredTasks.filter((t) =>
				t.task.toLowerCase().includes(e.target.value.toLowerCase())
			)
		);
	};

	//clear filter by setting filteredTasks as tasks and filter as empty string
	const clearFilter = () => {
		setFilteredTasks(tasks);
		setSearchFilteredTasks(tasks);
		setFilter('');
	};

	/*
	onCreate in TaskForm will run this createTask
	as per task priority task is pushed at first or last place of task array
	*/
	const createTask = async (task: Todo) => {
		try {
			const response = await axios.post(
				'http://localhost:8080/todos',
				task
			);
			const data: PostTodoType | ErrorType = await response.data;
			if (response.status !== 201) {
				setShowToast(true);
				setToastMessage('Not able to Post');
				return;
			}
			if (data.todo) {
				const createdTasks =
					data.todo.priority === 'high'
						? [data.todo, ...tasks]
						: [...tasks, data.todo];
				setTasks(createdTasks);
				setFilteredTasks(createdTasks);
				setSearchFilteredTasks(createdTasks);
				setToastMessage('Created Successfully');
				setToastSuccess(true);
			} else {
				setToastMessage(data.error);
				setToastSuccess(false);
			}
		} catch (err) {
			setToastMessage('Failed to Create');
			setToastSuccess(false);
		}
		setShowToast(true);
	};

	/*
	onEdit in TaskItem (Tasks -> TaskItems -> TaskItem) will run this editStatusHandler
	task is filtered out of tasks array as per not matching id then it is added as per priority to first or last position
	*/
	const editTask = async (task: Todo) => {
		const editFilterTasks = tasks.filter((t) => t.id !== task.id);
		try {
			const response = await axios.patch(
				`http://localhost:8080/todos/${task.id}`,
				task
			);
			if (response.status !== 201) {
				setShowToast(true);
				setToastMessage('Not able to Update');
				return;
			}
			const data: PostTodoType | ErrorType = await response.data;
			if (data.todo) {
				const editedTasks =
					data.todo.priority === 'high'
						? [data.todo, ...editFilterTasks]
						: [...editFilterTasks, data.todo];
				setTasks(editedTasks);
				setFilteredTasks(editedTasks);
				setSearchFilteredTasks(editedTasks);
				setToastMessage('Edited Successfully');
				setToastSuccess(true);
			} else {
				setToastMessage(data.error);
				setToastSuccess(false);
			}
		} catch (err) {
			setToastMessage('Failed to Update');
			setToastSuccess(false);
		}
		setShowToast(true);
	};

	/*
	onDelete in TaskItem (Tasks -> TaskItems -> TaskItem) will run this 
	filter the current tasks array by checking task.id not equal to current element id
	then setting its isDeleted value as true and pushing
	*/
	const deleteTask = async (taskId: string) => {
		const taskIdx = tasks.findIndex((task) => task.id === taskId);
		try {
			const response = await axios.patch(
				`http://localhost:8080/todos/delete/${taskId}`
			);
			const data: PostTodoType | ErrorType = await response.data;

			if (response.status !== 201) {
				setShowToast(true);
				setToastMessage('Not able to Delete');
				return;
			}

			if (data.todo) {
				const copyTasks = [...tasks];
				copyTasks[taskIdx].isDeleted = true;
				setTasks(copyTasks);
				setFilteredTasks(copyTasks);
				setSearchFilteredTasks(copyTasks);
				setToastMessage('Deleted Successfully');
				setToastSuccess(true);
			} else {
				setToastMessage(data.error);
				setToastSuccess(false);
			}
		} catch (err) {
			setToastMessage('Failed to Delete');
			setToastSuccess(false);
		}
		setShowToast(true);
	};

	const toggleToast = useCallback(() => {
		setShowToast(false);
		setToastMessage('');
	}, []);

	const value = {
		tasks,
		filteredTasks,
		searchFilteredTasks,
		filter,
		search,
		createTask,
		editTask,
		deleteTask,
		changeFilter,
		changeSearch,
		clearFilter,
		showToast,
		toastMessage,
		toggleToast,
		toastSuccess,
	};

	return (
		<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
	);
};

export default TodoProvider;
