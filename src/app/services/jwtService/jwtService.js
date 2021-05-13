import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { serialize } from 'object-to-formdata';

import { Axios } from '../apiService/apiService';

import FuseUtils from '@fuse/utils/FuseUtils';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (NUMERODOCUMENTO, CONTRASENA, TIPODOCUMENTO) => {
		return new Promise((resolve, reject) => {
			const data = {
        NUMERODOCUMENTO,
        CONTRASENA,
        TIPODOCUMENTO
			};
			axios
				.post(`${process.env.REACT_APP_COLCAGRO_API}/api/admin`, data, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(response => {
					if (Object.prototype.hasOwnProperty.call(response.data.data, 'access_token')) {
						this.setSession(response.data.data.access_token);
            resolve(response.data.data);
						/* axios
							.get(`${process.env.REACT_APP_COLCAGRO_API}/api/auth/me`, {
								headers: {
									Authorization: `Bearer ${response.data.data.access_token}`
								}
							})
							.then(res => {
								if (res.data.code === 200) {
									resolve(res.data.data.data);
								}
							}); */
					} else {
						reject(response.data.data);
					}
				})
				.catch(error => {
					throw error;
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_COLCAGRO_API}/api/auth/me`, {
					headers: {
						Authorization: `Bearer ${this.getAccessToken()}`
					}
				})
				.then(response => {
					if (response.data.code === 200) {
						resolve(response.data.data.data);
					} else {
						this.logout();
						reject(new Error('Debe iniciar sesión.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Debe iniciar sesión.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('@adultomayor_admin:access_token', access_token);
			Axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('@adultomayor_admin:access_token');
			delete Axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('@adultomayor_admin:access_token');
	};
}

const instance = new JwtService();

export default instance;
