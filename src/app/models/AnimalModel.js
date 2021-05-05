const AnimalModel = data => {
	data = data || {};

	return {
		name: data.name,
		breed: data.breed,
		gender: data.gender,
		weight: data.weight,
		age: data.age,
		federated_iron: data.federated_iron,
		description: data.description,
		animal_type_id: data.animal_type_id,
		animal_subcategory_id: data.animal_subcategory_id,
		is_lote: data.is_lote,
		quantity_of_lote: data.quantity_of_lote
	};
};

export default AnimalModel;
