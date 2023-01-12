import { useState } from 'react';
import axios from 'axios';

import { useDialogContext } from '../components/DialogProvider';

const useRegisterService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useDialogContext();
	const postPersonalDetails = async (
		{ emailAddress, firstName, lastName, password, userName },
		accountUid,
		subAcccount,
		captchaResponse,
	) => {
		try {
			setLoading(true);
			const personalDetailsBody = {
				emailAddress,
				firstName,
				lastName,
				password,
				userName,
			};

			return await axios({
				method: 'POST',
				url: `/v2/self-registration/${accountUid}?captchaResponse=${captchaResponse}&subaccount=${subAcccount}&createCredentials=true`,
				data: personalDetailsBody,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});
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
	return { error, loading, postPersonalDetails };
};
export default useRegisterService;
