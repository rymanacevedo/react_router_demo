import { useState, useContext } from 'react';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useSignupDataService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useContext(DialogContext);
	const postSignupData = async (
		accountUid,
		userAltKey,
		username,
		password,
		captchaResp = null,
	) => {
		try {
			setLoading(true);

			const signupBody = {
				accountUid: accountUid,
				username: username,
				password: password,
				captchaResp: captchaResp,
			};

			const signUpResponse = await axios({
				method: 'post',
				url: `${window.KF.state.baseUri}/v2/users/${userAltKey}/initial-credentials`,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				data: signupBody,
				dataType: 'json',
			});
			return signUpResponse.data;
		} catch (err) {
			console.log(err);
			setError(err);
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
			return err;
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, postSignupData };
};

export default useSignupDataService;
