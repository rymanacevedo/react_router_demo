import { useState } from 'react';
import axios from 'axios';

const useRegisterService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const postPersonalDetails = async (
		{ firstName, lastName, emailAddress },
		accountAltKey,
		captchaResponse,
	) => {
		try {
			setLoading(true);
			const personalDetailsBody = {
				firstName,
				lastName,
				emailAddress,
			};

			return await axios({
				url: `${window.KF.state.baseUri}/v2/self-registration/${accountAltKey}?captchaResponse=${captchaResponse}`,
				headers: { 'Content-Type': 'application/json' },
				body: personalDetailsBody,
				dataType: 'json',
				method: 'POST',
			});
		} catch (err) {
			console.log(err);
			setError(err);
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, postPersonalDetails };
};
export default useRegisterService;
