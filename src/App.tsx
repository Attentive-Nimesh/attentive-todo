import React from 'react';
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from 'react-router-dom';
import MainNavigation from './Components/MainNavigation/MainNavigation';
import Board from './Pages/Board/Board';
import DeletedTasks from './Pages/Deleted Tasks/DeletedTasks.pages';
import ErrorPage from './Pages/ErrorPage/ErrorPages';
import TodoProvider from './Store/TodoProvider';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainNavigation />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				loader: () => redirect('/board'),
				element: <Board />,
			},
			{
				path: 'board',
				element: <Board />,
			},
			{
				path: 'deleted-tasks',
				element: <DeletedTasks />,
			},
		],
	},
]);
function App() {
	return (
		<TodoProvider>
			<RouterProvider router={router} />;
		</TodoProvider>
	);
}

export default App;
