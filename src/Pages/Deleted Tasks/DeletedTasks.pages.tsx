import React from 'react';
import DeletedTaskItem from '../../Components/DeleteTaskItem/DeletedTaskItem';
import classes from './DeletedTasks.module.css';
import { Todo } from '../../Models/Todo';
import { useFetch } from '../../hooks/useApi';
import Loader from '../../Components/Loader/Loader';

const DeletedTasks = () => {
	const { data: deletedTasks, isLoading } = useFetch();

	return (
		<div className={classes['deleted-tasks-container']}>
			<h2>Deleted Tasks</h2>
			{isLoading && <Loader />}
			{!deletedTasks && !isLoading && <p>No Deleted Tasks</p>}
			{!isLoading && deletedTasks && (
				<ul className={classes['deleted-tasks-item']}>
					{deletedTasks
						.filter((task: Todo) => task.isDeleted)
						.map((task, idx) => (
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
