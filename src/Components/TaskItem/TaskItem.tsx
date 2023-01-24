import React, { useState, DragEvent } from 'react';
import { useQueryClient } from 'react-query';
import classes from './TaskItem.module.css';

import { EditIconFilled, DeleteIcon } from 'elysium-ui';
import Modal from '../Modal/Modal';
import TaskForm from '../CreateTaskForm/TaskForm';
import { Todo } from '../../Models/Todo';
import { ToastType } from '../../Pages/Board/Board';
import { useDelete } from '../../hooks/useApi';

type TaskItemProp = {
	task: Todo;
	showNotification: (data: ToastType) => void;
};

const TaskItem = ({ task, showNotification }: TaskItemProp) => {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [dragClass, setDragClass] = useState(false);
	const queryClient = useQueryClient();

	const toggleEditModal = () => setEditModal((prev) => !prev);
	const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

	const deleteQuery = useDelete(showNotification, () => {
		queryClient.invalidateQueries({ queryKey: ['todos'] });
		toggleDeleteModal();
	});

	const deleteConfirmHandler = () => {
		deleteQuery.mutate(task.id ? task.id : '');
	};

	const onDragStartHandler = (e: DragEvent<HTMLLIElement>) => {
		setDragClass(true);
		e.dataTransfer.setData('todo', JSON.stringify(task));
	};

	const onDragEndHandler = (e: DragEvent<HTMLLIElement>) => {
		setDragClass(false);
	};

	return (
		<>
			{editModal && (
				<TaskForm
					show={editModal}
					onToggle={toggleEditModal}
					task={task}
					showNotification={showNotification}
				/>
			)}
			{deleteModal && (
				<Modal
					show={deleteModal}
					onClose={toggleDeleteModal}
					headerText={'Confirmation'}
					buttonText={deleteQuery.isLoading ? 'Deleting..' : 'Delete'}
					onClick={deleteConfirmHandler}
				>
					<p>Are you sure? you want to delete this task</p>
				</Modal>
			)}
			<li
				className={`${classes['tasks-item']} ${
					dragClass ? classes.drag : ''
				}`}
				draggable
				onDragStart={onDragStartHandler}
				onDragEnd={onDragEndHandler}
			>
				<span>{task.task}</span>
				<span className={classes['task-actions']}>
					<span onClick={toggleEditModal}>
						<EditIconFilled fill={'darkgreen'} />
					</span>
					<span onClick={toggleDeleteModal}>
						<DeleteIcon fill={'red'} />
					</span>
				</span>
			</li>
		</>
	);
};

export default TaskItem;
