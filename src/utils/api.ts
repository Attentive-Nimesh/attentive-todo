import axios from 'axios';
import { Todo } from '../Models/Todo';

type GetTodoType = {
	message?: string;
	todos?: Todo[];
	error?: string;
};

type PostTodoType = {
	error?: string;
	message?: string;
	todo?: Todo;
};

export const createToast = (
	message: string,
	type: 'success' | 'error' = 'error'
) => ({
	type,
	message,
});

export const getTodos = async () => {
	const response = await axios.get('http://localhost:8080/todos');

	if (response.status !== 200) {
		return createToast('Not Fetched Properly');
	}

	const data: GetTodoType = await response.data;
	return data.todos
		? data.todos
		: createToast(data.error ? data.error : 'Unexpected Error');
};

export const postTodos = async (task: Todo) => {
	const response = await axios.patch(
		`http://localhost:8080/todos/${task.id}`,
		task
	);
	if (response.status !== 201) {
		return createToast('Not able to Update');
	}
	const data: PostTodoType = await response.data;
	return data.todo
		? createToast('Edited Successfully', 'success')
		: createToast(data.error ? data.error : 'Unexpected Error');
};

export const putTodos = async (task: Todo | string, deleted = false) => {
	let response;
	if (deleted) {
		response = await axios.patch(
			`http://localhost:8080/todos/delete/${task}`
		);
	} else if (typeof task === 'object') {
		response = await axios.patch(
			`http://localhost:8080/todos/${task.id}`,
			task
		);
	}

	if (!response || response.status !== 201) {
		return createToast(`Not able to ${deleted ? 'Delete' : 'Update'}`);
	}

	const data: PostTodoType = await response.data;
	return data.todo
		? createToast(
				`${deleted ? 'Deleted' : 'Edited'} Successfully`,
				'success'
		  )
		: createToast(data.error ? data.error : 'Unexpected Error');
};
