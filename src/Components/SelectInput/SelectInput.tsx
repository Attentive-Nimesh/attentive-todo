import React from 'react';
import { Select } from 'elysium-ui';

type ItemsType = {
	label: string;
	value: string;
};

type SelectInputPropType = {
	label: string;
	items?: ItemsType[];
	value: string;
	onChange: (val: string) => void;
	setItems?: Set<string>;
	onClear?: () => void;
	filter?: boolean;
};

const SelectInput = ({
	label,
	items,
	value,
	onChange,
	setItems,
	onClear,
	filter,
}: SelectInputPropType) => {
	return (
		<>
			<div className="description">{label}</div>
			<Select
				allowClear={filter}
				buttonStyle={{
					height: '48px',
				}}
				items={
					setItems
						? Array.from(setItems)
								.filter((item) => item !== '')
								.map((item) => ({
									label: item,
									value: item,
								}))
						: items
				}
				onChange={onChange}
				onClear={onClear}
				placeholder="Select"
				value={value}
			/>
		</>
	);
};

export default SelectInput;
