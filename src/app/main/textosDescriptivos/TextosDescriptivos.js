import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import TextosDescriptivosFocus from './EditTextos/TextosDescriptivosFocus';
import TextosDescriptivosHeader from './TextosDescriptivosHeader';
import TextosDescriptivosSidebarContent from './TextosDescriptivosSidebarContent';
import TextosDescriptivosSidebarHeader from './TextosDescriptivosSidebarHeader';
import { textosGet } from '../../store/app/teextosSilce';

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

function TextosDescriptivos(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(textosGet());
	}, [dispatch]);

	return (
		<FusePageCarded
			ref={pageLayout}
			classes={{
				root: 'w-full xl:pr-0 overflow-visible',
				content: clsx('flex flex-col xl:pr-0 p-32', classes.content),
				header: clsx('items-center min-h-72 h-4 sm:h-200 sm:min-h-200 pr-0', classes.root)
			}}
			className=" xl:pr-0"
			content={<TextosDescriptivosFocus />}
			header={<TextosDescriptivosHeader pageLayout={pageLayout} />}
			leftSidebarContent={<TextosDescriptivosSidebarContent />}
			leftSidebarHeader={<TextosDescriptivosSidebarHeader />}
			innerScroll
		/>
	);
}

export default TextosDescriptivos;
