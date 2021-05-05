import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.light,
		color: theme.palette.primary.main
	},
	content: {
		background: '#F4F4F4'
	},
	toggleBtn: {
		color: theme.palette.primary.dark
	}
}));

function EnlacesLinkHeader(props) {
	const classes = useStyles();

	return (
		<div className={clsx('backLockAnn', classes.root)}>
			<div className="flex flex-1">
				<Hidden lgUp>
					<IconButton aria-label="open left sidebar" onClick={ev => props.pageLayout.current.toggleLeftSidebar()}>
						<Icon className={clsx('text-withe', classes.toggleBtn)}>menu</Icon>
					</IconButton>
				</Hidden>
			</div>
		</div>
	);
}

export default EnlacesLinkHeader;