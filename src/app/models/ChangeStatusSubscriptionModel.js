const ChangeStatusSubscriptionModel = data => {
	data = data || {};

	return {
		subscription_type_id: data.subscription_type_id,
		description: data.description,
		value: data.value,
		modality: data.modality,
		number_publications: data.number_publications,
		value_additional_item: data.value_additional_item,
		status_id: data.status_id === 1 ? 2 : 1
	};
};

export default ChangeStatusSubscriptionModel;
