import React from 'react';

const BlogsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/blogs',
			component: React.lazy(() => import('./Blogs'))
		}
	]
};

export default BlogsConfig;
