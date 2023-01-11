import { Backdrop, Button } from '@mui/material';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const portalEl = document.getElementById('modal-root');

const OverLay = ({
	headerText,
	buttonText,
	onClose,
	show,
	children,
	onClick,
}) => {
	return (
		<>
			<Backdrop
				open={show}
				onClick={onClose}
				sx={{ zIndex: () => 500 }}
			/>
			<div className={classes.modal}>
				<header>
					<h2>{headerText}</h2>
				</header>
				<main>{children}</main>
				<footer className={classes.footer}>
					<Button variant="outlined" onClick={onClose} color="error">
						Cancel
					</Button>
					<Button variant="contained" onClick={onClick}>
						{buttonText}
					</Button>
				</footer>
			</div>
		</>
	);
};

const Modal = (props) =>
	ReactDOM.createPortal(<OverLay {...props} />, portalEl);

export default Modal;
