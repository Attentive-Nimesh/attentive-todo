import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './TaskItem.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import TaskForm from '../CreateTaskForm/TaskForm';

const TaskItem = ({ task, onEdit, onDelete }) => {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const toggleEditModal = () => setEditModal((prev) => !prev);
	const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

	const saveEditHandler = (editTask) => {
		onEdit(editTask);
		toggleEditModal();
	};

	const deleteConfirmHandler = () => {
		onDelete(task.id);
		toggleDeleteModal();
	};

	return (
		<>
			{editModal && (
				<TaskForm
					onCreate={saveEditHandler}
					show={editModal}
					onToggle={toggleEditModal}
					editTask={task}
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
