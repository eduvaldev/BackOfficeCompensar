import moment from 'moment';

const CouponModel = data => {
	data = data || {};

	return {
		coupon_type_id: data.coupon_type_id,
		code: data.code,
		expiration_date: moment(data.expiration_date).format('YYYY-MM-DD'),
		value: data.value,
		maximum_uses: data.maximum_uses,
		only_per_charge: data.only_per_charge === true ? '1' : '0',
		subscriptions_id: data.subscriptions_id
	};
};

export default CouponModel;
