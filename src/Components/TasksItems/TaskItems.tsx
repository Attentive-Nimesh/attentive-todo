import React, { DragEvent, useContext, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import classes from './TaskItems.module.css';
import { TasksProps } from '../Tasks/Tasks';
import { Todo } from '../../Models/Todo';
import { TodoContext } from '../../Store/TodoProvider';

const TaskItems = ({ tasks, status }: TasksProps) => {
	const [dragOverClasses, setDragOverClasses] = useState(false);
	const { editTask } = useContext(TodoContext);
	const dragOverHandler = (e: DragEvent<HTMLUListElement>) => {
		e.preventDefault();
		setDragOverClasses(true);
	};

	const onDragLeaveHandler = (e: DragEvent<HTMLUListElement>) => {
		setDragOverClasses(false);
	};

	const onDragEndHandler = (e: DragEvent<HTMLUListElement>) => {
		setDragOverClasses(false);
	};

	const onDropHandler = (e: DragEvent<HTMLUListElement>) => {
		setDragOverClasses(false);
		const task: Todo = JSON.parse(e.dataTransfer.getData('json'));
		if (task.status === status) return;
		if (
			status === 'Todo' ||
			status === 'In-Progress' ||
			status === 'Completed'
		)
			task.status = status;
		editTask(task);
	};

	return (
		<ul
			className={`${classes.tasks} ${
				dragOverClasses ? classes.dragover : ''
			}`}
			onDragOver={dragOverHandler}
			onDragLeave={onDragLeaveHandler}
			onDragEnd={onDragEndHandler}
			onDrop={onDropHandler}
		>
			{tasks.length > 0 &&
				tasks.map((data) => <TaskItem key={data.id} task={data} />)}
			{tasks.length === 0 && <p>No {status} Tasks</p>}
		</ul>
	);
};

export default TaskItems;
