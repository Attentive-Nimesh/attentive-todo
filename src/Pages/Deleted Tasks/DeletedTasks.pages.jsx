import { useEffect, useState } from 'react';
import DeletedTaskItem from '../../Components/DeleteTaskItem/DeletedTaskItem';
import classes from './DeletedTasks.module.css';

const DeletedTasks = () => {
	const [deletedTasks, setDeletedTasks] = useState([]);

	useEffect(() => {
		const deleteTasks = JSON.parse(localStorage.getItem('board'));
		if (deleteTasks) {
			setDeletedTasks(deleteTasks);
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
					{deletedTasks
						.filter((task) => task.isDeleted)
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
