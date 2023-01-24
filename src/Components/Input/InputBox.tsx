import React, { ChangeEvent } from 'react';
import { Input } from 'elysium-ui';

type InputBoxType = {
	label: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string | number;
	type?: string;
};

const InputBox = ({ label, onChange, value, type }: InputBoxType) => {
	return (
		<>
			<div className="description">{label}</div>
			<Input
				width={'100%'}
				onChange={onChange}
				value={value}
				type={type ? type : 'text'}
			/>
		</>
	);
};

export default InputBox;
