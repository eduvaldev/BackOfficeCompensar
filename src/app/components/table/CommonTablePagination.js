import TablePagination from '@material-ui/core/TablePagination';
import PropTypes from 'prop-types';
import React from 'react';

const CommonTablePagination = ({ count, page, rowsPerPage, setPage, setRowsPerPage }) => {
	function handleChangePage(event, page) {
		setPage(page);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<TablePagination
			backIconButtonProps={{
				'aria-label': 'Página previa'
			}}
			backIconButtonText="Página previa"
			className="flex-shrink-0 overflow-x-auto"
			component="div"
			count={count}
			labelRowsPerPage="Registros por página"
			nextIconButtonProps={{
				'aria-label': 'Siguiente página'
			}}
			nextIconButtonText="Siguiente página"
			page={page}
			rowsPerPage={rowsPerPage}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
		/>
	);
};

export default CommonTablePagination;

CommonTablePagination.propTypes = {
	count: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	setRowsPerPage: PropTypes.func.isRequired
};
