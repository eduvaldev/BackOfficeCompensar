import React from 'react';

const UsuariosConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/usuarios',
			component: React.lazy(() => import('./Usuarios'))
		}
	]
};

export default UsuariosConfig;