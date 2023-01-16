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
	return <RouterProvider router={router} />;
}

export default App;
