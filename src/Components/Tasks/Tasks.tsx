import React from 'react';
import classes from './Tasks.module.css';
import TaskItems from '../TasksItems/TaskItems';
import { Todo } from '../../Models/Todo';
import { ToastType } from '../../Pages/Board/Board';

export type TasksProps = {
	status: string;
	tasks: Todo[];
	showNotification: (data: ToastType) => void;
};

const Tasks = ({ status, tasks, showNotification }: TasksProps) => {
	return (
		<div className={classes['tasks-container']}>
			<h3>{status}</h3>
			<TaskItems
				tasks={tasks}
				status={status}
				showNotification={showNotification}
			/>
		</div>
	);
};

export default Tasks;
