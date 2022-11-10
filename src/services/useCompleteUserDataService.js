import { useState } from 'react';
import axios from 'axios';

const useCompleteUserDataService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const fetchCompleteUserData = async (userKey, sessionKey) => {
		try {
			setLoading(true);
			const response = await axios({
				url: `${window.KF.state.baseUri}/v2/users/${userKey}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
				dataType: 'json',
				method: 'get',
			});
			return response.data;
		} catch (err) {
			console.log(err);
			setError(err);
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, fetchCompleteUserData };
};

export default useCompleteUserDataService;
