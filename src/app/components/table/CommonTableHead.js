import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {},
	subHeader: {
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.main,
	}
}));

function CommonTableHead({ rows }) {
  
	const classes = useStyles();

	return (
		<TableHead className={clsx('', classes.subHeader)}>
			<TableRow className={clsx('h-64', classes.subHeader)}>
				{rows.map(row => {
					return (
						<TableCell
							key={row.id}
							align={row.align || 'left'}
              className={clsx('whitespace-nowrap', classes.subHeader)}
							padding={row.disablePadding ? 'none' : 'default'}
						>
							{row.label}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default CommonTableHead;

CommonTableHead.propTypes = {
	rows: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			align: PropTypes.oneOf(['left', 'center', 'right', 'justify', 'inherit']),
			disablePadding: PropTypes.bool,
			label: PropTypes.string.isRequired
		})
	).isRequired
};
