import React from 'react';

const EncuestaConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/control/encuesta/:id',
			component: React.lazy(() => import('./Encuesta'))
		}
	]
};

export default EncuestaConfig;