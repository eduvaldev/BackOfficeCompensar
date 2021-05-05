import React from 'react';

const TextosAnitaConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/textos/anita/:textoId?'],
			component: React.lazy(() => import('./TextosAnita'))
		},
		{
			path: '/textos/anita',
			component: React.lazy(() => import('./TextosAnita'))
		}
	]
};

export default TextosAnitaConfig;
