import React from 'react';
import NavLinks from '../NavLinks/NavLinks';
import CloseIcon from '@mui/icons-material/Close';
import classes from './SideNavigation.module.css';

type SideNavigationPropType = {
	onClose: () => void;
};

const SideNavigation = ({ onClose }: SideNavigationPropType) => {
	return (
		<aside className={classes['sidebar-container']}>
			<button className={classes['close-button']} onClick={onClose}>
				<CloseIcon />
			</button>
			<NavLinks />
		</aside>
	);
};

export default SideNavigation;
