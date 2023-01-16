import React from 'react';
import { Todo } from '../../Models/Todo';
import classes from './DeletedTaskItem.module.css';

type DeletedTaskItemProps = {
	task: Todo;
	num: number;
};

const DeletedTaskItem = ({ task, num }: DeletedTaskItemProps) => {
	return (
		<li className={classes['deleted-task-item']}>
			<span>{num}.</span>
			<span>{task.task}</span>
			<span>{task.assignee}</span>
			<span>{task.status}</span>
			<span>{task.priority}</span>
			<span>
				{task.days}days {task.hours}hours
			</span>
		</li>
	);
};

export default DeletedTaskItem;
