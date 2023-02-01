import React, { DragEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import TaskItem from '../TaskItem/TaskItem';
import classes from './TaskItems.module.css';
import { TasksProps } from '../Tasks/Tasks';
import { Todo } from '../../Models/Todo';
import { useEdit } from '../../hooks/useApi';
import { showToast } from 'elysium-ui';

const TaskItems = ({ tasks, status }: TasksProps) => {
	const queryClient = useQueryClient();
	const editQuery = useEdit(showToast, () =>
		queryClient.invalidateQueries({ queryKey: ['todos'] })
	);
	const [dragOverClasses, setDragOverClasses] = useState(false);
	const dragOverHandler = (e: DragEvent<HTMLUListElement>) => {
		e.preventDefault();
		setDragOverClasses(true);
	};

	const onDragLeaveHandler = (e: DragEvent<HTMLUListElement>) => {
		setDragOverClasses(false);
	};

	const onDropHandler = (e: DragEvent<HTMLUListElement>) => {
		setDragOverClasses(false);
		const task: Todo = JSON.parse(e.dataTransfer.getData('todo'));
		if (task.status === status) return;
		if (
			status === 'Todo' ||
			status === 'In-Progress' ||
			status === 'Completed'
		)
			task.status = status;
		editQuery.mutate(task);
	};

	return (
		<ul
			className={`${classes.tasks} ${
				dragOverClasses ? classes.dragover : ''
			}`}
			onDragOver={dragOverHandler}
			onDragLeave={onDragLeaveHandler}
			onDrop={onDropHandler}
		>
			{tasks.length > 0 &&
				tasks.map((data) => <TaskItem key={data.id} task={data} />)}
			{tasks.length === 0 && <p>No {status} Tasks</p>}
		</ul>
	);
};

export default TaskItems;
