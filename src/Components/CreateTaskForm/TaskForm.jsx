import { useState } from 'react';
import InputBox from '../Input/InputBox';
import SelectInput from '../SelectInput/SelectInput';
import Modal from '../Modal/Modal';

const TaskForm = ({ show, onToggle, onCreate, editTask }) => {
	const [taskMap, setTaskMap] = useState({
		task: editTask ? editTask.task : '',
		assignee: editTask ? editTask.assignee : '',
		status: editTask ? editTask.status : 'Todo',
		priority: editTask ? editTask.priority : 'high',
		hours: editTask ? editTask.hours : 0,
		days: editTask ? editTask.days : 0,
	});

	const clickModalHandler = () => {
		onCreate({
			...taskMap,
			id: editTask ? editTask.id : new Date().toISOString(),
			isDeleted: false,
		});
	};

	const changeValueHandler = (value, key) =>
		setTaskMap((p) => ({ ...p, [key]: value }));

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
				onChange={(e) => changeValueHandler(e.target.value, 'task')}
				value={taskMap.task}
				sx={{ marginBottom: '1rem' }}
			/>
			<SelectInput
				label={'Priority'}
				labelId="priority"
				items={[
					{ value: 'high', name: 'High' },
					{ value: 'low', name: 'low' },
				]}
				onChange={(e) => changeValueHandler(e.target.value, 'priority')}
				value={taskMap.priority}
				sx={{ marginBottom: '1rem' }}
			/>
			<InputBox
				label={'Assignee'}
				onChange={(e) => changeValueHandler(e.target.value, 'assignee')}
				value={taskMap.assignee}
				sx={{ marginBottom: '1rem' }}
			/>
			<div className="flex-box">
				<InputBox
					label={'Days'}
					onChange={(e) => changeValueHandler(e.target.value, 'days')}
					value={taskMap.days}
					sx={{
						marginRight: '1rem',
						flex: 1,
					}}
					type="number"
				/>
				<InputBox
					label={'Hours'}
					onChange={(e) =>
						changeValueHandler(e.target.value, 'hours')
					}
					value={taskMap.hours}
					type="number"
					sx={{
						flex: 1,
					}}
				/>
			</div>
			<SelectInput
				label={'Select Status'}
				labelId="select-status"
				onChange={(e) => changeValueHandler(e.target.value, 'status')}
				value={taskMap.status}
				sx={{ marginBottom: '1rem' }}
			/>
		</Modal>
	);
};

export default TaskForm;
