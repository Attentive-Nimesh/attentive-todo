import React, { useState, ChangeEvent, useCallback } from 'react';
import { Button, showToast, Toast } from 'elysium-ui';
import classes from './Board.module.css';
import Tasks from '../../Components/Tasks/Tasks';
import TaskForm from '../../Components/CreateTaskForm/TaskForm';
import SearchFilterForm from '../../Components/SearchFilterForm/SearchFilterForm';
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
	const [filter, setFilter] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [search, setSearch] = useState('');

	const { data: tasks, isLoading } = useFetch(false, showToast);

	const changeFilter = useCallback((val: string) => {
		setFilter(val);
	}, []);

	const changeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, []);

	const clearFilter = useCallback(() => {
		setFilter('');
	}, []);

	const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);

	return (
		<>
			<Toast
				newestOnTop={false}
				limit={1}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{showModal && <TaskForm show={showModal} onToggle={toggleModal} />}
			<div className={classes['board-container']}>
				<Button onClick={toggleModal} size="large">
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
														task.task
															.toLowerCase()
															.includes(
																search.toLowerCase()
															)
											  )
										: []
								}
							/>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default Board;
