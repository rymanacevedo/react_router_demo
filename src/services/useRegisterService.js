import { useState, useContext } from 'react';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useRegisterService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useContext(DialogContext);
	const postPersonalDetails = async (
		{ firstName, lastName, emailAddress },
		accountUid,
		subAcccount,
		captchaResponse,
	) => {
		try {
			setLoading(true);
			const personalDetailsBody = {
				userName: null,
				password: null,
				ssoId: null,
				roleKeys: null,
				roleNames: null,
				createdTimestamp: null,
				modifiedTimestamp: null,
				customAttributes: null,
				xid: null,
				firstName,
				lastName,
				emailAddress,
				isActive: true,
				key: null,
				uid: null,
				changeHistory: null,
				self: null,
			};

			return await axios({
<<<<<<< HEAD:src/services/useRegisterService.js
				url: `${window.KF.state.baseUri}/v2/self-registration/${accountAltKey}?captchaResponse=${captchaResponse}`,
				headers: { 'Content-Type': 'application/json' },
=======
				url: `/v2/self-registration/${accountUid}?captchaResponse=${captchaResponse}&subaccount=${subAcccount}`,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
>>>>>>> fdfeea350 (modified personDetailsBody for Rest call):main/src/services/useRegisterService.js
				body: personalDetailsBody,
				dataType: 'json',
				method: 'POST',
			});
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
	return { error, loading, postPersonalDetails };
};
export default useRegisterService;
