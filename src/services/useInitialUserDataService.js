import { useState } from 'react';
import axios from 'axios';

const useInitialUserDataService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const fetchInitialUserData = async (
		accountKey,
		username,
		password,
		rememberedDeviceUid = null,
	) => {
		try {
			setLoading(true);

			const initialRequestDefaultHeaders = {
				'amp-username': username,
				'amp-password': password,
				'amp-account': accountKey,
				'Content-Type': 'application/json',
			};

			if (rememberedDeviceUid !== null) {
				initialRequestDefaultHeaders.append(
					'amp-remembered-device-uid',
					rememberedDeviceUid,
				);
			}

			const initDataResponse = await axios({
				url: `${window.KF.state.baseUri}/v2/authenticate`,
				headers: initialRequestDefaultHeaders,
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

	return { error, loading, fetchInitialUserData };
};

export default useInitialUserDataService;
