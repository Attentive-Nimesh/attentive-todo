import React from 'react';
import classes from './Tasks.module.css';
import TaskItems from '../TasksItems/TaskItems';

const Tasks = ({ task, tasks }) => {
	return (
		<div className={classes['tasks-container']}>
			<h3>{task}</h3>
			<TaskItems tasks={tasks} />
		</div>
	);
};

export default Tasks;
