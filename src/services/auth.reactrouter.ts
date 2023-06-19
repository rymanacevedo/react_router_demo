import { VITE_BACKEND_API } from '../lib/environment';

import { z } from 'zod';
import { Role, RoleSchema } from './roles';
import { redirect } from 'react-router-dom';
import { authenticatedFetch, fetchDataPost, unauthorized } from './utils';
import type { ForgotPasswordFields } from '../components/login/ForgotPassword';
import { BootstrapData, BootstrapDataSchema } from '../App';
import { ForgotUsernameFields } from '../routes/ForgotUsername';

const initialUserDataSchema = z.object({
	sessionKey: z.string(),
	statusMessage: z.string(),
	errorMessage: z.string().nullable(),
	externalMessage: z.string().nullable(),
	userContexts: z.array(
		z.object({
			accountKey: z.string(),
			accountUid: z.string(),
			accountName: z.string(),
			userKey: z.string(),
			userEmailAddress: z.string(),
			isActive: z.boolean(),
			applications: z.array(z.string()),
			permissions: z.array(
				z.object({
					accountUid: z.string(),
					name: z.string(),
					applicationArea: z.string(),
				}),
			),
			roles: z.any().optional(),
		}),
	),
	needsProfileEdit: z.boolean().nullable(),
	deviceUid: z.string().nullable(),
});

const completeUserDataSchema = z.object({
	self: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	emailAddress: z.string(),
	isActive: z.boolean(),
	key: z.string(),
	uid: z.string(),
	userName: z.string(),
	password: z.string().nullable(),
	ssoId: z.string().nullable(),
	roleKeys: z.array(z.number()),
	roleNames: z.array(z.string()),
	createdTimestamp: z.string().optional(),
	modifiedTimestamp: z.string(),
	customAttributes: z.array(z.any()),
	xid: z.string().nullable(),
});

const userRolesSchema = z.array(RoleSchema);

const userAccountSchema = z.object({
	self: z.string(),
	key: z.string(),
	uid: z.string(),
	parent: z.string(),
	name: z.string(),
	description: z.string(),
	subdomain: z.string(),
	demo: z.boolean(),
	dateFormat: z.string(),
	publicKey: z.string().nullable(),
	customizations: z.array(
		z.object({
			self: z.string(),
			key: z.string(),
			accountUri: z.string(),
			accountKey: z.string(),
			name: z.string(),
			value: z.string(),
			resourceType: z.string(),
			imageFileName: z.string().nullable(),
			imagePath: z.string().nullable(),
			imageUri: z.string().nullable(),
			archived: z.boolean().optional(),
			createdUserFullName: z.string().nullable(),
			createdTimestamp: z.string().nullable(),
			modifiedUserFullName: z.string().nullable(),
			modifiedTimestamp: z.string().nullable(),
		}),
	),
	roles: z.array(RoleSchema),
	archived: z.boolean().optional(),
});

const UserInfoSchema = z.object({
	initialUserDataSchema,
	completeUserDataSchema,
	userRolesSchema,
	userAccountSchema,
});

type UserInfo = z.infer<typeof UserInfoSchema>;
type InitialUserData = z.infer<typeof initialUserDataSchema>;
type CompleteUserData = z.infer<typeof completeUserDataSchema>;
type UserAccountData = z.infer<typeof userAccountSchema>;

export async function bootstrap(request: Request) {
	try {
		const url = new URL(request.url);
		const abbrevName = url.searchParams.get('abbrevName');
		const localAbbrevName = localStorage.getItem('abbrevName');
		if (abbrevName || localAbbrevName) {
			const response = await fetch(
				`${VITE_BACKEND_API}/v2/bootstrap/account-info?name=${
					abbrevName || localAbbrevName
				}`,
			);
			return await response.json();
		}

		return null;
	} catch (e: any) {
		throw new Error(
			`bootstrap call failed, check if your database is running and restart your backend: ${e.message}`,
		);
	}
}

// TODO: validate fields with zod
export const getLoginInfo = async (fields: any, cookie: any = null) => {
	let initialRequestDefaultHeaders: any = {
		'amp-username': fields.username,
		'amp-password': fields.password,
		'amp-account': fields.account,
		'Content-Type': 'application/json',
	};
	if (fields.passcode) {
		initialRequestDefaultHeaders['amp-one-time-password'] = fields.passcode;
	}

	if (cookie) {
		initialRequestDefaultHeaders['amp-remembered-device-uid'] = window.btoa(
			cookie.deviceUid,
		);
	}

	const url =
		fields.remember !== undefined
			? `${VITE_BACKEND_API}/v2/authenticate?remember=${fields.remember}`
			: `${VITE_BACKEND_API}/v2/authenticate`;

	let response = await fetch(url, {
		method: 'POST',
		headers: initialRequestDefaultHeaders,
	});

	const initialUserData: InitialUserData = await response.json();
	if (
		initialUserData.sessionKey === null &&
		initialUserData.errorMessage === 'account is locked, password must be reset'
	) {
		//TODO: setErrorMessage(i18n('accountLockedResetPassword'));
		return unauthorized({
			fields,
			errors: {
				formErrors: ['Account is locked, password must be reset'],
				fieldErrors: {
					password: ['Account is locked, password must be reset'],
				},
			},
		});
	}

	if (
		(initialUserData.sessionKey === null &&
			initialUserData.errorMessage === 'invalid password') ||
		(initialUserData.sessionKey === null &&
			initialUserData.errorMessage === 'not authorized')
	) {
		return unauthorized({
			fields,
			errors: {
				formErrors: ['Username or password is invalid'],
				fieldErrors: {
					password: ['Not authorized, invalid password'],
					username: ['Not authorized, invalid username'],
				},
			},
		});
	}

	if (
		initialUserData.sessionKey === null &&
		initialUserData.errorMessage === 'one time passcode does not match'
	) {
		//TODO: setErrorMessage(i18n('multiFactorAuthCodeInvalidError'));
		return unauthorized({
			fields,
			errors: {
				formErrors: ['One time passcode does not match'],
				fieldErrors: {
					passcode: ['One time passcode does not match'],
				},
			},
		});
	}

	if (initialUserData.statusMessage === 'one time passcode sent') {
		return redirect(
			`/mfa?email=${initialUserData.userContexts[0].userEmailAddress}&username=${fields.username}&password=${fields.password}&account=${fields.account}`,
		);
	}

	if (initialUserData.sessionKey && response.status === 200) {
		const { userKey, accountKey } = initialUserData.userContexts[0];
		const { sessionKey } = initialUserData;
		response = await fetch(`${VITE_BACKEND_API}/v2/users/${userKey}`, {
			method: 'GET',
			headers: {
				Authorization: `Basic ${window.btoa(`${sessionKey}:someotherstring`)}`,
				'Content-Type': 'application/json',
			},
		});
		const completeUserData: CompleteUserData = await response.json();

		response = await fetch(`${VITE_BACKEND_API}/v2/users/${userKey}/roles`, {
			method: 'GET',
			headers: {
				Authorization: `Basic ${window.btoa(`${sessionKey}:someotherstring`)}`,
				'Content-Type': 'application/json',
			},
		});

		const userRoles = await response.json();
		const roles: Role[] = userRoles.items;

		response = await fetch(`${VITE_BACKEND_API}/v2/accounts/${accountKey}`, {
			method: 'GET',
			headers: {
				Authorization: `Basic ${window.btoa(`${sessionKey}:someotherstring`)}`,
				'Content-Type': 'application/json',
			},
		});

		const userAccount: UserAccountData = await response.json();

		const data: UserInfo = {
			initialUserDataSchema: initialUserData,
			completeUserDataSchema: completeUserData,
			userRolesSchema: roles,
			userAccountSchema: userAccount,
		};
		return data;
	}

	// something on the backend isn't working correctly
	if (initialUserData.statusMessage === 'not authorized') {
		return unauthorized({
			fields,
			errors: {
				formErrors: ['Uh oh, something went wrong'],
				fieldErrors: {},
			},
		});
	}
};

export const getSession = async (sessionKey: string) => {
	const url = `${VITE_BACKEND_API}/v2/session/keep-alive`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${window.btoa(`${sessionKey}:someotherstring`)}`,
		},
	});
	return { response };
};

export const getSessionExpiration = async (sessionKey: string) => {
	const url = `${VITE_BACKEND_API}/v2/session/expiration`;
	return authenticatedFetch<any>(url, sessionKey);
};

export const logoutSession = async (sessionKey: string) => {
	const url = `${VITE_BACKEND_API}/v2/session/logout`;
	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Basic ${window.btoa(`${sessionKey}:someotherstring`)}`,
				'Content-Type': 'application/json',
			},
		});
		return await response.json();
	} catch (e: any) {
		throw new Error(`logoutSession call failed: ${e.message}`);
	}
};

export const isUserInfo = (info: any): info is UserInfo => {
	return UserInfoSchema.safeParse(info).success;
};

export const getForgotPasswordData = async (fields: ForgotPasswordFields) => {
	const url = `${VITE_BACKEND_API}/v2/bootstrap/forgot-password`;
	const forgotPasswordBody = {
		username: fields.username,
		accountUid: fields.accountUid,
		captchaResp: fields['g-recaptcha-response'],
	};
	return fetchDataPost<any>(url, forgotPasswordBody);
};

export const isBootStrapData = (data: any): data is BootstrapData => {
	return BootstrapDataSchema.safeParse(data).success;
};

export const getForgotUsernameData = async (fields: ForgotUsernameFields) => {
	const url = `${VITE_BACKEND_API}/v2/bootstrap/forgot-username`;
	const forgotUserBody = {
		emailAddress: fields.email,
		accountUid: fields.accountUid,
		captchaResp: fields['g-recaptcha-response'],
	};
	return fetchDataPost<any>(url, forgotUserBody);
};

export const getSignupData = async (
	userAltKey: string,
	accountUid: string,
	username: string,
	password: string,
	captchaResp: string,
) => {
	const url = `${VITE_BACKEND_API}/v2/users/${userAltKey}/initial-credentials`;
	const signupBody = {
		accountUid,
		username,
		password,
		captchaResp,
	};

	return fetchDataPost<any>(url, signupBody);
};
