import { useMutation, useQuery } from 'react-query';
import { Todo } from '../Models/Todo';
import { patchTodos, postTodos, getTodos } from '../utils/api';

export const useEdit = (
	fn: (message: string, type: string) => void,
	remainingFn: () => void
) =>
	useMutation({
		mutationFn: (data: Todo) => patchTodos(data),
		onSuccess: () => {
			fn('Successfully Edited', 'success');
			remainingFn();
		},
		onError: (err: Error) => fn(err.message, 'error'),
	});

export const useCreate = (
	fn: (message: string, type: string) => void,
	remainingFn: () => void
) =>
	useMutation({
		mutationFn: (data: Todo) => postTodos(data),
		onSuccess: () => {
			fn('Successfully Created', 'success');
			remainingFn();
		},
		onError: (err: Error) => fn(err.message, 'error'),
	});

export const useDelete = (
	fn: (message: string, type: string) => void,
	remainingFn: () => void
) =>
	useMutation({
		mutationFn: (data: string) => patchTodos(data, true),
		onSuccess: () => {
			fn('Successfully Deleted', 'success');
			remainingFn();
		},
		onError: (err: Error) => fn(err.message, 'error'),
	});

export const useFetch = (
	isDeleted: boolean,
	fn: (message: string, type: string) => void,
	successfn?: (data: Todo[]) => void
) =>
	useQuery({
		queryKey: isDeleted ? ['todos'] : ['deleted-todos'],
		queryFn: () => getTodos(isDeleted),
		onSuccess: (data) => {
			if (successfn) successfn(data);
		},
		onError: (err: Error) => {
			if (fn) fn(err.message, 'error');
		},
	});
