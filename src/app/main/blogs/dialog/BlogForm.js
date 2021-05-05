import { AppBar, Avatar, Button, DialogActions, MenuItem, TextField } from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import * as PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond/dist/filepond.min.css';

import { File, FilePond, registerPlugin } from 'react-filepond';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { MdClose, MdSave } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../../@fuse/hooks';

import Typography from '@material-ui/core/Typography';

import { saveBlog, updateBlog } from '../../../store/app/blogsSlice';

registerPlugin(FilePondPluginImagePreview);

const defaultFormState = {
	category_id: 0,
	name: '',
	description: '',
	link_video: '',
	status_id: 1,
	photo: ''
};

function BlogForm(props) {
	const dispatch = useDispatch();

	const errorsBack = useSelector(({ blogs }) => blogs.errors);
	const blogDialog = useSelector(({ blogs }) => blogs.blogDialog);

	const { categories } = useSelector(({ entities }) => entities);

	const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(defaultFormState, () =>
		handleSubmitBlog()
	);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (blogDialog.type === 'edit' && blogDialog.data) {
			setForm({ ...blogDialog.data, photo: '' });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (blogDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...blogDialog.data
			});
		}
	}, [blogDialog.data, blogDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (blogDialog.props.open) {
			initDialog();
		}
	}, [blogDialog.props.open, initDialog]);

	useEffect(() => {
		if (errorsBack) setErrors(errorsBack);
	}, [errorsBack, setErrors]);

	const handleSubmitBlog = () => {
		if (blogDialog.type === 'new') {
			dispatch(saveBlog(form));
		} else {
			dispatch(updateBlog(form));
		}
	};

	console.log(form);

	return (
		<>
			{blogDialog.type === 'edit' && (
				<div className="flex flex-col items-center justify-center">
					<Avatar className="h-192 object-fill w-full" src={form.image} variant="square" />
				</div>
			)}
			<form className="md:overflow-hidden flex flex-col space-y-16" noValidate onSubmit={handleSubmit}>
				<div className="flex items-center">
					<TextField
						error={!!errors.category_id}
						helperText={errors.category || errors.category_id}
						id="category_id"
						label="Categoría"
						name="category_id"
						value={form.category_id || ''}
						variant="outlined"
						fullWidth
						select
						onChange={handleChange}
					>
						{categories.map(c => (
							<MenuItem key={c.id} value={c.id}>
								{c.name}
							</MenuItem>
						))}
					</TextField>
				</div>
				<div className="flex items-center">
					<TextField
						error={!!errors.name}
						helperText={errors.name && errors.name}
						id="name"
						label="Nombre"
						name="name"
						value={form.name}
						variant="outlined"
						fullWidth
						onChange={handleChange}
					/>
				</div>

				<div className="flex items-center">
					<TextField
						error={!!errors.description}
						helperText={errors.description && errors.description}
						id="description"
						label="Descripción"
						name="description"
						value={form.description}
						variant="outlined"
						fullWidth
						onChange={handleChange}
					/>
				</div>

				<div className="w-full">
					<FilePond
						allowMultiple={false}
						credits=""
						labelIdle="Arrastra el que desees subir"
						name="files"
						onupdatefiles={files => {
							// if (blogDialog.type === 'edit') {
							// 	setInForm('photo', '');
							// }
							setInForm('photo', files[0].file);
						}}
					/>
					{errors.photo && (
						<Typography color="error" variant="body1">
							{errors.photo}
						</Typography>
					)}
				</div>

				<div className="flex items-center">
					<TextField
						error={!!errors.link_video}
						helperText={errors.link_video && errors.link_video}
						id="link_video"
						label="Link de video"
						name="link_video"
						value={form.link_video}
						variant="outlined"
						fullWidth
						onChange={handleChange}
					/>
				</div>

				<DialogActions className="justify-center p-8">
					<div>
						<Button
							className="mr-16"
							color="primary"
							startIcon={<MdClose />}
							variant="outlined"
							onClick={props.onClick}
						>
							Cancelar
						</Button>
					</div>
					<div>
						<Button color="primary" startIcon={<MdSave />} type="submit" variant="contained">
							Guardar
						</Button>
					</div>
				</DialogActions>
			</form>
		</>
	);
}

export default BlogForm;

BlogForm.propTypes = { onClick: PropTypes.func };
