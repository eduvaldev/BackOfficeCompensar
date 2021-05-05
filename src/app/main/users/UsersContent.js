import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FuseLoading from '../../../@fuse/core/FuseLoading';

import FuseUtils from '../../../@fuse/utils';
import { getUsers, selectUsers } from '../../store/app/usersSlice';

import UsersTable from './UsersTable';

import _ from '@lodash';

const rows = [
	{
		id: 'id',
		label: 'Código Usuario'
	},
	{
		id: 'name',
		label: 'Nombre'
	},
	{
		id: 'identification_number',
		label: 'Cédula'
	},
	{
		id: 'phone',
		label: 'Telefono Fijo'
	},
	{
		id: '',
		label: 'Celular'
	},
	{
		id: 'email',
		label: 'Correo Electronico'
	},
	{
		id: 'city_name',
		label: 'Ciudad'
	},
	{
		id: 'user_subscriptions',
		label: 'Suscripciones',
		align: 'center'
	}
	// {
	// 	id: 'status',
	// 	label: 'Estado',
	// 	align: 'center'
	// }
];

function UsersContent() {
	const dispatch = useDispatch();

	const users = useSelector(selectUsers);

	const searchText = useSelector(({ users }) => users.searchText);
	const selectedStatus = useSelector(({ users }) => users.selectedStatus);

	const [isLoading, setIsLoading] = useState(true);
	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		dispatch(getUsers()).then(() => setIsLoading(false));
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0 && selectedStatus === 'todos') {
				return users;
			}

			let data = users;

			if (selectedStatus !== 'todos') {
				data = data.filter(d => d.status_id === selectedStatus);
			}

			data = FuseUtils.filterArrayByString(data, searchText);

			return data;
		}

		if (users) {
			setFilteredData(getFilteredArray());
		}
	}, [users, selectedStatus, searchText]);

	if (!filteredData) {
		return null;
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex items-center justify-center flex-1 h-full">
				<Typography color="textSecondary" variant="h5">
					No hay usuarios
				</Typography>
			</div>
		);
	}

	return <UsersTable data={filteredData} rows={rows} />;
}

export default UsersContent;
