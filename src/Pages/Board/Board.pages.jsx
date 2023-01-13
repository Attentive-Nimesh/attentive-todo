import { Button } from '@mui/material';
import classes from './Board.module.css';
import { useEffect, useState } from 'react';
import Tasks from '../../Components/Tasks/Tasks';
import InputBox from '../../Components/Input/InputBox';
import TaskForm from '../../Components/CreateTaskForm/TaskForm';
import Toast from '../../Components/Toast/Toast';
import SelectInput from '../../Components/SelectInput/SelectInput';

const TASKS_STATUS = {
	TODO: 'Todo',
	IN_PROGRESS: 'In-Progress',
	COMPLETED: 'Completed',
};

const Board = () => {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [searchFilteredTasks, setSearchFilteredTasks] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState('success');
	const [filter, setFilter] = useState('');
	const [search, setSearch] = useState('');

	/*
	taking board data from localstorage api if not present setting board data
	for filteredTasks and tasks as well as json version in localstorage
	*/
	useEffect(() => {
		const tasks_data = JSON.parse(localStorage.getItem('board'));
		if (tasks_data) {
			setTasks(tasks_data);
			setFilteredTasks(tasks_data);
			setSearchFilteredTasks(tasks_data);
		}
	}, []);

	useEffect(() => {
		let timer;
		if (showToast) {
			timer = setTimeout(() => setShowToast(false), 5000);
		}
		return () => clearTimeout(timer);
	}, [showToast]);

	//toogling modal
	const toggleModal = () => setShowModal((prev) => !prev);

	//setting filter as well as filtering tasks using includes function of string
	const changeFilterHandler = (e) => {
		setFilter(e.target.value);
		const filterTask = tasks.filter(
			(task) =>
				task.assignee.toLowerCase() === e.target.value.toLowerCase()
		);
		setFilteredTasks(filterTask);
		setSearchFilteredTasks(filterTask);
	};

	const changeSearchHandler = (e) => {
		setSearch(e.target.value);
		setFilteredTasks(
			searchFilteredTasks.filter((t) =>
				t.task.toLowerCase().includes(e.target.value)
			)
		);
	};

	//clear filter by setting filteredTasks as tasks and filter as empty string
	const clearFilterHandler = () => {
		setFilteredTasks(tasks);
		setSearchFilteredTasks(tasks);
		setFilter('');
	};

	/*
	onCreate in TaskForm will run this createTask
	as per task priority task is pushed at first or last place of task array
	*/
	const createTaskHandler = (task) => {
		const createdTasks =
			task.priority === 'high' ? [task, ...tasks] : [...tasks, task];

		setTasks(createdTasks);
		setFilteredTasks(createdTasks);
		localStorage.setItem('board', JSON.stringify(createdTasks));
		toggleModal();
		setToastMessage('Created Task Successfully');
		setToastType('success');
		setShowToast(true);
	};

	/*
	onEdit in TaskItem (Tasks -> TaskItems -> TaskItem) will run this editStatusHandler
	task is filtered out of tasks array as per not matching id then it is added as per priority to first or last position
	*/
	const editStatusHandler = (task) => {
		const editFilterTasks = tasks.filter((t) => t.id !== task.id);
		const editedTasks =
			task.priority === 'high'
				? [task, ...editFilterTasks]
				: [...editFilterTasks, task];
		setTasks(editedTasks);
		setFilteredTasks(editedTasks);
		localStorage.setItem('board', JSON.stringify(editedTasks));
		setToastMessage('Edited Task Successfully');
		setToastType('success');
		setShowToast(true);
	};

	/*
	onDelete in TaskItem (Tasks -> TaskItems -> TaskItem) will run this 
	filter the current tasks array by checking task.id not equal to current element id
	then setting its isDeleted value as true and pushing
	*/
	const deleteTaskHandler = (taskId) => {
		const taskIdx = tasks.findIndex((task) => task.id === taskId);
		const copyTasks = [...tasks];
		copyTasks[taskIdx].isDeleted = true;
		setTasks(copyTasks);
		setFilteredTasks(copyTasks);
		localStorage.setItem('board', JSON.stringify(copyTasks));
		setToastMessage('Deleted Task Successfully');
		setToastType('success');
		setShowToast(true);
	};

	return (
		<>
			{showToast && <Toast type={toastType} message={toastMessage} />}
			{showModal && (
				<TaskForm
					onCreate={createTaskHandler}
					show={showModal}
					onToggle={toggleModal}
				/>
			)}
			<div className={classes['board-container']}>
				<Button variant="contained" onClick={toggleModal}>
					Create Task
				</Button>
				<div className={classes.inputs}>
					<InputBox
						label={'Search For Tasks'}
						onChange={changeSearchHandler}
						value={search}
					/>
					<SelectInput
						label="Filter by Assignee"
						onChange={changeFilterHandler}
						value={filter}
						setItems={new Set(tasks.map((task) => task.assignee))}
					/>
					<Button variant="contained" onClick={clearFilterHandler}>
						Clear Filters
					</Button>
				</div>
				<div className={classes['tasks-types']}>
					{Object.keys(TASKS_STATUS).map((status) => (
						<Tasks
							key={status}
							status={TASKS_STATUS[status]}
							tasks={filteredTasks.filter(
								(task) =>
									task.status === TASKS_STATUS[status] &&
									!task.isDeleted
							)}
							onEdit={editStatusHandler}
							onDelete={deleteTaskHandler}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Board;
