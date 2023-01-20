import React, { useState, ChangeEvent, useCallback } from 'react';
import { Button, SelectChangeEvent } from '@mui/material';
import classes from './Board.module.css';
import Tasks from '../../Components/Tasks/Tasks';
import TaskForm from '../../Components/CreateTaskForm/TaskForm';
import SearchFilterForm from '../../Components/SearchFilterForm/SearchFilterForm';
import Toast from '../../Components/Toast/Toast';
import { createToast } from '../../utils/api';
import { Todo } from '../../Models/Todo';
import Loader from '../../Components/Loader/Loader';
import { useFetch } from '../../hooks/useApi';

export type ToastType = {
	message: string;
	type: 'success' | 'error';
};

enum TASKS_STATUS {
	'Todo' = 'Todo',
	'In-Progress' = 'In-Progress',
	'Completed' = 'Completed',
}

const Board = () => {
	const [filteredTasks, setFilteredTasks] = useState<Todo[]>([]);
	const [searchFilteredTasks, setSearchFilteredTasks] = useState<Todo[]>([]);
	const [toast, setToast] = useState<ToastType>({
		type: 'error',
		message: '',
	});
	const [filter, setFilter] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [search, setSearch] = useState('');

	const handleNotification = (data: ToastType) => setToast(data);

	const { data: tasks, isLoading } = useFetch(
		handleNotification,
		(data: Todo[]) => {
			setFilteredTasks(data);
			setSearchFilteredTasks(data);
		}
	);

	const changeFilter = (e: SelectChangeEvent<string>) => {
		setFilter(e.target.value);
		if (e.target.value === '') {
			setFilteredTasks(tasks ? tasks : []);
			setSearchFilteredTasks(tasks ? tasks : []);
			return;
		}
		if (tasks) {
			const filterTask = tasks.filter(
				(task) => task.assignee === e.target.value
			);
			setFilteredTasks(filterTask);
			setSearchFilteredTasks(filterTask);
		}
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
		if (Array.isArray(tasks)) {
			setFilteredTasks(tasks);
			setSearchFilteredTasks(tasks);
		}
		setFilter('');
	};

	const toggleModal = () => setShowModal((prev) => !prev);

	const toggleToast = useCallback(() => setToast(createToast('')), []);

	return (
		<>
			{toast.message && <Toast {...toast} onClose={toggleToast} />}
			{showModal && (
				<TaskForm
					show={showModal}
					onToggle={toggleModal}
					showNotification={handleNotification}
				/>
			)}
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
							tasks?.map((t) => (!t.isDeleted ? t.assignee : ''))
						)
					}
				/>
				{isLoading && <Loader />}
				{!isLoading && (
					<div className={classes['tasks-types']}>
						{Object.keys(TASKS_STATUS).map((status) => (
							<Tasks
								key={status}
								status={status}
								tasks={filteredTasks.filter(
									(task) =>
										task.status === status &&
										!task.isDeleted
								)}
								showNotification={handleNotification}
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default Board;
