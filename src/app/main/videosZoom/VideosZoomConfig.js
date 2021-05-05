import React from 'react';

const VideosZoomConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/videos/zoom/:videoId?'],
			component: React.lazy(() => import('./VideosZoom'))
		},
		{
			path: '/videos/zoom',
			component: React.lazy(() => import('./VideosZoom'))
		}
	]
};

export default VideosZoomConfig;