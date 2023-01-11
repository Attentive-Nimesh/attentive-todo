import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterInput = ({ label, labelId, filter, value }) => {
	return (
		<FormControl fullWidth variant="standard">
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select labelId={labelId} value={value}>
				{filter && (
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
				)}
				<MenuItem value={'Todo'}>To-do</MenuItem>
				<MenuItem value={'In-Progress'}>In-Progress</MenuItem>
				<MenuItem value={'Completed'}>Completed</MenuItem>
			</Select>
		</FormControl>
	);
};

export default FilterInput;
