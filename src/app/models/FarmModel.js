const FarmModel = data => {
	data = data || {};

	return {
		description: data.description,
		address: data.address,
		hectares: data.hectares,
		built_area: data.built_area,
		bathrooms: data.bathrooms,
		value: data.value,
		longitude: data.longitude,
		latitude: data.latitude,
		agreement: data.agreement,
		city_id: data.city_id
	};
};

export default FarmModel;
