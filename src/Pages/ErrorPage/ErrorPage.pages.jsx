import { Link, useRouteError } from 'react-router-dom';
import classes from './ErrorPage.module.css';

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<div className={classes['error-container']}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<Link to="/board">Back To Board</Link>
		</div>
	);
};

export default ErrorPage;
