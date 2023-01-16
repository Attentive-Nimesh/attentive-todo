export type Todo = {
	task: string;
	assignee: string;
	status: 'Todo' | 'In-Progress' | 'Completed';
	priority: 'high' | 'low';
	hours: number;
	days: number;
	isDeleted: boolean;
	id: string;
};
