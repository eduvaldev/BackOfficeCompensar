import http from '../services/http';

const blogsRepository = {
	getBlogs: async () => {
		try {
			const blogs = await http.get('/api/blog?top=1000');
			return blogs.map(n => mapToDTO(n));
		} catch (error) {
			throw error;
		}
	},

	getBlog: async id => {
		try {
			const blog = await http.get(`/api/blog/${id}`);
			return mapToDTO(blog);
		} catch (error) {
			throw error;
		}
	},

	saveBlog: async data => {
		try {
			const blog = await http.post('/api/blog', data);
			return mapToDTO(blog);
		} catch (error) {
			throw error;
		}
	},

	updateBlog: async (id, data) => {
		try {
			const blog = await http.post(`/api/blog/${id}`, data);
			return mapToDTO(blog);
		} catch (error) {
			throw error;
		}
	},

	deleteBlog: async id => {
		try {
			await http.delete(`/api/blog/${id}`);
			return id;
		} catch (error) {
			throw error;
		}
	}
};

const mapToDTO = blog => {
	return {
		id: blog.id,
		category: blog.category.category,
		category_id: blog.category.id,
		name: blog.name,
		description: blog.description,
		photo: blog.resource?.url,
		image: blog.resource?.url,
		link_video: blog.link_video,
		status_id: blog.status.id,
		status_name: blog.status.name
	};
};

export default blogsRepository;
