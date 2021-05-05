import { configureStore } from '@reduxjs/toolkit';

import onError from './middlewares/onError';
import createReducer from './rootReducer';

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
}

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
	const { logger } = require(`redux-logger`);

	middlewares.push(onError);
}

const store = configureStore({
	reducer: createReducer(),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: {
				ignoredActions: ['dialogs/openDialog', 'dialogs/closeDialog', 'message/showMessage', 'message/hideMessage']
			}
		}).concat(middlewares),
	devTools: process.env.NODE_ENV === 'development'
});

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
	if (store.asyncReducers[key]) {
		return false;
	}
	store.asyncReducers[key] = reducer;
	store.replaceReducer(createReducer(store.asyncReducers));
	return store;
};

export default store;
