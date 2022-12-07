import { useState, useContext } from 'react';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useInitialUserDataService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useContext(DialogContext);
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
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
		} finally {
			setLoading(false);
		}
	};

	return { error, loading, fetchInitialUserData };
};

export default useInitialUserDataService;
