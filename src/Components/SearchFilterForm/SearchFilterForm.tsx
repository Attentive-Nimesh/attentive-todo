import React, { ChangeEvent } from 'react';
import classes from './SearchFilterForm.module.css';
import InputBox from '../Input/InputBox';
import SelectInput from '../SelectInput/SelectInput';
import { Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

type SearchFilterFormPropType = {
	search: string;
	filter: string;
	setItems?: Set<string>;
	onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	onFilter: (e: SelectChangeEvent<string>) => void;
	onClear: () => void;
};
const SearchFilterForm = ({
	onSearch,
	onClear,
	onFilter,
	search,
	filter,
	setItems,
}: SearchFilterFormPropType) => {
	return (
		<div className={classes.inputs}>
			<InputBox
				label={'Search For Tasks'}
				onChange={onSearch}
				value={search}
			/>
			<SelectInput
				label="Filter by Assignee"
				filter={true}
				onChange={onFilter}
				value={filter}
				setItems={setItems}
			/>
			<Button variant="contained" onClick={onClear}>
				Clear Filters
			</Button>
		</div>
	);
};

export default SearchFilterForm;
