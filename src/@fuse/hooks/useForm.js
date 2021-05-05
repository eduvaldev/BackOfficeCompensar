import { useCallback, useState } from 'react';

import _ from '@lodash';

function useForm(initialState, onSubmit, validationRules) {
	const [form, setForm] = useState(initialState);
	const [errors, setErrors] = useState({});

	const handleChange = useCallback(event => {
		event.persist();
		setForm(_form =>
			_.setIn(
				{ ..._form },
				event.target.name,
				event.target.type === 'checkbox' ? event.target.checked : event.target.value
			)
		);
	}, []);

	const resetForm = useCallback(() => {
		if (!_.isEqual(initialState, form)) {
			setForm(initialState);
		}
	}, [form, initialState]);

	const setInForm = useCallback((name, value) => {
		setForm(_form => _.setIn(_form, name, value));
	}, []);

	const handleSubmit = useCallback(
		event => {
			if (event) {
				event.preventDefault();
			}
			if (onSubmit) {
				if (validationRules) {
					if (Object.keys(validationRules(form)).length === 0) {
						setErrors({});
						onSubmit();
					} else {
						setErrors(validationRules(form));
					}
				} else {
					onSubmit();
				}
			}
		},
		[onSubmit]
	);

	return {
		errors,
		form,
		handleChange,
		handleSubmit,
		resetForm,
		setForm,
		setErrors,
		setInForm
	};
}

export default useForm;
