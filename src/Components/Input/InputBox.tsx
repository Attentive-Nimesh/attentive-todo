import React, { ChangeEvent } from 'react';
import { InputLabel, Input, FormControl } from '@mui/material';
import { Theme } from '@emotion/react';

type InputBoxType = {
	label: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string | number;
	sx?: Theme;
	type?: string;
};

const InputBox = ({ label, onChange, value, sx, type }: InputBoxType) => {
	return (
		<FormControl fullWidth={true} sx={sx} variant="standard">
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
