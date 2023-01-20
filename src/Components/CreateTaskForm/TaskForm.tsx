import React, { useState } from 'react';
import InputBox from '../Input/InputBox';
import SelectInput from '../SelectInput/SelectInput';
import Modal from '../Modal/Modal';
import { Todo } from '../../Models/Todo';
import { ToastType } from '../../Pages/Board/Board';
import { useQueryClient } from 'react-query';
import { useCreate, useEdit } from '../../hooks/useApi';

type TaskFormPropType = {
	show: boolean;
	onToggle: () => void;
	task?: Todo;
	showNotification: (data: ToastType) => void;
};

const TaskForm = ({
	show,
	onToggle,
	task,
	showNotification,
}: TaskFormPropType) => {
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

	const createQuery = useCreate(showNotification, () => {
		queryClient.invalidateQueries({ queryKey: ['todos'] });
		onToggle();
	});

	const editQuery = useEdit(showNotification, () => {
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

	const changeValueHandler = (value: string, key: string) =>
		setTaskMap((p) => ({ ...p, [key]: value }));

	return (
		<>
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
