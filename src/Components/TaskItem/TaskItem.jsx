import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './TaskItem.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import SelectInput from '../SelectInput/SelectInput';

const TaskItem = ({ task, status }) => {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const toggleEditModal = () => setEditModal((prev) => !prev);
	const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

	return (
		<>
			{editModal && (
				<Modal
					show={editModal}
					onClose={toggleEditModal}
					headerText={'Edit Status'}
					buttonText="Save Status"
				>
					<SelectInput
						label="Select Status"
						labelId="edit-select-label"
						value={status}
					/>
				</Modal>
			)}
			{deleteModal && (
				<Modal
					show={deleteModal}
					onClose={toggleDeleteModal}
					headerText={'Confirmation'}
					buttonText="Delete"
				>
					<p>Are you sure? you want to delete this task</p>
				</Modal>
			)}
			<li className={classes['tasks-item']}>
				<span>{task}</span>
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
