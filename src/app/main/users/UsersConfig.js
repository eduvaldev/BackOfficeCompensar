import React from 'react';

const UsersConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/usuariosa',
			component: React.lazy(() => import('./Users'))
		}
	]
};

export default UsersConfig;
