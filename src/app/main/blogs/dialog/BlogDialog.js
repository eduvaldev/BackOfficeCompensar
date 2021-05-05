import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';

import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { closeEditBlogDialog, closeNewBlogDialog } from '../../../store/app/blogsSlice';

import { getCategories } from '../../../store/app/entitiesSlice';

import BlogForm from './BlogForm';

function BlogDialog() {
	const dispatch = useDispatch();

	const { categories } = useSelector(({ entities }) => entities);
	const blogDialog = useSelector(({ blogs }) => blogs.blogDialog);

	useEffect(() => {
		if (categories.length === 0) dispatch(getCategories());
	}, [dispatch]);

	const closeBlogDialog = () => {
		return blogDialog.type === 'new' ? dispatch(closeNewBlogDialog()) : dispatch(closeEditBlogDialog());
	};

	return (
		<Dialog
			classes={{
				paper: 'm-8'
			}}
			{...blogDialog.props}
			maxWidth="xs"
			fullWidth
			onClose={() => dispatch(closeBlogDialog())}
		>
			<AppBar elevation={1} position="static">
				<Toolbar className="flex justify-between w-full">
					<Typography color="inherit" variant="subtitle1">
						{blogDialog.type === 'new' ? 'Nuevo blog' : 'Editar blog'}
					</Typography>
					<IconButton className="cursor-pointer" onClick={() => dispatch(closeBlogDialog())}>
						<MdClose />
					</IconButton>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-16' }}>
				<BlogForm onClick={() => dispatch(closeBlogDialog())} />
			</DialogContent>
		</Dialog>
	);
}

export default BlogDialog;
