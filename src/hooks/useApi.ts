import { useMutation, useQuery } from 'react-query';
import { Todo } from '../Models/Todo';
import { ToastType } from '../Pages/Board/Board';
import { createToast, patchTodos, postTodos, getTodos } from '../utils/api';

export const useEdit = (
	fn: (data: ToastType) => void,
	remainingFn: () => void
) =>
	useMutation({
		mutationFn: (data: Todo) => patchTodos(data),
		onSuccess: () => {
			fn(createToast('Successfully Created', 'success'));
			remainingFn();
		},
		onError: (err: Error) => fn(createToast(err.message)),
	});

export const useCreate = (
	fn: (data: ToastType) => void,
	remainingFn: () => void
) =>
	useMutation({
		mutationFn: (data: Todo) => postTodos(data),
		onSuccess: () => {
			fn(createToast('Successfully Edited', 'success'));
			remainingFn();
		},
		onError: (err: Error) => fn(createToast(err.message)),
	});

export const useDelete = (
	fn: (data: ToastType) => void,
	remainingFn: () => void
) =>
	useMutation({
		mutationFn: (data: string) => patchTodos(data, true),
		onSuccess: () => {
			fn(createToast('Successfully Edited', 'success'));
			remainingFn();
		},
		onError: (err: Error) => fn(createToast(err.message)),
	});

export const useFetch = (
	fn?: (data: ToastType) => void,
	successfn?: (data: Todo[]) => void
) =>
	useQuery({
		queryKey: ['todos'],
		queryFn: getTodos,
		onSuccess: (data) => {
			if (successfn) successfn(data);
		},
		onError: (err: Error) => {
			if (fn) fn(createToast(err.message));
		},
	});
