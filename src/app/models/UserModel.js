const UserModel = data => {
	data = data || {};

	return {
		name: data.name,
		email: data.email,
		phone: data.phone,
		identification_number: data.identification_number,
		role: 'user',
		photo: data.photo
	};
};

export default UserModel;
