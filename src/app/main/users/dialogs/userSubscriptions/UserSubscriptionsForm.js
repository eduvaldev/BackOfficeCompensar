import { Table, TableBody, TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import * as PropTypes from 'prop-types';
import React from 'react';

import FuseScrollbars from '../../../../../@fuse/core/FuseScrollbars';
import CommonTableHead from '../../../../components/table/CommonTableHead';

const rows = [
	{
		id: 'type_subscription',
		label: 'Tipo de suscripción'
	},
	{
		id: 'name',
		label: 'Nombre'
	},
	{
		id: 'start_at',
		label: 'Fecha inicio'
	},
	{
		id: 'ends_at',
		label: 'Fecha finalización'
	},
	{
		id: 'value',
		label: 'Valor'
	},
	{
		id: 'quantity_publications',
		label: 'Cantidad de publicaciones'
	},
	{
		id: 'is_active',
		label: 'Suscripción activa',
		align: 'center'
	}
];

function UserSubscriptionForm({ userSubscriptions }) {
	return (
		<div className="flex flex-col w-full">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table aria-labelledby="tableTitle">
					<CommonTableHead rows={rows} />

					<TableBody>
						{userSubscriptions?.map(s => {
							return (
								<TableRow key={s.id}>
									<TableCell component="th" scope="row">
										{s.type_subscription}
									</TableCell>

									<TableCell component="th" scope="row">
										{s.name}
									</TableCell>
									<TableCell component="th" scope="row">
										{s.start_at}
									</TableCell>
									<TableCell component="th" scope="row">
										{s.ends_at}
									</TableCell>
									<TableCell component="th" scope="row">
										{s.value}
									</TableCell>
									<TableCell component="th" scope="row">
										{s.quantity_publications}
									</TableCell>
									<TableCell className="text-center" component="th" scope="row">
										{s.is_active ? 'SI' : 'NO'}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>
		</div>
	);
}

export default UserSubscriptionForm;

UserSubscriptionForm.propTypes = { onClick: PropTypes.func };
