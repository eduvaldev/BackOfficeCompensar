import { useState } from 'react';

const usePagination = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	return {
		page,
		setPage,
		rowsPerPage,
		setRowsPerPage
	};
};

export default usePagination;
