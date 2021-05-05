import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FuseLoading from '../../../@fuse/core/FuseLoading';
import FuseUtils from '../../../@fuse/utils';
import { getBlogs, selectBlogs } from '../../store/app/blogsSlice';

import BlogTable from './BlogsTable';

const rows = [
	{
		id: 'category',
		label: 'Categoría'
	},
	{
		id: 'name',
		label: 'Nombre'
	},
	{
		id: 'description',
		label: 'Descripción'
	},
	{
		id: 'photo',
		label: 'Foto',
		align: 'center'
	},
	{
		id: 'link_video',
		label: 'Link Video'
	},
	{
		id: 'comments',
		label: 'Comentarios',
		align: 'center'
	},
	{
		id: 'status',
		label: 'Estado',
		align: 'center'
	},
	{
		id: 'accion',
		label: 'Acción',
		align: 'center'
	}
];

function BlogsContent() {
	const dispatch = useDispatch();

	const blogs = useSelector(selectBlogs);
	const searchText = useSelector(({ blogs }) => blogs.searchText);
	const selectedStatus = useSelector(({ blogs }) => blogs.selectedStatus);

	const [isLoading, setIsLoading] = useState(true);
	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		dispatch(getBlogs()).then(() => setIsLoading(false));
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0 && selectedStatus === 'todos') {
				return blogs;
			}

			let data = blogs;

			if (selectedStatus !== 'todos') {
				data = data.filter(d => d.status_id === selectedStatus);
			}

			data = FuseUtils.filterArrayByString(data, searchText);

			return data;
		}

		if (blogs) {
			setFilteredData(getFilteredArray());
		}
	}, [blogs, selectedStatus, searchText]);

	if (!filteredData) {
		return null;
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex items-center justify-center flex-1 h-full">
				<Typography color="textSecondary" variant="h5">
					No hay blogs
				</Typography>
			</div>
		);
	}

	return <BlogTable data={filteredData} rows={rows} />;
}

export default BlogsContent;
