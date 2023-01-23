import React, { useState, ChangeEvent, useCallback } from 'react';
import { Button, SelectChangeEvent } from '@mui/material';
import classes from './Board.module.css';
import Tasks from '../../Components/Tasks/Tasks';
import TaskForm from '../../Components/CreateTaskForm/TaskForm';
import SearchFilterForm from '../../Components/SearchFilterForm/SearchFilterForm';
import Toast from '../../Components/Toast/Toast';
import { createToast } from '../../utils/api';
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
	const [toast, setToast] = useState<ToastType>({
		type: 'error',
		message: '',
	});
	const [filter, setFilter] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [search, setSearch] = useState('');

	const handleNotification = useCallback(
		(data: ToastType) => setToast(data),
		[]
	);
	const { data: tasks, isLoading } = useFetch(handleNotification);

	const changeFilter = useCallback((e: SelectChangeEvent<string>) => {
		setFilter(e.target.value);
	}, []);

	const changeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, []);

	const clearFilter = useCallback(() => {
		setFilter('');
	}, []);

	const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);

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
							tasks
								? tasks.map((t) =>
										!t.isDeleted ? t.assignee : ''
								  )
								: []
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
								tasks={
									tasks
										? filter !== ''
											? tasks.filter(
													(task) =>
														task.status ===
															status &&
														!task.isDeleted &&
														task.task
															.toLowerCase()
															.includes(
																search.toLowerCase()
															) &&
														task.assignee === filter
											  )
											: tasks.filter(
													(task) =>
														task.status ===
															status &&
														!task.isDeleted &&
														task.task
															.toLowerCase()
															.includes(
																search.toLowerCase()
															)
											  )
										: []
								}
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
