import React, { useEffect } from 'react';
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
	show: boolean;
};

const Notification = ({ message, onClose, type, show }: ToastProps) => {
	useEffect(() => {
		let timer: NodeJS.Timeout | undefined;
		if (show) {
			timer = setTimeout(() => onClose(), 5000);
		}
		return () => clearTimeout(timer);
	}, [show, onClose]);

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
