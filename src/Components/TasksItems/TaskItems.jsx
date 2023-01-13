import TaskItem from '../TaskItem/TaskItem';
import classes from './TaskItems.module.css';

const TaskItems = ({ tasks, onEdit, onDelete, status }) => {
	return (
		<ul className={classes.tasks}>
			{tasks.length > 0 &&
				tasks.map((data) => (
					<TaskItem
						key={data.id}
						task={data}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				))}
			{tasks.length === 0 && <p>No {status} Tasks</p>}
		</ul>
	);
};

export default TaskItems;
