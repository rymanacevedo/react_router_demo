import { useState } from 'react';
import axios from 'axios';

import { useDialogContext } from '../components/DialogProvider';

const useUserRolesService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useDialogContext();
	const fetchUserRoles = async (userKey, sessionKey) => {
		try {
			setLoading(true);
			const response = await axios({
				url: `/v2/users/${userKey}/roles`,
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

	return { error, loading, fetchUserRoles };
};

export default useUserRolesService;
