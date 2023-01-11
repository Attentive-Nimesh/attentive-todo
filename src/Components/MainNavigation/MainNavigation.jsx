import { Link, Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NavLinks from '../NavLinks/NavLinks';
import classes from './MainNavigation.module.css';
import { useState } from 'react';
import SideNavigation from '../SideNavigation/SideNavigation';

const MainNavigation = () => {
	const [showSideBar, setShowSideBar] = useState(false);
	const menuButtonClickHandler = () => setShowSideBar((prev) => !prev);

	return (
		<>
			<nav className={classes['nav-container']}>
				<h1>
					<Link to="/board">Tasks Board</Link>
				</h1>
				<NavLinks />
				<button
					className={classes['menu-button']}
					onClick={menuButtonClickHandler}
				>
					<MenuIcon />
				</button>
			</nav>
			{showSideBar && <SideNavigation onClose={menuButtonClickHandler} />}
			<Outlet />
		</>
	);
};

export default MainNavigation;
