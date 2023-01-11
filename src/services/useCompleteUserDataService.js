import { useState, useContext } from 'react';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useCompleteUserDataService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useContext(DialogContext);
	const fetchCompleteUserData = async (userKey, sessionKey) => {
		try {
			setLoading(true);
			const response = await axios({
				url: `/v2/users/${userKey}`,
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
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, fetchCompleteUserData };
};

export default useCompleteUserDataService;
