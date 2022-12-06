import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const useAssignmentByUserAssociations = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();
	let courseCurricKey = '3HD7FRP39';
	let subaccount = '';
	user.roles.forEach((role) => {
		if (role.name === 'Learner') {
			subaccount = role.account;
		}
	});

	const getAssignments = async () => {
		try {
			setLoading(true);
			const assignmentDataResponse = await axios({
				method: 'get',
				url: `/v2/user-associations?courseCurricKey=${courseCurricKey}&hideUnassigned=false&isWebapp=true&subaccount=${subaccount}`,
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
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, getAssignments };
};
export default useAssignmentByUserAssociations;
