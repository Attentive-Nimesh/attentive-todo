import { InputLabel, Input, FormControl } from '@mui/material';

const InputBox = ({ label, onChange, value, noFullWidth, sx, type }) => {
	return (
		<FormControl
			fullWidth={noFullWidth ? false : true}
			sx={sx}
			variant="standard"
		>
			<InputLabel htmlFor={label}>{label}</InputLabel>
			<Input
				onChange={onChange}
				value={value}
				type={type ? type : 'text'}
			/>
		</FormControl>
	);
};

export default InputBox;
