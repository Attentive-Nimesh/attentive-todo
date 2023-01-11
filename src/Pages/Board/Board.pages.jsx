import { Button } from '@mui/material';
import SelectInput from '../../Components/SelectInput/SelectInput';
import classes from './Board.module.css';
import { TASKS_BOARD_DATA } from './board-data';
import { useState } from 'react';
import Modal from '../../Components/Modal/Modal';
import Tasks from '../../Components/Tasks/Tasks';
import InputBox from '../../Components/Input/InputBox';

const Board = () => {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => setShowModal((prev) => !prev);

	return (
		<>
			{showModal && (
				<Modal
					show={showModal}
					onClose={toggleModal}
					buttonText="Add Task"
					headerText="Create a New Task"
				>
					<InputBox label={'Write a task'} />
					<SelectInput
						label={'Select Status'}
						labelId="select-status"
					/>
				</Modal>
			)}
			<div className={classes['board-container']}>
				<Button variant="contained" onClick={toggleModal}>
					Create Task
				</Button>
				<div className={classes.inputs}>
					<InputBox label={'Search For Tasks'} />
					<SelectInput
						filter={true}
						label="Filter by Assignee"
						labelId={'filter'}
					/>
					<Button variant="contained">Clear Filters</Button>
				</div>
				<div className={classes['tasks-types']}>
					{Object.keys(TASKS_BOARD_DATA).map((task) => (
						<Tasks
							key={task}
							task={task}
							tasks={TASKS_BOARD_DATA[task]}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Board;
