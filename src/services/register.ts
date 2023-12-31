import { RegisterFields } from '../routes/Register';
import { fetchDataPost } from './utils';
import { VITE_BACKEND_API } from '../lib/environment';

export const getRegisterData = async (fields: RegisterFields) => {
	const {
		emailAddress,
		firstName,
		lastName,
		password,
		username,
		accountUid,
		subAccount,
	} = fields;
	const personalDetailsBody = {
		emailAddress,
		firstName,
		lastName,
		password,
		userName: username,
	};

	const captchaResponse = fields['g-recaptcha-response'];

	const url = `${VITE_BACKEND_API}/v2/self-registration/${accountUid}?captchaResponse=${captchaResponse}&subaccount=${subAccount}&createCredentials=true`;

	return fetchDataPost<any>(url, personalDetailsBody);
};
