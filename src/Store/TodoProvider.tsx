import React, {
	useState,
	useEffect,
	useCallback,
	ChangeEvent,
	ReactNode,
} from 'react';
import { Todo } from '../Models/Todo';
import { SelectChangeEvent } from '@mui/material';

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
});

const TodoProvider = ({ children }: { children?: ReactNode }) => {
	const [tasks, setTasks] = useState<Todo[]>([]);
	const [filteredTasks, setFilteredTasks] = useState(tasks);
	const [searchFilteredTasks, setSearchFilteredTasks] = useState(tasks);
	const [filter, setFilter] = useState('');
	const [search, setSearch] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	/*
	taking board data from localstorage api if not present setting board data
	for filteredTasks and tasks as well as json version in localstorage
	*/
	useEffect(() => {
		const taskDataString = localStorage.getItem('board');
		const tasks_data: Todo[] | null = taskDataString
			? JSON.parse(taskDataString)
			: null;

		if (tasks_data) {
			setTasks(tasks_data);
			setFilteredTasks(tasks_data);
			setSearchFilteredTasks(tasks_data);
		}
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
	const createTask = (task: Todo) => {
		const createdTasks =
			task.priority === 'high' ? [task, ...tasks] : [...tasks, task];

		setTasks(createdTasks);
		setFilteredTasks(createdTasks);
		setSearchFilteredTasks(createdTasks);
		localStorage.setItem('board', JSON.stringify(createdTasks));
		setToastMessage('Created Successfully');
		setShowToast(true);
	};

	/*
	onEdit in TaskItem (Tasks -> TaskItems -> TaskItem) will run this editStatusHandler
	task is filtered out of tasks array as per not matching id then it is added as per priority to first or last position
	*/
	const editTask = (task: Todo) => {
		const editFilterTasks = tasks.filter((t) => t.id !== task.id);
		const editedTasks =
			task.priority === 'high'
				? [task, ...editFilterTasks]
				: [...editFilterTasks, task];
		setTasks(editedTasks);
		setFilteredTasks(editedTasks);
		setSearchFilteredTasks(editedTasks);
		localStorage.setItem('board', JSON.stringify(editedTasks));
		setToastMessage('Edited Successfully');
		setShowToast(true);
	};

	/*
	onDelete in TaskItem (Tasks -> TaskItems -> TaskItem) will run this 
	filter the current tasks array by checking task.id not equal to current element id
	then setting its isDeleted value as true and pushing
	*/
	const deleteTask = (taskId: string) => {
		const taskIdx = tasks.findIndex((task) => task.id === taskId);
		const copyTasks = [...tasks];
		copyTasks[taskIdx].isDeleted = true;
		setTasks(copyTasks);
		setFilteredTasks(copyTasks);
		setSearchFilteredTasks(copyTasks);
		localStorage.setItem('board', JSON.stringify(copyTasks));
		setToastMessage('Deleted Successfully');
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
	};

	return (
		<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
	);
};

export default TodoProvider;
