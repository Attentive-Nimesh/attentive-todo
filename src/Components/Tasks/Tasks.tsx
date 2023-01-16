import React from 'react';
import classes from './Tasks.module.css';
import TaskItems from '../TasksItems/TaskItems';
import { Todo } from '../../Models/Todo';

export type TasksProps = {
	status: string;
	tasks: Todo[];
	onEdit: (editTask: Todo) => void;
	onDelete: (taskId: string) => void;
};

const Tasks = ({ status, tasks, onEdit, onDelete }: TasksProps) => {
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
