import React from 'react';
import { Button } from '@mui/material';
import classes from './Board.module.css';
import { useState, useContext } from 'react';
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
	const {
		filteredTasks,
		showToast,
		toastMessage,
		toggleToast,
		toastSuccess,
	} = useContext(TodoContext);
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => setShowModal((prev) => !prev);

	return (
		<>
			{showToast && (
				<Toast
					type={toastSuccess ? 'success' : 'error'}
					message={toastMessage}
					show={showToast}
					onClose={toggleToast}
				/>
			)}
			{showModal && <TaskForm show={showModal} onToggle={toggleModal} />}
			<div className={classes['board-container']}>
				<Button variant="contained" onClick={toggleModal}>
					Create Task
				</Button>
				<SearchFilterForm />
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
