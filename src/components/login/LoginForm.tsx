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
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Text,
	VStack,
} from '@chakra-ui/react';
import { getLoginInfo, isUserInfo } from '../../services/auth.reactrouter';
import { z } from 'zod';
import { AuthLayoutContext } from './AuthLayout';
import AlertMessage from '../ui/AlertMessage';
import { User } from '../../services/user';
import { getUser, setUser } from '../../utils/user';
import { badRequest } from '../../services/utils';
import { Cookies } from 'react-cookie-consent';

type InferSafeParseErrors<T extends z.ZodType<any, any, any>, U = string> = {
	formErrors: U[];
	fieldErrors: {
		[P in keyof z.infer<T>]?: U[];
	};
};

export const LoginFieldsSchema = z
	.object({
		username: z.string().min(1),
		password: z.string().min(1),
		account: z.string(),
		passcode: z.string().min(4).optional(),
		remember: z.boolean().optional(),
	})
	.superRefine(({ username, password }, ctx) => {
		if (username.length === 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Username is required',
			});
		}

		if (password.length === 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password is required',
			});
		}
	});

export type LoginFields = z.infer<typeof LoginFieldsSchema>;
type LoginFieldsErrors = InferSafeParseErrors<typeof LoginFieldsSchema>;

export type ActionData<T> = {
	fields: T;
	errors?: T extends LoginFields ? LoginFieldsErrors : any;
	response?: Response;
	data?: any;
};

export const loginAction = async ({ request }: ActionFunctionArgs) => {
	const clonedData = request.clone();
	const formData = await clonedData.formData();
	const cookie = Cookies.get('device_uid');
	const fields = Object.fromEntries(
		formData.entries(),
	) as unknown as LoginFields;

	const result = LoginFieldsSchema.safeParse(fields);
	if (!result.success) {
		return badRequest({
			fields,
			errors: result.error.flatten(),
		});
	}
	const info = await getLoginInfo(fields, cookie);
	//@ts-ignore
	Cookies.set('learnerUid', info?.completeUserDataSchema.uid);

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

export const loginLoader = () => {
	const user = getUser();
	if (user) {
		return redirect('/authenticate');
	}
	return null;
};

export default function LoginForm() {
	const context = useOutletContext<AuthLayoutContext>();
	const data = useActionData() as ActionData<LoginFields>;
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get('redirectTo') || '/';
	const { t: i18n } = useTranslation();
	return (
		<>
			<Heading as="h1" size="lg">
				{i18n('welcomeMsg')}
			</Heading>
			<Form method="post">
				<VStack spacing={5} w={{ base: '100%', md: '358px' }}>
					<FormControl
						isRequired
						isDisabled={context.error}
						isInvalid={Boolean(data?.errors?.fieldErrors.username)}>
						<FormLabel marginBottom={1}>
							{i18n('username')}
							<Text float="right" fontSize="12px">
								{i18n('typicallyEmail')}
							</Text>
						</FormLabel>
						<Input id="username" placeholder="name@email.com" name="username" />
						<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
					</FormControl>
					<FormControl
						isRequired
						isDisabled={context.error}
						isInvalid={Boolean(data?.errors?.fieldErrors.password)}>
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

					<Button
						isDisabled={context.error}
						w="full"
						type="submit"
						name="Login">
						{i18n('logIn')}
					</Button>
				</VStack>
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
