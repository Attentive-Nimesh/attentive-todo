import React from 'react';
import classes from './Tasks.module.css';
import TaskItems from '../TasksItems/TaskItems';
import { Todo } from '../../Models/Todo';

export type TasksProps = {
	status: string;
	tasks: Todo[];
};

const Tasks = ({ status, tasks }: TasksProps) => {
	return (
		<div className={classes['tasks-container']}>
			<h3>{status}</h3>
			<TaskItems tasks={tasks} status={status} />
		</div>
	);
};

export default Tasks;
