import React, { ChangeEvent } from 'react';
import classes from './SearchFilterForm.module.css';
import InputBox from '../Input/InputBox';
import SelectInput from '../SelectInput/SelectInput';
import { Button } from 'elysium-ui';

type SearchFilterFormPropType = {
	search: string;
	filter: string;
	onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	onFilter: (val: string) => void;
	onClear: () => void;
	setItems?: Set<string>;
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
			<div className={classes['input-container']}>
				<InputBox
					label={'Search For Tasks'}
					onChange={onSearch}
					value={search}
					placeholder={'🔍Search Here'}
				/>
			</div>
			<div className={classes['input-container']}>
				<SelectInput
					label="Filter by Assignee"
					filter={true}
					onChange={onFilter}
					value={filter}
					setItems={setItems}
				/>
			</div>
			<Button onClick={onClear} size={'large'}>
				Clear Filters
			</Button>
		</div>
	);
};

export default SearchFilterForm;
