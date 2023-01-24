import React, { ReactNode } from 'react';
import { Modal as UIModal } from 'elysium-ui';
import classes from './Modal.module.css';

type ModalProps = {
	headerText: string;
	buttonText: string;
	onClose: () => void;
	show: boolean;
	children?: ReactNode;
	onClick: () => void;
};

const Modal = ({
	headerText,
	buttonText,
	onClose,
	show,
	children,
	onClick,
}: ModalProps) => {
	const ctas = {
		primary: {
			label: buttonText,
			color: 'primary',
			onClick: onClick,
		},
		secondary: {
			label: 'Cancel',
			color: 'error',
			onClick: onClose,
			variant: 'outlined',
		},
	};
	return (
		<UIModal
			maxWidth={'xl'}
			ctas={ctas}
			show={show}
			onClose={onClose}
			heading={headerText}
			content={<main className={classes.main}>{children}</main>}
		/>
	);
};

export default Modal;
