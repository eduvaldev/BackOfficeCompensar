import { Icon, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import React from 'react';
import { BsFilter } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

const FilterTextField = ({ actionCallback, data, selectedStatus }) => {
	const dispatch = useDispatch();

	return (
		<TextField
			className="sm:min-w-128 md:min-w-256 lg:max-w-360 w-full"
			id="outlined-start-adornment"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Icon>
							<BsFilter />
						</Icon>
					</InputAdornment>
				)
			}}
			placeholder="Filtrar"
			value={selectedStatus}
			variant="outlined"
			select
			onChange={ev => dispatch(actionCallback(ev))}
		>
			<MenuItem value="todos">Todos</MenuItem>
			{data.map(e => (
				<MenuItem key={e.id} value={e.id}>
					{e.name}
				</MenuItem>
			))}
		</TextField>
	);
};

export default FilterTextField;
