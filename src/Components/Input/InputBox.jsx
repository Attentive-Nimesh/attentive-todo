import { InputLabel, Input, FormControl } from '@mui/material';

const InputBox = ({ label }) => {
	return (
		<FormControl fullWidth>
			<InputLabel htmlFor={label}>{label}</InputLabel>
			<Input />
		</FormControl>
	);
};

export default InputBox;
