import { createSlice } from '@reduxjs/toolkit';

import { setUserData } from './userSlice';

import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { showMessage } from 'app/store/fuse/messageSlice';

export const submitLogin = ({ email, password }) => async dispatch => {
	return jwtService
		.signInWithEmailAndPassword(email, password)
		.then(user => {
			const data = {
				role: ['admin'],
				data: {
					displayName: user.name,
					photoURL: 'assets/images/avatars/Velazquez.jpg',
					email: user.email
				}
			};
			dispatch(setUserData(data));
			dispatch(
				showMessage({
					message: 'Inicio de sesión satisfactorio',
					variant: 'success'
				})
			);

			return dispatch(loginSuccess());
		})
		.catch(error => {
			dispatch(
				showMessage({
					message: error,
					variant: 'error'
				})
			);
			return dispatch(loginError(error));
		});
};

export const submitLoginWithFireBase = ({ password, username }) => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}
	return firebaseService.auth
		.signInWithEmailAndPassword(username, password)
		.then(() => {
			return dispatch(loginSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = [
				'auth/email-already-in-use',
				'auth/invalid-email',
				'auth/operation-not-allowed',
				'auth/user-not-found',
				'auth/user-disabled'
			];
			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = {
				username: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}

			return dispatch(loginError(response));
		});
};

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginError, loginSuccess } = loginSlice.actions;

export default loginSlice.reducer;
