import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import VideosWhatsappFocus from './VideosWhatsappFocus';
import VideosWhatsappHeader from './VideosWhatsappHeader';
import VideosWhatsappSidebarContent from './VideosWhatsappSidebarContent';
import VideosWhatsappSidebarHeader from './VideosWhatsappSidebarHeader';
import { videosGet } from '../../store/app/videosSlice';

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

function VideosWhatsapp(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(videosGet());
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
			content={<VideosWhatsappFocus />}
			header={<VideosWhatsappHeader pageLayout={pageLayout} />}
			leftSidebarContent={<VideosWhatsappSidebarContent />}
			leftSidebarHeader={<VideosWhatsappSidebarHeader />}
			innerScroll
		/>
	);
}

export default VideosWhatsapp;