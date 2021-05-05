const ChangeStatusBlogModel = data => {
	data = data || {};

	return {
		category_id: data.category_id,
		name: data.name,
		description: data.description,
		link_video: data.link_video,
		status_id: data.status_id === 1 ? 2 : 1
	};
};

export default ChangeStatusBlogModel;
