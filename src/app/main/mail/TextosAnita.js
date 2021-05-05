import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import TextoAnitaFocus from './mails/TextoAnitaFocus';
import TextosAnitaHeader from './TextosAnitaHeader';
import TextosAnitaSidebarContent from './TextosAnitaSidebarContent';
import TextosAnitaSidebarHeader from './TextosAnitaSidebarHeader';
import { textosGet, selectTextos } from '../../store/app/teextosSilce';

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

function TextosAnita(props) {
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
			content={<TextoAnitaFocus />}
			header={<TextosAnitaHeader pageLayout={pageLayout} />}
			leftSidebarContent={<TextosAnitaSidebarContent />}
			leftSidebarHeader={<TextosAnitaSidebarHeader />}
			innerScroll
		/>
	);
}

export default TextosAnita;
