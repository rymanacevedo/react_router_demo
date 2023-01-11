import { useState, useContext } from 'react';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useLogoutService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useContext(DialogContext);
	const logoutService = async (sessionKey) => {
		try {
			setLoading(true);
			const logoutResponse = await axios({
				url: '/v2/session/logout',
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
				dataType: 'json',
				method: 'delete',
			});
			return logoutResponse;
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
	return { error, loading, logoutService };
};

export default useLogoutService;
