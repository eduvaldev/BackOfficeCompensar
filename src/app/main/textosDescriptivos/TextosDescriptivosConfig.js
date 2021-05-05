import React from 'react';

const TextosDescriptivosConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/textos/descriptivos/:textoId?'],
			component: React.lazy(() => import('./TextosDescriptivos'))
		},
		{
			path: '/textos/descriptivos',
			component: React.lazy(() => import('./TextosDescriptivos'))
		}
	]
};

export default TextosDescriptivosConfig;
