import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginConfig from '../main/login/LoginConfig';
import TextosAnitaConfig from '../main/mail/TextosAnitaConfig';
import TextosDescriptivosConfig from '../main/textosDescriptivos/TextosDescriptivosConfig';
import EnlacesLinkConfig from '../main/enlacesLink/EnlaceLinkConfig';
import EnlacesTypeformConfig from '../main/enlacesTypeform/EnlacesTypeformConfig';
import VideosWhatsappConfig from '../main/videosWhatsapp/VideosWhatsappConfig';
import VideosZoomConfig from '../main/videosZoom/VideosZoomConfig';
import UsuariosConfig from '../main/usuarios/UsuariosConfig';
import TableroControlConfig from '../main/tableroControl/TableroControlConfig';

import FuseUtils from '@fuse/utils';

const routeConfigs = [
  LoginConfig, 
  TextosAnitaConfig, 
  TextosDescriptivosConfig,
  EnlacesLinkConfig,
  EnlacesTypeformConfig,
  VideosWhatsappConfig,
  VideosZoomConfig,
  UsuariosConfig,
  TableroControlConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		auth: null,
		exact: true,
		component: () => <Redirect to="/textos/anita/1" />
	}
];

export default routes;
