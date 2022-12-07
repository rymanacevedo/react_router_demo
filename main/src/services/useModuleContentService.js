import { useState, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useModuleContentService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
	const { setShowAlert } = useContext(DialogContext);

>>>>>>> e1cc55a21 (added dialog trigger to remaining services)
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
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
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
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
		} finally {
			setLoading(false);
		}
	};

	return { error, loading, fetchModuleContent, fetchAssignments };
};
export default useModuleContentService;
