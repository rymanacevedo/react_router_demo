import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

import { useDialogContext } from '../components/DialogProvider';

const useAssignmentByUserAssociations = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();

	const { setShowAlert } = useDialogContext();

	let subaccount = '';
	user.roles.forEach((role) => {
		if (role.name === 'Learner') {
			subaccount = role.account;
		}
	});

	const getAssignments = async (courseCurricKey) => {
		try {
			setLoading(true);
			const assignmentDataResponse = await axios({
				method: 'get',
				url: `/v2/user-associations?courseCurricKey=${courseCurricKey}&userKey=CB59UXSUD&hideUnassigned=false&isWebapp=true&subaccount=${subaccount}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
			});

			return assignmentDataResponse.data;
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
	return { error, loading, getAssignments };
};
export default useAssignmentByUserAssociations;
