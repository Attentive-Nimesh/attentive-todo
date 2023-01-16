import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Backdrop, Button } from '@mui/material';
import classes from './Modal.module.css';

const portalEl = document.getElementById('modal-root');

type ModalProps = {
	headerText: string;
	buttonText: string;
	onClose: () => void;
	show: boolean;
	children?: ReactNode;
	onClick: () => void;
};

const OverLay = ({
	headerText,
	buttonText,
	onClose,
	show,
	children,
	onClick,
}: ModalProps) => {
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

const Modal = (props: ModalProps) =>
	ReactDOM.createPortal(<OverLay {...props} />, portalEl as HTMLElement);

export default Modal;
