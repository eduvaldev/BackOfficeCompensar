import React from 'react';

const VideosWhatsappConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/videos/whatsapp/:videoId?'],
			component: React.lazy(() => import('./VideosWhatsapp'))
		},
		{
			path: '/videos/whatsapp',
			component: React.lazy(() => import('./VideosWhatsapp'))
		}
	]
};

export default VideosWhatsappConfig;