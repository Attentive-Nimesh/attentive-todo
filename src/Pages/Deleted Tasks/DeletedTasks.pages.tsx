import React, { useEffect, useState } from 'react';
import DeletedTaskItem from '../../Components/DeleteTaskItem/DeletedTaskItem';
import classes from './DeletedTasks.module.css';
import { Todo } from '../../Models/Todo';

const DeletedTasks = () => {
	const [deletedTasks, setDeletedTasks] = useState<Todo[]>([]);

	useEffect(() => {
		const deletedDataString = localStorage.getItem('board');
		const deleteTasks = deletedDataString
			? JSON.parse(deletedDataString)
			: null;

		if (deleteTasks) {
			setDeletedTasks(deleteTasks.filter((task: Todo) => task.isDeleted));
		} else {
			localStorage.setItem('board', JSON.stringify([]));
		}
	}, []);

	return (
		<div className={classes['deleted-tasks-container']}>
			<h2>Deleted Tasks</h2>
			{deletedTasks.length === 0 && <p>No Deleted Tasks</p>}
			{deletedTasks.length > 0 && (
				<ul className={classes['deleted-tasks-item']}>
					{deletedTasks.map((task, idx) => (
						<DeletedTaskItem
							key={task.id}
							task={task}
							num={idx + 1}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default DeletedTasks;
