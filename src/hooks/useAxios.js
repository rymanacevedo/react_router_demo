import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const useAxios = (url, method, headers, payload = {}) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const controllerRef = useRef(new AbortController());
	const cancel = () => {
		controllerRef.current.abort();
	};

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const response = await axios.request({
					data: payload,
					signal: controllerRef.current.signal,
					method,
					url,
					headers,
				});

				setData(response.data);
			} catch (err) {
				setError(err);
				console.log(err);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return { cancel, data, error, loading };
};

export default useAxios;
