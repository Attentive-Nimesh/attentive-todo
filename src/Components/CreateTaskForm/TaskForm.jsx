import { useState } from 'react';
import InputBox from '../Input/InputBox';
import SelectInput from '../SelectInput/SelectInput';
import Modal from '../Modal/Modal';

const TaskForm = ({ show, onToggle, onCreate, editTask }) => {
	const [task, setTask] = useState(editTask ? editTask.task : '');
	const [assignee, setAssignee] = useState(editTask ? editTask.assignee : '');
	const [status, setStatus] = useState(editTask ? editTask.status : 'Todo');
	const [priority, setPriority] = useState(
		editTask ? editTask.priority : 'high'
	);
	const [hours, setHours] = useState(editTask ? editTask.hours : 0);
	const [days, setDays] = useState(editTask ? editTask.days : 0);

	const changeTaskHandler = (e) => setTask(e.target.value);
	const changeStatusHandler = (e) => setStatus(e.target.value);
	const changePriorityHandler = (e) => setPriority(e.target.value);
	const changeHoursHandler = (e) => setHours(e.target.value);
	const changeDaysHandler = (e) => setDays(e.target.value);
	const changeAssigneeHandler = (e) => setAssignee(e.target.value);

	const clickModalHandler = () => {
		const newtask = {
			task,
			assignee,
			status,
			priority,
			hours,
			days,
			id: editTask ? editTask.id : new Date().toISOString(),
			isDeleted: false,
		};
		onCreate(newtask);
	};

	return (
		<Modal
			show={show}
			onClose={onToggle}
			buttonText={editTask ? 'Save Edit' : 'Create Task'}
			headerText={editTask ? 'Edit Task' : 'Create a New Task'}
			onClick={clickModalHandler}
		>
			<InputBox
				label={'Write a task'}
				onChange={changeTaskHandler}
				value={task}
				sx={{ marginBottom: '1rem' }}
			/>
			<SelectInput
				label={'Priority'}
				labelId="priority"
				items={[
					{ value: 'high', name: 'High' },
					{ value: 'low', name: 'low' },
				]}
				value={priority}
				onChange={changePriorityHandler}
				sx={{ marginBottom: '1rem' }}
			/>
			<InputBox
				label={'Assignee'}
				onChange={changeAssigneeHandler}
				value={assignee}
				sx={{ marginBottom: '1rem' }}
			/>
			<div className="flex-box">
				<InputBox
					label={'Days'}
					onChange={changeDaysHandler}
					value={days}
					sx={{
						marginBottom: '1rem',
						marginRight: '1rem',
						flex: 1,
					}}
					type="number"
				/>
				<InputBox
					label={'Hours'}
					noFullWidth={true}
					onChange={changeHoursHandler}
					value={hours}
					type="number"
					sx={{
						marginBottom: '1rem',
						flex: 1,
					}}
				/>
			</div>
			<SelectInput
				label={'Select Status'}
				labelId="select-status"
				value={status}
				onChange={changeStatusHandler}
				sx={{ marginBottom: '1rem' }}
			/>
		</Modal>
	);
};

export default TaskForm;
