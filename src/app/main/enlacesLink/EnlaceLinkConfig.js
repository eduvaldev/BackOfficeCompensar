import React from 'react';

const EnlacesLinkConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/enlaces/link/:enlaceId?'],
			component: React.lazy(() => import('./EnlaceLink'))
		},
		{
			path: '/enlaces/link',
			component: React.lazy(() => import('./EnlaceLink'))
		}
	]
};

export default EnlacesLinkConfig;