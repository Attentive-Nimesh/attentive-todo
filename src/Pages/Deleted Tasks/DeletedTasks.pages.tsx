import React, { useContext } from 'react';
import DeletedTaskItem from '../../Components/DeleteTaskItem/DeletedTaskItem';
import classes from './DeletedTasks.module.css';
import { Todo } from '../../Models/Todo';
import { TodoContext } from '../../Store/TodoProvider';

const DeletedTasks = () => {
	const { tasks: deletedTasks } = useContext(TodoContext);

	return (
		<div className={classes['deleted-tasks-container']}>
			<h2>Deleted Tasks</h2>
			{deletedTasks.length === 0 && <p>No Deleted Tasks</p>}
			{deletedTasks.length > 0 && (
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
