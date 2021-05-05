import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import FuseLoading from '../../../../../@fuse/core/FuseLoading';
import { closeCommentsDialog, getComments } from '../../../../store/app/blogsSlice';

import UserSubscriptionsForm from './CommentsForm';
import CommentsForm from './CommentsForm';

function CommentsDialog() {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	const comments = useSelector(({ blogs }) => blogs.comments);
	const commentsDialog = useSelector(({ blogs }) => blogs.commentsDialog);

	useEffect(() => {
		if (commentsDialog.props.open) {
			dispatch(getComments(commentsDialog.data)).then(() => setIsLoading(false));
		}
	}, [dispatch, commentsDialog]);

	const closeSubscriptionDialog = () => {
		dispatch(closeCommentsDialog());
		setIsLoading(true);
	};

	return (
		<Dialog
			classes={{
				paper: 'm-0'
			}}
			{...commentsDialog.props}
			maxWidth="lg"
			fullWidth
			onClose={() => closeSubscriptionDialog()}
		>
			<AppBar elevation={1} position="static">
				<Toolbar className="flex justify-between w-full">
					<Typography color="inherit" variant="subtitle1">
						Información de comentarios
					</Typography>
					<IconButton className="cursor-pointer" onClick={() => closeSubscriptionDialog()}>
						<MdClose />
					</IconButton>
				</Toolbar>
			</AppBar>

			<DialogContent className="p-0">
				{isLoading ? (
					<FuseLoading />
				) : comments.length === 0 ? (
					<div>
						<div className="h-96 flex items-center justify-center">
							<Typography variant="h6">No existen comentarios</Typography>
						</div>
					</div>
				) : (
					<CommentsForm comments={comments} onClick={() => closeSubscriptionDialog()} />
				)}
			</DialogContent>
		</Dialog>
	);
}

export default CommentsDialog;
