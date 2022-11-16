import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const useModuleContentService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { user } = useAuth();
	let assignmentKey = '8TJTMV7NH';
	let subaccount = '';
	user.roles.forEach((role) => {
		if (role.name === 'Learner') {
			subaccount = role.account;
		}
	});

	const fetchAssignments = async () => {
		try {
			setLoading(true);
			const assignmentsResponse = await axios({
				method: 'GET',
				url: `/v2/assignments/${assignmentKey}?includeTimePerLU=true&subaccount=${subaccount}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
			});

			return assignmentsResponse.data;
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const fetchModuleContent = async () => {
		try {
			setLoading(true);
			let assignmentsData = await fetchAssignments();
			const modalContentResponse = await axios({
				method: 'GET',
				url: assignmentsData.moduleUri,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
			});
			return modalContentResponse.data;
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	return { error, loading, fetchModuleContent, fetchAssignments };
};
export default useModuleContentService;
