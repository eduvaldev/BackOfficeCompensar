import _ from '@lodash';

const BlogModel = data => {
	data = data || {};

	return {
		category_id: data.category_id,
		name: data.name,
		description: data.description,
		link_video: data.link_video,
		status_id: data.status_id ? 1 : 0,
		photo: data.photo
	};
};

export default BlogModel;
