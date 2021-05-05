import { Icon, InputAdornment, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useDebounce } from '../../@fuse/hooks';

const FilterTextField = ({ actionCallback }) => {
	const dispatch = useDispatch();

	const [searchText, setSearchText] = useState('');
	const debounceSearchText = useDebounce(searchText, 300);

	useEffect(() => {
		dispatch(actionCallback(debounceSearchText));
	}, [dispatch, debounceSearchText]);

	const handleChange = event => {
		const { value } = event.target;
		setSearchText(value);
	};

	return (
		<TextField
			className="sm:min-w-128 md:min-w-256 lg:max-w-360 w-full"
			id="outlined-start-adornment"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Icon>search</Icon>
					</InputAdornment>
				)
			}}
			placeholder="Buscar"
			value={searchText}
			variant="outlined"
			onChange={handleChange}
		/>
	);
};

export default FilterTextField;
