import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FuseLoading from '../../../@fuse/core/FuseLoading';
import FuseUtils from '../../../@fuse/utils';
import { getUsuarios, selectUsuarios } from '../../store/app/usuariosSlice';

import UsuariosTable from './UsuariosTable';

const rows = [
	{
		id: 'tipo_documento',
		label: 'Tipo de documento',
		align: 'center'
	},
	{
		id: 'numero_documento',
		label: 'Numero de documento',
		align: 'center'
	},
	{
		id: 'premium',
		label: 'Prémium',
		align: 'center'
	},
	{
		id: 'null',
		label: 'Actualizar',
		align: 'center'
	},
];

function UsuariosContent() {
	const dispatch = useDispatch();

	const usuarios = useSelector(selectUsuarios);
	/* const searchText = useSelector(({ blogs }) => blogs.searchText);
	const selectedStatus = useSelector(({ blogs }) => blogs.selectedStatus); */

	const [isLoading, setIsLoading] = useState(false);
	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		dispatch(getUsuarios()).then(() => setIsLoading(false));
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			/* if (searchText.length === 0 && selectedStatus === 'todos') {
				return blogs;
			} */
			let data = usuarios;
			/* if (selectedStatus !== 'todos') {
				data = data.filter(d => d.status_id === selectedStatus);
			} */
			//data = FuseUtils.filterArrayByString(data);
			return data;
		}
		if (usuarios) {
			setFilteredData(getFilteredArray());
		}
	}, [usuarios]);

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
					No hay Usuarios
				</Typography>
			</div>
		);
	}

	return <UsuariosTable data={filteredData} rows={rows} />;
}

export default UsuariosContent;