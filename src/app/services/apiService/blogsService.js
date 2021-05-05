import { serialize } from 'object-to-formdata';

import BlogModel from '../../models/BlogModel';
import ChangeStatusBlogModel from '../../models/ChangeStatusBlogModel';
import blogsRepository from '../../repositories/blogsRepository';

const blogsService = {
	getBlogs: async () => {
		try {
			return await blogsRepository.getBlogs();
		} catch (error) {
			throw error;
		}
	},

	getBlog: async id => {
		try {
			return await blogsRepository.getBlog(id);
		} catch (error) {
			throw error;
		}
	},

	saveBlog: async data => {
		try {
			const body = BlogModel(data);
			return await blogsRepository.saveBlog(serialize(body));
		} catch (error) {
			throw error;
		}
	},

	updateBlog: async data => {
		try {
			const { id } = data;
			const body = BlogModel(data);
			return await blogsRepository.updateBlog(id, serialize(body));
		} catch (error) {
			throw error;
		}
	},

	deleteBlog: async id => {
		try {
			return await blogsRepository.deleteBlog(id);
		} catch (error) {
			throw error;
		}
	},

	changeStatusBlog: async data => {
		try {
			const { id } = data;
			const body = ChangeStatusBlogModel(data);
			return await blogsRepository.updateBlog(id, serialize(body));
		} catch (error) {
			throw error;
		}
	}
};

export default blogsService;
