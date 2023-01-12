import { useState } from 'react';
import axios from 'axios';

import { useDialogContext } from '../components/DialogProvider';

const useForgotUsernameService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useDialogContext();
	const fetchForgotUsername = async (emailAddress, accountUid, captchaResp) => {
		try {
			setLoading(true);

			const forgotUsernameBody = {
				emailAddress: emailAddress,
				accountUid: accountUid,
				captchaResp: captchaResp,
			};

			const forgotUsernameResponse = await axios({
				method: 'post',
				url: '/v2/bootstrap/forgot-username',
				data: forgotUsernameBody,
				headers: { 'Content-Type': 'application/json' },
			});

			return forgotUsernameResponse.status;
		} catch (err) {
			console.log(err);
			setError(err);
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
			return err.response.status;
		} finally {
			setLoading(false);
		}
	};

	return { error, loading, fetchForgotUsername };
};
export default useForgotUsernameService;
