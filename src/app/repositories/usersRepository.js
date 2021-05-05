import http from '../services/http';

const url = '/api/user';

const usersRepository = {
	getUsers: async () => {
		try {
			const users = await http.get(`${url}?include=conveyor,owner,professional,provider&top=1000`);
			return users.map(n => mapToDTO(n));
		} catch (error) {
			throw error;
		}
	},

	getUser: async id => {
		try {
			const user = await http.get(`${url}/${id}`);
			return mapToDTO(user);
		} catch (error) {
			throw error;
		}
	},

	getUserSubscriptions: async id => {
		try {
			const userSubscriptions = await http.get(`/api/v1/users/${id}/user_subscriptions`);
			return userSubscriptions.map(us => {
				return {
					value: us.value,
					ends_at: us.ends_at,
					is_active: us.is_active,
					type_subscription: us.type_subscription,
					start_at: us.start_at,
					quantity_publications: us.quantity_publications
				};
			});
		} catch (error) {
			throw error;
		}
	},

	saveUser: async data => {
		try {
			const user = await http.post(`${url}`, data);
			return mapToDTO(user);
		} catch (error) {
			throw error;
		}
	},

	updateUser: async (id, data) => {
		try {
			const user = await http.post(`${url}/${id}`, data);
			return mapToDTO(user);
		} catch (error) {
			throw error;
		}
	},

	deleteUser: async id => {
		try {
			await http.delete(`${url}/${id}`);
			return id;
		} catch (error) {
			throw error;
		}
	},

	changeStatusUser: async (id, idStatus) => {
		try {
			const user = await http.put(`${url}/${id}/${idStatus}?include=conveyor,owner,professional,provider`);
			return mapToDTO(user);
		} catch (error) {
			throw error;
		}
	}
};

const mapToDTO = users => {
	return {
		id: users.id,
		name: users.name,
		email: users.email,
		phone: users.phone,
		identification_number: users.identification_number,
		status_id: users.status.id,
		status_name: users.status.name,
		photo: users.photo.url
	};
};

export default usersRepository;
