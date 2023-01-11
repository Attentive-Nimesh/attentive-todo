import TaskItem from '../TaskItem/TaskItem';
import classes from './TaskItems.module.css';

const TaskItems = ({ tasks, onEdit }) => {
	return (
		<ul className={classes.tasks}>
			{tasks.map((data) => (
				<TaskItem key={data.id} {...data} />
			))}
		</ul>
	);
};

export default TaskItems;
