import { Button } from '@mui/material';
import classes from './Board.module.css';
import { useEffect, useState } from 'react';
import Tasks from '../../Components/Tasks/Tasks';
import InputBox from '../../Components/Input/InputBox';
import TaskForm from '../../Components/CreateTaskForm/TaskForm';

const Board = () => {
	const [taskMap, setTaskMap] = useState({});
	const [filteredTaskMap, setFilteredTaskMap] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [filter, setFilter] = useState('');
	const [search, setSearch] = useState('');

	/*
	taking board data from localstorage api if not present setting board data
	for filteredTaskMap and taskMap  as well as json version in localstorage
	*/
	useEffect(() => {
		const taskBoard = JSON.parse(localStorage.getItem('board'));
		if (taskBoard) {
			setTaskMap(taskBoard);
			setFilteredTaskMap(taskBoard);
		} else {
			const mp = { Todo: [], 'In-Progress': [], Completed: [] };
			setTaskMap(mp);
			setFilteredTaskMap(mp);
			localStorage.setItem('board', JSON.stringify(mp));
		}
	}, []);

	//toogling modal
	const toggleModal = () => setShowModal((prev) => !prev);

	//setting filter as well as filtering taskmap using includes function of string
	const changeFilterHandler = (e) => {
		setFilter(e.target.value);
		setFilteredTaskMap({
			Todo: taskMap['Todo'].filter((t) =>
				t.assignee.toLowerCase().includes(e.target.value.toLowerCase())
			),
			'In-Progress': taskMap['In-Progress'].filter((t) =>
				t.assignee.toLowerCase().includes(e.target.value.toLowerCase())
			),
			Completed: taskMap['Completed'].filter((t) =>
				t.assignee.toLowerCase().includes(e.target.value.toLowerCase())
			),
		});
	};

	const changeSearchHandler = (e) => {
		setSearch(e.target.value);
		setFilteredTaskMap({
			Todo: taskMap['Todo'].filter((t) =>
				t.task.toLowerCase().includes(e.target.value.toLowerCase())
			),
			'In-Progress': taskMap['In-Progress'].filter((t) =>
				t.task.toLowerCase().includes(e.target.value.toLowerCase())
			),
			Completed: taskMap['Completed'].filter((t) =>
				t.task.toLowerCase().includes(e.target.value.toLowerCase())
			),
		});
	};

	//sclear filter by setting filteredTaskMap as taskMap
	const clearFilterHandler = () => {
		setFilteredTaskMap(taskMap);
		setFilter('');
	};

	/*
	onCreate in TaskForm will run this createTask
	mp created by using task.status as key and as per priority put it on start or end of array
	then setting taskMap, filteredMap as well as localstorage of board key
	*/
	const createTaskHandler = (task) => {
		const mp = {
			...taskMap,
			[task.status]:
				task.priority === 'high'
					? [task, ...taskMap[task.status]]
					: [...taskMap[task.status], task],
		};
		setTaskMap(mp);
		setFilteredTaskMap(mp);
		toggleModal();
		localStorage.setItem('board', JSON.stringify(mp));
	};

	/*
	onEdit in TaskItem (Tasks -> TaskItems -> TaskItem) will run this editStatusHandler
	from prevStatus key the task is filtered using id then 
	mp is created using current status key(can be previous one) and task is put in start or end as per priority
	then setting taskMap, filteredMap as well as localstorage of board key
	*/
	const editStatusHandler = (task, prevStatus) => {
		const tasks = taskMap[prevStatus].filter((t) => t.id !== task.id);
		taskMap[prevStatus] = tasks;
		const mp = {
			...taskMap,
			[task.status]:
				task.priority === 'high'
					? [task, ...taskMap[task.status]]
					: [...taskMap[task.status], task],
		};
		setTaskMap(mp);
		setFilteredTaskMap(mp);
		localStorage.setItem('board', JSON.stringify(taskMap));
	};

	/*
	onDelete in TaskItem (Tasks -> TaskItems -> TaskItem) will run this 
	mp is created by filtering the task id not equal to current item id
	then setting taskMap, filteredMap as well as localstorage of both board as well as delete key
	*/
	const deleteTaskHandler = (task) => {
		const mp = {
			...taskMap,
			[task.status]: taskMap[task.status].filter((t) => t.id !== task.id),
		};
		setTaskMap(mp);
		setFilteredTaskMap(mp);
		localStorage.setItem('board', JSON.stringify(taskMap));
		const deletedItem = JSON.parse(localStorage.getItem('delete'));
		if (deletedItem)
			localStorage.setItem(
				'delete',
				JSON.stringify([...deletedItem, task])
			);
		else localStorage.setItem('delete', JSON.stringify([task]));
	};

	return (
		<>
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
					<InputBox
						label="Filter by Assignee"
						onChange={changeFilterHandler}
						value={filter}
					/>
					<Button variant="contained" onClick={clearFilterHandler}>
						Clear Filters
					</Button>
				</div>
				<div className={classes['tasks-types']}>
					{Object.keys(filteredTaskMap).map((task) => (
						<Tasks
							key={task}
							task={task}
							tasks={filteredTaskMap[task]}
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
