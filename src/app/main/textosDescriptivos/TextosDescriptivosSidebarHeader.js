import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import FuseAnimate from '@fuse/core/FuseAnimate';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.light,
		color: theme.palette.primary.main
	},
	content: {
		background: '#F4F4F4'
	}
}));

function TextosDescriptivosSidebarHeader(props) {
	const classes = useStyles();

	return (
		<div className={clsx('z-0 flex flex-col justify-start min-h-72 h-4 sm:h-200 sm:min-h-200 p-28', classes.root)}>
			<div className="flex flex-1 h-auto">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-40">article</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<span className="text-20 mx-16 mt-0">Textos Descriptivos</span>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default TextosDescriptivosSidebarHeader;
