import { serialize } from 'object-to-formdata';

import usersRepository from '../../repositories/usersRepository';

const usersService = {
	getUsers: async () => {
		try {
			return await usersRepository.getUsers();
		} catch (error) {
			throw error;
		}
	},

	getUser: async id => {
		try {
			return await usersRepository.getUser(id);
		} catch (error) {
			throw error;
		}
	},

	getUserSubscriptions: async id => {
		try {
			return await usersRepository.getUserSubscriptions(id);
		} catch (error) {
			throw error;
		}
	},

	saveUser: async data => {
		try {
			// const body = AnimalModel(data);
			return await usersRepository.saveUser(serialize(data));
		} catch (error) {
			throw error;
		}
	},

	updateUser: async data => {
		try {
			const { id } = data;
			// const body = AnimalModel(data);
			return await usersRepository.updateUser(id, serialize(data));
		} catch (error) {
			throw error;
		}
	},

	deleteUser: async id => {
		try {
			return await usersRepository.deleteUser(id);
		} catch (error) {
			throw error;
		}
	},

	changeStatusUser: async data => {
		try {
			const { id } = data;
			const idStatus = data.status_id === 2 ? 1 : 2;
			return await usersRepository.changeStatusUser(id, idStatus);
		} catch (error) {
			throw error;
		}
	}
};

export default usersService;
