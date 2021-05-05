const NotificationModel = data => {
	data = data || {};

	return {
		title: data.title,
		body: data.body,
		notificationType: data.notificationType,
		users_id: data.users_id,
		subscriptions_id: data.subscriptions_id,
		data: data.data,
		image: data.image
	};
};

export default NotificationModel;
