import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FuseAnimate from '@fuse/core/FuseAnimate';

const accounts = {
	creapond: 'johndoe@creapond.com',
	withinpixels: 'johndoe@withinpixels.com'
};

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.light,
		color: theme.palette.primary.main
	},
	content: {
		background: '#F4F4F4'
	}
}));

function TextosAnitaSidebarHeader(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [selectedAccount, setSelectedCount] = useState('creapond');
	const { t } = useTranslation('mailApp');

	function handleAccountChange(ev) {
		setSelectedCount(ev.target.value);
	}

	return (
		<div className={clsx('z-0 flex flex-col justify-start min-h-72 h-4 sm:h-200 sm:min-h-200 p-28', classes.root)}>
			<div className="flex flex-1 h-auto">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-40">article</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<span className="text-24 mx-16 mt-6">Textos Anita</span>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default TextosAnitaSidebarHeader;
