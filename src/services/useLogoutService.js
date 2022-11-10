import { useState } from 'react';
import axios from 'axios';

const useLogoutService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const logoutService = async (sessionKey) => {
		try {
			setLoading(true);
			const logoutResponse = await axios({
				url: `${window.KF.state.baseUri}/v2/session/logout`,
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
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, logoutService };
};

export default useLogoutService;
