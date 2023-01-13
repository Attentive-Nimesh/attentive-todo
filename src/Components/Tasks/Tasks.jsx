import React from 'react';
import classes from './Tasks.module.css';
import TaskItems from '../TasksItems/TaskItems';

const Tasks = ({ status, tasks, onEdit, onDelete }) => {
	return (
		<div className={classes['tasks-container']}>
			<h3>{status}</h3>
			<TaskItems
				tasks={tasks}
				status={status}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</div>
	);
};

export default Tasks;
