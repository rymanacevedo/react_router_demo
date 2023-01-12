import { useState } from 'react';
import axios from 'axios';

import { useDialogContext } from '../components/DialogProvider';

const useCompleteUserAccountService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useDialogContext();
	const fetchCompleteUserAccount = async (accountKey, sessionKey) => {
		try {
			setLoading(true);
			const loadAccount = await axios({
				url: `/v2/accounts/${accountKey}`,
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
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, fetchCompleteUserAccount };
};

export default useCompleteUserAccountService;
