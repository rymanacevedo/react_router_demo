import { useState, useContext } from 'react';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useForgotPasswordService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useContext(DialogContext);
	const fetchForgotPassword = async (username, accountUid, captchaResp) => {
		try {
			setLoading(true);
			const forgotPasswordBody = {
				username: username,
				accountUid: accountUid,
				captchaResp: captchaResp,
			};

			const forgotPasswordResponse = await axios({
				method: 'post',
				url: `${window.KF.state.baseUri}/v2/bootstrap/forgot-password`,
				data: forgotPasswordBody,
				headers: { 'Content-Type': 'application/json' },
			});

			return forgotPasswordResponse;
		} catch (err) {
			console.log(err);
			setError(err);
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
			return err.response.data;
		} finally {
			setLoading(false);
		}
	};

	return { error, loading, fetchForgotPassword };
};
export default useForgotPasswordService;
