const SubscriptionModel = data => {
	data = data || {};

	return {
		subscription_type_id: data.subscription_type_id,
		description: data.description,
		value: data.value,
		modality: data.modality,
		number_publications: data.number_publications,
		value_additional_item: data.value_additional_item,
		_method: 'PUT'
	};
};

export default SubscriptionModel;
