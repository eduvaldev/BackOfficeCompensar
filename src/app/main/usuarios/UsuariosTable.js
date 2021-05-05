import { Avatar, Button, Switch, Table, TableBody, TableCell, TableRow } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import { BsEye } from 'react-icons/all';
import { MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import CommonTableHead from 'app/components/table/CommonTableHead';
import CommonTablePagination from 'app/components/table/CommonTablePagination';
import usePagination from 'app/hooks/usePagination';

const UsuariosTable = ({ data, rows }) => {
	const dispatch = useDispatch();

  console.log(data);
	const { page, rowsPerPage, setPage, setRowsPerPage } = usePagination();

	return (
		<div className="flex flex-col w-full">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table aria-labelledby="tableTitle" className="min-w-xl" stickyHeader>
					<CommonTableHead rows={rows} />
					<TableBody>
						{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
							return (
								<TableRow key={n.id} className="h-32 cursor-pointer" hover>
									<TableCell component="th" scope="row">
										{n.document_type}
									</TableCell>

                  <TableCell component="th" scope="row">
										{n.identification_number}
									</TableCell>

                  <TableCell component="th" scope="row">
										este campo es prime
									</TableCell>

                  <TableCell component="th" scope="row">
										<div className="flex justify-center">
											<Button
												className="normal-case"
												color="primary"
												variant="outlined"
											>
												Actualizar
											</Button>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>
			<CommonTablePagination
				count={data.length}
				page={page}
				rowsPerPage={rowsPerPage}
				setPage={setPage}
				setRowsPerPage={setRowsPerPage}
			/>
		</div>
	);
};

UsuariosTable.propTypes = {
	rows: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired
};

export default withRouter(UsuariosTable);