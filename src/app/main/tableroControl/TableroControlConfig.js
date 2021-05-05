import React from 'react';

const TableroControlConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/control',
			component: React.lazy(() => import('./TableroControl'))
		}
	]
};

export default TableroControlConfig;