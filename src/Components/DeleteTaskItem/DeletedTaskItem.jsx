import React from 'react';
import classes from './DeletedTaskItem.module.css';

const DeletedTaskItem = ({ task, num }) => {
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
