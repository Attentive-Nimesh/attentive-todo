import React from 'react';
import classes from './Tasks.module.css';
import TaskItems from '../TasksItems/TaskItems';

const Tasks = ({ task, tasks, onEdit, onDelete }) => {
	return (
		<div className={classes['tasks-container']}>
			<h3>{task}</h3>
			<TaskItems
				tasks={tasks}
				name={task}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</div>
	);
};

export default Tasks;
