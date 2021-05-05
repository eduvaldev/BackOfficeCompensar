import { Avatar, Button, Switch, Table, TableBody, TableCell, TableRow } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import { BsEye } from 'react-icons/all';
import { MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

import { changeStatusBlog, openCommentsDialog, openEditBlogDialog } from '../../store/app/blogsSlice';

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import CommonTableHead from 'app/components/table/CommonTableHead';
import CommonTablePagination from 'app/components/table/CommonTablePagination';
import usePagination from 'app/hooks/usePagination';

const BlogsTable = ({ data, rows }) => {
	const dispatch = useDispatch();

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
										{n.category}
									</TableCell>

									<TableCell component="th" scope="row">
										{n.name}
									</TableCell>

									<TableCell component="th" scope="row">
										{n.description}
									</TableCell>

									<TableCell component="th" scope="row">
										<Avatar alt="blog avatar" src={n.photo} />
									</TableCell>

									<TableCell component="th" scope="row">
										{n.link_video}
									</TableCell>

									<TableCell component="th" scope="row">
										<div className="flex justify-center">
											<Button
												className="normal-case"
												color="secondary"
												startIcon={<BsEye />}
												variant="outlined"
												onClick={ev => {
													ev.stopPropagation();

													dispatch(openCommentsDialog(n.id));
												}}
											>
												Ver
											</Button>
										</div>
									</TableCell>

									<TableCell component="th" scope="row">
										<div className="flex justify-center">
											<Switch
												checked={n.status_id === 1}
												inputProps={{ 'aria-label': 'secondary checkbox' }}
												name="checkedA"
												onClick={() => dispatch(changeStatusBlog(n))}
											/>
										</div>
									</TableCell>

									<TableCell component="th" scope="row">
										<div className="flex justify-center">
											<Button
												className="normal-case"
												color="secondary"
												startIcon={<MdEdit />}
												variant="outlined"
												onClick={ev => {
													ev.stopPropagation();
													dispatch(openEditBlogDialog(n));
												}}
											>
												Editar
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

BlogsTable.propTypes = {
	rows: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired
};

export default withRouter(BlogsTable);
