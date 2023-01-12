import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterInput = ({
	label,
	labelId,
	filter,
	items,
	value,
	onChange,
	sx,
}) => {
	return (
		<FormControl fullWidth variant="standard" sx={sx}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select labelId={labelId} value={value} onChange={onChange}>
				{filter && (
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
				)}

				{!items && <MenuItem value={'Todo'}>To-do</MenuItem>}
				{!items && (
					<MenuItem value={'In-Progress'}>In-Progress</MenuItem>
				)}
				{!items && <MenuItem value={'Completed'}>Completed</MenuItem>}

				{items &&
					items.length > 0 &&
					items.map((item) => (
						<MenuItem key={item.name} value={item.value}>
							{item.name}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
};

export default FilterInput;
