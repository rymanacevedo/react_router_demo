import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

import { useDialogContext } from '../../components/DialogProvider';
import { VITE_BACKEND_API } from '../../lib/environment';

const useCurrentRoundService = () => {
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

	const getCurrentRound = async (assignmentKey) => {
		try {
			setLoading(true);
			const response = await axios({
				url: `${VITE_BACKEND_API}/v2/assignments/${assignmentKey}/current-round?isWebApp=true&subaccount=${subaccount}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
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
	const getCurrentRoundSkipReview = async (assignmentKey) => {
		try {
			setLoading(true);
			const response = await axios({
				url: `${VITE_BACKEND_API}/v2/assignments/${assignmentKey}/current-round?isWebApp=true&skipreview=true&subaccount=${subaccount}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
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

	const putCurrentRound = async (roundId, roundQuestionId, answerData) => {
		try {
			setLoading(true);
			const response = await axios({
				url: `${VITE_BACKEND_API}/v2/rounds/${roundId}/questions/${roundQuestionId}/response?isWebApp=true&subaccount=${subaccount}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
				method: 'put',
				data: answerData,
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
	return {
		error,
		loading,
		getCurrentRound,
		putCurrentRound,
		getCurrentRoundSkipReview,
	};
};
export default useCurrentRoundService;
