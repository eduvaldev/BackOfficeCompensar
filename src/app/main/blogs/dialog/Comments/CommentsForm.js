import { Icon, Table, TableBody, TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import * as PropTypes from 'prop-types';
import React from 'react';

import { BiTrash } from 'react-icons/all';

import { useDispatch } from 'react-redux';

import FuseScrollbars from '../../../../../@fuse/core/FuseScrollbars';
import CommonTableHead from '../../../../components/table/CommonTableHead';
import { deleteComment } from '../../../../store/app/blogsSlice';

const rows = [
	{
		id: 'description',
		label: 'Tipo de suscripción'
	},
	{
		id: 'qualification',
		label: 'Calificación'
	},
	{
		id: 'action',
		label: 'Eliminar',
		align: 'center'
	}
];

function CommentsForm({ comments }) {
	const dispatch = useDispatch();

	return (
		<div className="flex flex-col w-full">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table aria-labelledby="tableTitle">
					<CommonTableHead rows={rows} />

					<TableBody>
						{comments?.map(s => {
							return (
								<TableRow key={s.id}>
									<TableCell component="th" scope="row">
										{s.description}
									</TableCell>

									<TableCell component="th" scope="row">
										{s.qualification}
									</TableCell>
									<TableCell component="th" scope="row">
										<div className="flex justify-center">
											<Icon className="cursor-pointer" color="primary" onClick={() => dispatch(deleteComment(s.id))}>
												<BiTrash />
											</Icon>
										</div>
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

export default CommentsForm;

CommentsForm.propTypes = { onClick: PropTypes.func };
