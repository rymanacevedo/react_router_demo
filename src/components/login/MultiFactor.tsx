import { ActionData, LoginFields, LoginFieldsSchema } from './LoginForm';
import { ActionFunction, LoaderFunction } from 'react-router';
import {
	Form,
	json,
	redirect,
	useActionData,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import { badRequest } from '../../services/utils';
import { getUser, setUser } from '../../utils/user';
import { getLoginInfo, isUserInfo } from '../../services/auth.reactrouter';
import { useTranslation } from 'react-i18next';
import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Text,
} from '@chakra-ui/react';
import AlertMessage from '../ui/AlertMessage';
import { User } from '../../services/user';

type LoaderData = {
	email: string;
	username: string;
	p: string;
	account: string;
};

export const loader: LoaderFunction = async ({ request }) => {
	const user = getUser();
	if (user) {
		return redirect('/authenticate');
	}

	const url = new URL(request.url);
	const email = url.searchParams.get('email');
	const username = url.searchParams.get('username');
	const p = url.searchParams.get('password');
	const account = url.searchParams.get('account');
	return json({ email, username, p, account });
};

export const mfaAction: ActionFunction = async ({ request }) => {
	const clonedData = request.clone();
	const formData = await clonedData.formData();

	const fields = Object.fromEntries(
		formData.entries(),
	) as unknown as LoginFields;

	// if checkbox is checked, it'll return an empty string in chakra-ui
	// @ts-ignore
	const checkboxValue = fields.remember === '';
	const modifiedFields = { ...fields, remember: checkboxValue } as LoginFields;

	const result = LoginFieldsSchema.safeParse(modifiedFields);
	if (!result.success) {
		return badRequest({
			fields,
			errors: result.error.flatten(),
		});
	}
	const info = await getLoginInfo(modifiedFields);

	if (isUserInfo(info)) {
		// 	set the user object in the session
		let user: User | null;
		user = {
			firstName: info.completeUserDataSchema.firstName,
			lastName: info.completeUserDataSchema.lastName,
			roles: info.userRolesSchema,
			sessionKey: info.initialUserDataSchema.sessionKey,
			userKey: info.completeUserDataSchema.key,
			accountDomain: info.userAccountSchema.subdomain,
			deviceUid: info.initialUserDataSchema.deviceUid,
		};
		setUser(user);
		return redirect('/authenticate');
	}

	return info;
};

export default function MultiFactor() {
	const data = useLoaderData() as LoaderData;
	const actionData = useActionData() as ActionData<LoginFields>;
	const navigate = useNavigate();
	const { t: i18n } = useTranslation();
	const mailParts = data.email.split('@');
	const obfuscatedEmail = `${mailParts[0].slice(0, 1)}...${mailParts[0].slice(
		-1,
	)}@${mailParts[1]}`;

	return (
		<>
			<Form method="post">
				<Text align="center">
					{i18n('multiFactorAuthEmailSentMsg', { email: obfuscatedEmail })}
				</Text>
				<Text align="center">
					{i18n('multiFactorAuthTimeoutMsg', { duration: 20 })}
				</Text>
				<Text align="center">{i18n('multiFactorAuthCheckEmailMsg')}</Text>

				<FormControl
					isRequired
					isInvalid={Boolean(actionData?.errors?.fieldErrors.passcode)}>
					<FormLabel marginBottom={1}>{i18n('passcode')}</FormLabel>
					<Input
						id="passcode"
						minLength={1}
						maxLength={6}
						placeholder="passcode"
						name="passcode"
					/>
					<FormErrorMessage>{i18n('pleaseEnterPasscode')}</FormErrorMessage>
				</FormControl>

				<FormControl>
					<Checkbox
						id="remember"
						name="remember"
						defaultChecked={false}
						variant="formCheckbox">
						{i18n('multiFactorAuthRememberDevice')}
					</Checkbox>
				</FormControl>
				{/*hidden form control*/}
				<FormControl hidden={true}>
					<Input
						readOnly={true}
						id="username"
						name="username"
						value={data.username}
					/>
				</FormControl>

				{/*hidden form control*/}
				<FormControl hidden={true}>
					<Input readOnly={true} id="password" name="password" value={data.p} />
				</FormControl>

				{/*hidden form control*/}
				<FormControl hidden={true}>
					<Input
						readOnly={true}
						id="account"
						name="account"
						value={data.account}
					/>
				</FormControl>

				<HStack w="100%">
					<Button w="50%" type="submit" name="Login">
						{i18n('submitBtnText')}
					</Button>
					<Button
						w="50%"
						variant="ampOutline"
						name="cancel"
						onClick={() => {
							navigate(-1);
						}}>
						{i18n('cancelBtnText')}
					</Button>
				</HStack>
			</Form>
			{actionData?.errors?.formErrors &&
				actionData.errors.formErrors.length > 0 && (
					<AlertMessage text={actionData.errors.formErrors[0]} />
				)}
		</>
	);
}
