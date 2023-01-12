import { useState } from 'react';
import axios from 'axios';

import { useDialogContext } from '../components/DialogProvider';

const useKeepSessionAliveService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useDialogContext();
	const keepAlive = async (sessionKey) => {
		try {
			setLoading(true);

			const initDataResponse = await axios({
				method: 'post',
				url: '/v2/session/keep-alive',
				headers: {
					authorization: `Basic ${window.base64.encode(
						`${sessionKey}:someotherstring`,
					)}`,
				},
			});
			return initDataResponse.data;
		} catch (err) {
			console.log(err);
			setError(err);
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
			return err;
		} finally {
			setLoading(false);
		}
	};

	return { error, loading, keepAlive };
};

const useGetSessionExpirationService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useDialogContext();
	const getSessionExpiration = async (sessionKey) => {
		try {
			setLoading(true);

			const sessionExpirationResponse = await axios({
				method: 'get',
				url: '/v2/session/expiration',
				headers: {
					authorization: `Basic ${window.base64.encode(
						`${sessionKey}:someotherstring`,
					)}`,
				},
			});
			return sessionExpirationResponse.data;
		} catch (err) {
			console.log(err);
			setError(err);
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
			return err;
		} finally {
			setLoading(false);
		}
	};

	return { error, loading, getSessionExpiration };
};

export { useGetSessionExpirationService, useKeepSessionAliveService };
