import { useState, useContext } from 'react';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useRegisterService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useContext(DialogContext);
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
<<<<<<< HEAD:src/services/useRegisterService.js
<<<<<<< HEAD:src/services/useRegisterService.js
				url: `${window.KF.state.baseUri}/v2/self-registration/${accountAltKey}?captchaResponse=${captchaResponse}`,
				headers: { 'Content-Type': 'application/json' },
=======
				url: `/v2/self-registration/${accountUid}?captchaResponse=${captchaResponse}&subaccount=${subAcccount}`,
=======
				method: 'POST',
				url: `/v2/self-registration/${accountUid}?captchaResponse=${captchaResponse}&subaccount=${subAcccount}&createCredentials=true`,
				data: personalDetailsBody,
>>>>>>> 89fce0cd1 (new register service integration):main/src/services/useRegisterService.js
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
<<<<<<< HEAD:src/services/useRegisterService.js
>>>>>>> fdfeea350 (modified personDetailsBody for Rest call):main/src/services/useRegisterService.js
				body: personalDetailsBody,
				dataType: 'json',
				method: 'POST',
=======
>>>>>>> 89fce0cd1 (new register service integration):main/src/services/useRegisterService.js
			});
		} catch (err) {
			console.log(err);
			setError(err);
<<<<<<< HEAD:src/services/useRegisterService.js
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
=======
			return err;
>>>>>>> 89fce0cd1 (new register service integration):main/src/services/useRegisterService.js
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, postPersonalDetails };
};
export default useRegisterService;
