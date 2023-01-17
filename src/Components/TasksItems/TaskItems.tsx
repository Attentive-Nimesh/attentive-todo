import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import classes from './TaskItems.module.css';
import { TasksProps } from '../Tasks/Tasks';

const TaskItems = ({ tasks, status }: TasksProps) => {
	return (
		<ul className={classes.tasks}>
			{tasks.length > 0 &&
				tasks.map((data) => <TaskItem key={data.id} task={data} />)}
			{tasks.length === 0 && <p>No {status} Tasks</p>}
		</ul>
	);
};

export default TaskItems;
