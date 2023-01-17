import React, { useState, useContext } from 'react';
import InputBox from '../Input/InputBox';
import SelectInput from '../SelectInput/SelectInput';
import Modal from '../Modal/Modal';
import { Todo } from '../../Models/Todo';
import { TodoContext } from '../../Store/TodoProvider';

type TaskFormPropType = {
	show: boolean;
	onToggle: () => void;
	task?: Todo;
};

const TaskForm = ({ show, onToggle, task }: TaskFormPropType) => {
	const [taskMap, setTaskMap] = useState({
		task: task ? task.task : '',
		assignee: task ? task.assignee : '',
		status: task ? task.status : 'Todo',
		priority: task ? task.priority : 'high',
		hours: task ? task.hours : 0,
		days: task ? task.days : 0,
		isDeleted: false,
	});

	const { editTask, createTask } = useContext(TodoContext);

	const clickModalHandler = () => {
		if (task) {
			editTask({ ...taskMap, id: task.id });
		} else {
			createTask(taskMap);
		}

		onToggle();
	};

	const changeValueHandler = (value: string, key: string) =>
		setTaskMap((p) => ({ ...p, [key]: value }));

	return (
		<>
			<Modal
				show={show}
				onClose={onToggle}
				buttonText={task ? 'Save Edit' : 'Create Task'}
				headerText={task ? 'Edit Task' : 'Create a New Task'}
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
					onChange={(e) =>
						changeValueHandler(e.target.value, 'priority')
					}
					value={taskMap.priority}
					sx={{ marginBottom: '1rem' }}
				/>
				<InputBox
					label={'Assignee'}
					onChange={(e) =>
						changeValueHandler(e.target.value, 'assignee')
					}
					value={taskMap.assignee}
					sx={{ marginBottom: '1rem' }}
				/>
				<div className="flex-box">
					<InputBox
						label={'Days'}
						onChange={(e) =>
							changeValueHandler(e.target.value, 'days')
						}
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
					onChange={(e) =>
						changeValueHandler(e.target.value, 'status')
					}
					value={taskMap.status}
					sx={{ marginBottom: '1rem' }}
				/>
			</Modal>
		</>
	);
};

export default TaskForm;
