import React, { useState, useContext } from 'react';
import classes from './TaskItem.module.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../Modal/Modal';
import TaskForm from '../CreateTaskForm/TaskForm';
import { Todo } from '../../Models/Todo';
import { TodoContext } from '../../Store/TodoProvider';

type TaskItemProp = {
	task: Todo;
};

const TaskItem = ({ task }: TaskItemProp) => {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const { deleteTask } = useContext(TodoContext);

	const toggleEditModal = () => setEditModal((prev) => !prev);
	const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

	const deleteConfirmHandler = () => {
		deleteTask(task.id);
		toggleDeleteModal();
	};

	return (
		<>
			{editModal && (
				<TaskForm
					show={editModal}
					onToggle={toggleEditModal}
					task={task}
				/>
			)}
			{deleteModal && (
				<Modal
					show={deleteModal}
					onClose={toggleDeleteModal}
					headerText={'Confirmation'}
					buttonText="Delete"
					onClick={deleteConfirmHandler}
				>
					<p>Are you sure? you want to delete this task</p>
				</Modal>
			)}
			<li className={classes['tasks-item']}>
				<span>{task.task}</span>
				<span className={classes['task-actions']}>
					<span onClick={toggleEditModal}>
						<EditIcon />
					</span>
					<span onClick={toggleDeleteModal}>
						<DeleteIcon />
					</span>
				</span>
			</li>
		</>
	);
};

export default TaskItem;
