import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import EnlacesTypeformFocus from './EnlacesTypeformFocus';
import EnlacesTypeformHeader from './EnlacesTypeformHeader';
import EnlacesTypeformSidebarContent from './EnlacesTypeformSidebarContent';
import EnlacesTypeformSidebarHeader from './EnlacesTypeformSidebarHeader';
import { enlacesGet } from '../../store/app/enlaceSlice';

import FusePageCarded from '@fuse/core/FusePageCarded';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.light,
    color: theme.palette.primary.main
	},
	content: {
		background: theme.palette.background.light,
		borderRadius: '8px 8px 0 0'
	}
}));

function EnlacesTypeform(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(enlacesGet());
	}, [dispatch]);

	return (
		<FusePageCarded
			ref={pageLayout}
			classes={{
				root: 'w-full xl:pr-0 overflow-visible',
				content: clsx('flex flex-col xl:pr-0 ', classes.content),
				header: clsx('items-center min-h-72 h-4 sm:h-200 sm:min-h-200 pr-0', classes.root)
			}}
			className=" xl:pr-0"
			content={<EnlacesTypeformFocus />}
			header={<EnlacesTypeformHeader pageLayout={pageLayout} />}
			leftSidebarContent={<EnlacesTypeformSidebarContent />}
			leftSidebarHeader={<EnlacesTypeformSidebarHeader />}
			innerScroll
		/>
	);
}

export default EnlacesTypeform;