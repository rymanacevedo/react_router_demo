import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

import { useDialogContext } from '../../components/DialogProvider';

const useModuleContentService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useDialogContext();

	const { user } = useAuth();
	let subaccount = '';
	user.roles.forEach((role) => {
		if (role.name === 'Learner') {
			subaccount = role.accountKey;
		}
	});

	const fetchAssignments = async (assignmentKey) => {
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

	const startRefresher = async (assignmentKey, isFocused) => {
		try {
			setLoading(true);

			const url = `/v2/assignments/${assignmentKey}/refreshers?subaccount=${subaccount}${
				isFocused ? '&isFocused=true' : ''
			}`;

			const startRefreshResponse = await axios({
				method: 'POST',
				url: url,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
			});

			return startRefreshResponse.data;
		} catch (err) {
			setError(err);
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
		} finally {
			setLoading(false);
		}
	};

	const fetchModuleContent = async (assignmentKey) => {
		try {
			setLoading(true);
			let assignmentsData = await fetchAssignments(assignmentKey);
			const moduleContentResponse = await axios({
				method: 'GET',
				url: assignmentsData.moduleUri,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
			});
			return moduleContentResponse.data;
		} catch (err) {
			setError(err);
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
		} finally {
			setLoading(false);
		}
	};

	const fetchModuleQuestions = async (assignmentKey) => {
		try {
			setLoading(true);
			let moduleContent = await fetchModuleContent(assignmentKey);
			const moduleContentQuestionResponse = await axios({
				method: 'GET',
				url: `${moduleContent.self}?deep=true&subaccount=${subaccount}&answerKey=true`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
			});
			return moduleContentQuestionResponse.data;
		} catch (err) {
			setError(err);
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
		} finally {
			setLoading(false);
		}
	};

	return {
		error,
		loading,
		fetchModuleContent,
		fetchAssignments,
		fetchModuleQuestions,
		startRefresher,
	};
};
export default useModuleContentService;
