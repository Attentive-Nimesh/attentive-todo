import ReactDOM from 'react-dom';
import classes from './Toast.module.css';
import DoneIcon from '@mui/icons-material/Done';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
const COLOR_TYPES = {
	success: 'rgb(67, 212, 22)',
	error: 'rgb(255, 54, 54)',
};

const Notification = ({ message, onClose, type }) => {
	return (
		<div
			className={classes['notification-container']}
			onClick={onClose}
			style={{
				backgroundColor: COLOR_TYPES[type],
			}}
		>
			{type === 'success' ? <DoneIcon /> : <PriorityHighIcon />}
			<p>{message}</p>
		</div>
	);
};

const Toast = (props) =>
	ReactDOM.createPortal(
		<Notification {...props} />,
		document.getElementById('toast')
	);

export default Toast;
