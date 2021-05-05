import React from 'react';

const EnlacesTypeformConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/enlaces/typeform/:enlaceId?'],
			component: React.lazy(() => import('./EnlacesTypeform'))
		},
		{
			path: '/enlaces/typeform',
			component: React.lazy(() => import('./EnlacesTypeform'))
		}
	]
};

export default EnlacesTypeformConfig;