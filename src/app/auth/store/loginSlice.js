import { createSlice } from '@reduxjs/toolkit';

import { setUserData } from './userSlice';

import jwtService from 'app/services/jwtService';
import { showMessage } from 'app/store/fuse/messageSlice';

export const submitLogin = ({ CONTRASENA, NUMERODOCUMENTO, TIPODOCUMENTO }) => async dispatch => {
	return jwtService
		.signInWithEmailAndPassword(NUMERODOCUMENTO, CONTRASENA, TIPODOCUMENTO)
		.then(user => {
      console.log(user);
			const data = {
				role: ['admin'],
				data: {
					displayName: user.name,
					photoURL: 'assets/images/avatars/Velazquez.jpg',
					email: user.email,
          displayUser: user.user,
          diplayDocument: user.documento
				}
			};
      console.log(data);
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
