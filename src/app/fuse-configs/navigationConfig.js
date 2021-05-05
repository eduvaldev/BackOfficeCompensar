import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'mai',
		title: 'Textos',
		type: 'collapse',
		icon: 'article',
		children: [
			{
				id: 'textos-annita',
				title: 'Textos Anita',
				type: 'item',
				url: '/textos/anita/1'
			},
			{
				id: 'textos-descriptivos',
				title: 'Textos Descriptivos',
				type: 'item',
				url: '/textos/descriptivos/16'
			}
		]
	},
  {
    id: 'videos',
    title: 'Videos',
    type: 'collapse',
    icon: 'ondemand_video',
		children: [
			{
				id: 'videos_wp',
				title: 'Videos WhatsApp',
				type: 'item',
				url: '/videos/whatsapp/1'
			},
			{
				id: 'videos_zoom',
				title: 'Videos Zoom',
				type: 'item',
				url: '/videos/zoom/9'
			}
		]
  },
  {
		id: 'enlaces',
		title: 'Enlaces',
		type: 'collapse',
		icon: 'link',
		children: [
			{
				id: 'enlaces_link',
				title: 'Enlaces Link',
				type: 'item',
				url: '/enlaces/link/1'
			},
			{
				id: 'enlaces_typeform',
				title: 'Enlaces Typeform',
				type: 'item',
				url: '/enlaces/typeform/5'
			}
		]
	},
  {
    id: 'usuarios',
    title: 'Usuarios',
    type: 'item',
    icon: 'people_alt',
    url: '/usuarios'
  },
  {
    id: 'control',
    title: 'Tablero de Control',
    type: 'item',
    icon: 'contact_phone',
    url: '/control'
  },
  {
    id: 'reportes',
    title: 'Reportes',
    type: 'item',
    icon: 'error',
    url: '/reportes'
  }
];

export default navigationConfig;
