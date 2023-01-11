import { NavLink } from 'react-router-dom';
import classes from './NavLinks.module.css';
const NavLinks = () => {
	const activeNavLinkClassName = ({ isActive }) =>
		isActive ? classes.active : undefined;

	return (
		<ul className={classes['nav-links']}>
			<li>
				<NavLink className={activeNavLinkClassName} to={'/board'}>
					Board
				</NavLink>
			</li>
			<li>
				<NavLink
					className={activeNavLinkClassName}
					to={'/deleted-tasks'}
				>
					Deleted Tasks
				</NavLink>
			</li>
		</ul>
	);
};

export default NavLinks;
