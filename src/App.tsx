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
import { QueryClient, QueryClientProvider } from 'react-query';
import { StyleProvider } from 'elysium-ui';
import 'elysium-ui/lib/styles/tokens.css';
import 'elysium-ui/lib/styles/fonts.css';

const queryClient = new QueryClient();

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
		<QueryClientProvider client={queryClient}>
			<StyleProvider>
				<RouterProvider router={router} />;
			</StyleProvider>
		</QueryClientProvider>
	);
}

export default App;
