import { useState } from 'react';
import axios from 'axios';

const useCompleteUserAccountService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const fetchCompleteUserAccount = async (accountKey, sessionKey) => {
		try {
			setLoading(true);
			const loadAccount = await axios({
				url: `${window.KF.state.baseUri}/v2/accounts/${accountKey}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
				dataType: 'json',
				method: 'get',
			});
			return loadAccount;
		} catch (err) {
			console.log(err);
			setError(err);
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, fetchCompleteUserAccount };
};

export default useCompleteUserAccountService;
