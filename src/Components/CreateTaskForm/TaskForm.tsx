import React, { useState } from 'react';
import InputBox from '../Input/InputBox';
import SelectInput from '../SelectInput/SelectInput';
import Modal from '../Modal/Modal';
import { Todo } from '../../Models/Todo';
import { useQueryClient } from 'react-query';
import { useCreate, useEdit } from '../../hooks/useApi';
import { showToast } from 'elysium-ui';

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

	const queryClient = useQueryClient();

	const createQuery = useCreate(showToast, () => {
		queryClient.invalidateQueries({ queryKey: ['todos'] });
		onToggle();
	});

	const editQuery = useEdit(showToast, () => {
		queryClient.invalidateQueries({ queryKey: ['todos'] });
		onToggle();
	});

	const clickModalHandler = () => {
		if (task) {
			editQuery.mutate({ ...taskMap, id: task.id });
		} else {
			createQuery.mutate(taskMap);
		}
	};

	const changeValueHandler = (value: string, key: string) => {
		setTaskMap((p) => ({ ...p, [key]: value }));
	};

	return (
		<Modal
			show={show}
			onClose={onToggle}
			buttonText={
				task
					? editQuery.isLoading
						? 'Saving...'
						: 'Save Edit'
					: createQuery.isLoading
					? 'Creating'
					: 'Create Task'
			}
			headerText={task ? 'Edit Task' : 'Create a New Task'}
			onClick={clickModalHandler}
		>
			<div className="form-container">
				<InputBox
					label={'Write a task'}
					onChange={(e) => changeValueHandler(e.target.value, 'task')}
					value={taskMap.task}
					placeholder={'Task'}
				/>
				<SelectInput
					label="Priority"
					items={[
						{ value: 'high', label: 'High' },
						{ value: 'low', label: 'low' },
					]}
					onChange={(val: string) =>
						changeValueHandler(val, 'priority')
					}
					value={taskMap.priority}
				/>
				<InputBox
					label={'Assignee'}
					onChange={(e) =>
						changeValueHandler(e.target.value, 'assignee')
					}
					value={taskMap.assignee}
					placeholder={'Assignee'}
				/>
				<div className="flex-box">
					<div className="input-container">
						<InputBox
							label="Days"
							onChange={(e) =>
								changeValueHandler(e.target.value, 'days')
							}
							value={taskMap.days}
							type="number"
						/>
					</div>
					<div className="input-container">
						<InputBox
							label={'Hours'}
							onChange={(e) =>
								changeValueHandler(e.target.value, 'hours')
							}
							value={taskMap.hours}
							type="number"
						/>
					</div>
				</div>
				<SelectInput
					label={'Select Status'}
					onChange={(val: string) =>
						changeValueHandler(val, 'status')
					}
					value={taskMap.status}
					items={[
						{ label: 'To-Do', value: 'Todo' },
						{ label: 'Progress', value: 'Progress' },
						{ label: 'Completed', value: 'Completed' },
					]}
				/>
			</div>
		</Modal>
	);
};

export default TaskForm;
