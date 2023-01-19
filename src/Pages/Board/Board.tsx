import React, { useState, useContext, ChangeEvent, useEffect } from 'react';
import { Button, SelectChangeEvent } from '@mui/material';
import classes from './Board.module.css';
import Tasks from '../../Components/Tasks/Tasks';
import TaskForm from '../../Components/CreateTaskForm/TaskForm';
import { TodoContext } from '../../Store/TodoProvider';
import SearchFilterForm from '../../Components/SearchFilterForm/SearchFilterForm';
import Toast from '../../Components/Toast/Toast';

enum TASKS_STATUS {
	'Todo' = 'Todo',
	'In-Progress' = 'In-Progress',
	'Completed' = 'Completed',
}

const Board = () => {
	const { tasks, toast, toggleToast } = useContext(TodoContext);

	const [filteredTasks, setFilteredTasks] = useState(tasks);
	const [searchFilteredTasks, setSearchFilteredTasks] = useState(tasks);
	const [filter, setFilter] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [search, setSearch] = useState('');

	useEffect(() => {
		setFilteredTasks(tasks);
		setSearchFilteredTasks(tasks);
	}, [tasks]);

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

	const clearFilter = () => {
		setFilteredTasks(tasks);
		setSearchFilteredTasks(tasks);
		setFilter('');
	};

	const toggleModal = () => setShowModal((prev) => !prev);

	return (
		<>
			{toast.message && <Toast {...toast} onClose={toggleToast} />}
			{showModal && <TaskForm show={showModal} onToggle={toggleModal} />}
			<div className={classes['board-container']}>
				<Button variant="contained" onClick={toggleModal}>
					Create Task
				</Button>
				<SearchFilterForm
					onClear={clearFilter}
					onSearch={changeSearch}
					onFilter={changeFilter}
					filter={filter}
					search={search}
					setItems={
						new Set<string>(
							tasks.map((t) => (!t.isDeleted ? t.assignee : ''))
						)
					}
				/>
				<div className={classes['tasks-types']}>
					{Object.keys(TASKS_STATUS).map((status) => (
						<Tasks
							key={status}
							status={status}
							tasks={filteredTasks.filter(
								(task) =>
									task.status === status && !task.isDeleted
							)}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Board;
