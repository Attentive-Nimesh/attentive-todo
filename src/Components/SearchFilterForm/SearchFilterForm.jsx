import React, { useContext } from 'react';
import classes from './SearchFilterForm.module.css';
import InputBox from '../Input/InputBox';
import SelectInput from '../SelectInput/SelectInput';
import { Button } from '@mui/material';
import { TodoContext } from '../../Store/TodoProvider';

const SearchFilterForm = () => {
	const { search, filter, changeFilter, changeSearch, tasks, clearFilter } =
		useContext(TodoContext);

	return (
		<div className={classes.inputs}>
			<InputBox
				label={'Search For Tasks'}
				onChange={changeSearch}
				value={search}
			/>
			<SelectInput
				label="Filter by Assignee"
				filter={true}
				onChange={changeFilter}
				value={filter}
				setItems={
					new Set(
						tasks.map((task) => !task.isDeleted && task.assignee)
					)
				}
			/>
			<Button variant="contained" onClick={clearFilter}>
				Clear Filters
			</Button>
		</div>
	);
};

export default SearchFilterForm;
