import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Toast.module.css';
import DoneIcon from '@mui/icons-material/Done';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const enum COLORS {
	success = 'rgb(67, 212, 22)',
	error = 'rgb(255, 54, 54)',
}

type ToastProps = {
	message: string;
	onClose: () => void;
	type: 'success' | 'error';
};

const Notification = ({ message, onClose, type }: ToastProps) => {
	return (
		<div
			className={classes['notification-container']}
			onClick={onClose}
			style={{
				backgroundColor:
					type === 'success' ? COLORS.success : COLORS.error,
			}}
		>
			{type === 'success' ? <DoneIcon /> : <PriorityHighIcon />}
			<p>{message}</p>
		</div>
	);
};

const Toast = (props: ToastProps) =>
	ReactDOM.createPortal(
		<Notification {...props} />,
		document.getElementById('toast') as HTMLDivElement
	);

export default Toast;
