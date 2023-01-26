import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

import { useDialogContext } from '../../components/DialogProvider';

const useCurrentRoundService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useDialogContext();

	const { user } = useAuth();
	let subaccount = '';
	user.roles.forEach((role) => {
		if (role.name === 'Learner') {
			subaccount = role.account;
		}
	});

	const getCurrentRound = async (assignmentKey) => {
		try {
			setLoading(true);
			const accountDataResponse = await axios({
				url: `/v2/assignments/${assignmentKey}/current-round?isWebApp=true&subaccount=${subaccount}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
				method: 'get',
			});

			return accountDataResponse.data;
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
	return { error, loading, getCurrentRound };
};
export default useCurrentRoundService;
