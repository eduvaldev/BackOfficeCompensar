import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
	// return useRef(_.debounce(func, wait, options)).current;
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	return debounceValue;
}

export default useDebounce;
