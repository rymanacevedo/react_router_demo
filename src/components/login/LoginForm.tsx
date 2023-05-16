import {
	ActionFunctionArgs,
	Form,
	Link as ReactRouterLink,
	redirect,
	useActionData,
	useOutletContext,
	useSearchParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// import { Cookies } from 'react-cookie-consent';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Link,
	Text,
} from '@chakra-ui/react';
import { getLoginInfo, isUserInfo } from '../../services/auth.reactrouter';
import { z } from 'zod';
import { AuthLayoutContext } from './AuthLayout';
import AlertMessage from '../ui/AlertMessage';
import { User } from '../../services/user';
import { Dispatch, SetStateAction } from 'react';

type InferSafeParseErrors<T extends z.ZodType<any, any, any>, U = string> = {
	formErrors: U[];
	fieldErrors: {
		[P in keyof z.infer<T>]?: U[];
	};
};

export const LoginFieldsSchema = z.object({
	username: z.string().min(1),
	password: z.string().min(1),
	account: z.string(),
	passcode: z.string().min(4).optional(),
	remember: z.boolean().optional(),
});

export type LoginFields = z.infer<typeof LoginFieldsSchema>;
type LoginFieldsErrors = InferSafeParseErrors<typeof LoginFieldsSchema>;

export type ActionData<T> = {
	fields: T;
	errors?: T extends LoginFields ? LoginFieldsErrors : any;
};

export const loginAction =
	(setUser: Dispatch<SetStateAction<User>>) =>
	async ({ request }: ActionFunctionArgs) => {
		const clonedData = request.clone();
		// const url = new URL(request.url);
		// const abbrevName = url.searchParams.get('abbrevName');
		const formData = await clonedData.formData();
		// const cookieHeader = request.headers.get('Cookie');
		// const cookie = await hasUserCheckedMfa.parse(cookieHeader);
		const fields = Object.fromEntries(
			formData.entries(),
		) as unknown as LoginFields;

		const info = await getLoginInfo(fields, null);
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
			//TODO: await the setUser if successful
			setUser(user);
			return redirect('/_auth/authenticate');
		}

		return info;
	};

function LoginForm() {
	const context = useOutletContext<AuthLayoutContext>();
	// const navigate = useNavigate();
	const data = useActionData() as any;
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo') || '/';
	const { t: i18n } = useTranslation();

	// useEffect(() => {
	// 	if (data) {
	// 		navigate('_auth/authenticate');
	// 	}
	// }, [data]);

	return (
		<>
			<Form method="post">
				<FormControl isInvalid={Boolean(data?.errors?.fieldErrors.username)}>
					<FormLabel marginBottom={1}>
						{i18n('username')}
						<Text float="right" fontSize="12px">
							{i18n('typicallyEmail')}
						</Text>
					</FormLabel>
					<Input id="username" placeholder="name@email.com" name="username" />
					<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={Boolean(data?.errors?.fieldErrors.password)}>
					<FormLabel marginBottom={1}>
						{i18n('password')}
						<Text float="right" fontSize="12px">
							{i18n('caseSensitive')}
						</Text>
					</FormLabel>
					<Input
						id="password"
						type="password"
						name="password"
						autoComplete="current-password"
					/>
					<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
				</FormControl>
				{/*hidden form control*/}
				<FormControl hidden={true}>
					<Input
						readOnly={true}
						id="account"
						name="account"
						value={context.accountKey}
					/>
				</FormControl>
				<FormControl hidden={true}>
					<Input
						readOnly={true}
						id="redirectTo"
						name="redirectTo"
						value={redirectTo}
					/>
				</FormControl>

				<Button w="full" type="submit" name="Login">
					{i18n('logIn')}
				</Button>
			</Form>

			{data?.errors?.formErrors && (
				<AlertMessage text={data.errors.formErrors[0]} />
			)}

			<HStack spacing={6}>
				<Link
					as={ReactRouterLink}
					to="/forgot-username"
					color="ampSecondary.500"
					textDecoration="underline">
					{i18n('forgotUsername')}
				</Link>

				<Link
					as={ReactRouterLink}
					to="/forgot-password"
					color="ampSecondary.500"
					textDecoration="underline">
					{i18n('forgotPassword')}
				</Link>
			</HStack>
		</>
	);
}

export default LoginForm;
