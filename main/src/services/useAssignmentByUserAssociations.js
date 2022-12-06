import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const useAssignmentByUserAssociations = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();
	let courseCurricKey = 'TL97F67UP';
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
				method: 'GET',
				url: `v2/user-associations?courseCurricKey=${courseCurricKey}&hideUnassigned=false&isWebapp=true&subaccount=${subaccount}`,
				// baseURL: 'https://qa3api.amplifire.me:8443/v2/user-associations?courseCurricKey=TL97F67UP&hideUnassigned=false&isWebapp=true&subaccount=D8FCK9GWY',
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
