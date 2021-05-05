import { combineReducers } from '@reduxjs/toolkit';

import textos from './app/teextosSilce';
import enlaces from './app/enlaceSlice';
import videos from './app/videosSlice';
import usuarios from './app/usuariosSlice';

import fuse from './fuse';

import i18n from './i18nSlice';

import auth from 'app/auth/store';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		fuse,
		i18n,
		...asyncReducers,
    textos,
    enlaces,
    videos,
    usuarios
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'auth/user/userLoggedOut') {
		state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
