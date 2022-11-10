import { useState } from 'react';
import axios from 'axios';
const useMultiFactorAuthService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const fetchMultiFactorAuthData = async (
		accountKey,
		username,
		password,
		remember,
		passcode = null,
	) => {
		try {
			setLoading(true);
			const initDataResponse = await axios({
				url: `${window.KF.state.baseUri}/v2/authenticate?remember=${remember}`,
				headers: {
					'amp-username': username,
					'amp-password': password,
					'amp-account': accountKey,
					'amp-one-time-password': passcode,
					'Content-Type': 'application/json',
				},
				dataType: 'json',
				method: 'post',
			});

			return initDataResponse.data;
		} catch (err) {
			console.log(err);
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	return { error, loading, fetchMultiFactorAuthData };
};
export default useMultiFactorAuthService;
