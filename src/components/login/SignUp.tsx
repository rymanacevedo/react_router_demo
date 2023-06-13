import { useRef, useState } from 'react';
import {
	ActionFunction,
	ActionFunctionArgs,
	Link as ReactRouterLink,
	LoaderFunction,
	// useParams,
	redirect,
	useLoaderData,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
	Alert,
	AlertIcon,
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Link,
	UnorderedList,
	ListItem,
	Text,
	VStack,
	RequiredIndicator,
} from '@chakra-ui/react';

import ReCAPTCHA from 'react-google-recaptcha';
import { z } from 'zod';
import { badRequest } from '../../services/utils';
import { getSignupData } from '../../services/auth.reactrouter';
import { BootstrapData } from '../../App';
// import { AccountInformation } from '../../routes/SignUpLoader';

export const SignupFieldsSchema = z
	.object({
		username: z.string().min(1),
		password: z.string().min(1),
		confirmPassword: z.string().min(1),
		accountUid: z.string().min(1),
		userAltKey: z.string().min(1),
		'g-recaptcha-response': z.string().refine((value) => value.length > 0, {
			message: 'Please complete the CAPTCHA',
		}),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		// setErrorMessage(i18n('passwordsDoNotMatch'));
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Your passwords do not match',
			});
		}

		if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
			ctx.addIssue({
				code: 'custom',
				message:
					'Your password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
			});
		}
	});

type SignupFields = z.infer<typeof SignupFieldsSchema>;

export const signupLoader: LoaderFunction = async () => {
	// const cookieHeader = request.headers.get('Cookie');
	// const hasUserVisitedPage = await hasUserVisited.parse(cookieHeader);
	// TODO: deal with session_key in cookies
	// return json(hasUserVisitedPage);
	// return json({ abbrevName: abbrevName, userAltKey: userAltKey });
};

export const signupAction: ActionFunction = async ({
	request,
}: ActionFunctionArgs) => {
	const clonedData = request.clone();
	const formData = await clonedData.formData();
	// const session = await getSession(request.headers.get('Cookie'));
	const fields = Object.fromEntries(formData.entries()) as SignupFields;
	const result = SignupFieldsSchema.safeParse({
		username: fields.username,
		password: fields.password,
		confirmPassword: fields.confirmPassword,
		accountUid: fields.accountUid,
		userAltKey: fields.userAltKey,
		'g-recaptcha-response': fields['g-recaptcha-response'],
	});

	if (!result.success) {
		return badRequest({
			fields,
			errors: result.error.flatten(),
		});
	}

	const { data } = await getSignupData(
		fields.userAltKey,
		fields.accountUid,
		fields.username,
		fields.password,
		fields['g-recaptcha-response'],
	);

	const items = data.items;

	if (data.errorMessage && data.errorMessage === 'username is not available') {
		//TODO: setErrorMessage(i18n('usernameUnavailable'));
		return badRequest({
			fields,
			errors: {
				formErrors: ['username is not available'],
				fieldErrors: {
					username: ['username is not available'],
				},
			},
		});
	}

	if (
		items[0].message &&
		items[0].message === 'Alternate Key must be 9 characters in length'
	) {
		return badRequest({
			fields,
			errors: {
				formErrors: ['Alternate Key must be 9 characters in length'],
				fieldErrors: {
					userAltKey: ['Alternate Key must be 9 characters in length'],
				},
			},
		});
	}

	if (
		items[0].message &&
		items[0].message === 'Alternate Key has illegal characters'
	) {
		return badRequest({
			fields,
			errors: {
				formErrors: ['Alternate key has illegal characters'],
				fieldErrors: {
					accountUid: ['Alternate key has illegal characters'],
				},
			},
		});
	}
	// session.flash('successMessageToShow', 'signUpSuccess');
	// TODO: deal with success
	return redirect('/success?sucessMessageToShow=signUpSuccess');
};

function SignUp(): JSX.Element {
	const abbrevName = localStorage.getItem('abbrevName');
	const userAltKey = localStorage.getItem('userAltKey');
	// const params = useParams<{ userAltKey: string }>();
	// const nav = useNavigate();
	const { t: i18n } = useTranslation();
	// const { userAltKey, abbrevName } = useLoaderData() as any;
	console.log(userAltKey);
	console.log(abbrevName);
	// const context = useL<AuthLayoutContext>();
	const context = useLoaderData() as BootstrapData | any;
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);
	// const [userAltKey, setUserAltKey] = useState<string>('');
	const [captchaRes, setCaptchaRes] = useState<string | null>(null);
	const [showForm, setShowForm] = useState<boolean>(true);
	const [verified, setVerified] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [formError, setFormError] = useState<{
		username: boolean;
		password: boolean;
		confirmPassword: boolean;
	}>({
		username: false,
		password: false,
		confirmPassword: false,
	});
	const recaptchaRef = useRef<ReCAPTCHA | null>(null);

	// const { postSignupData } = useSignupDataService();

	const handleUsernameChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setUsername(e.target.value);
	};

	const handleUsernameValidation = (): void => {
		if (!username) {
			setFormError((prevValue) => ({ ...prevValue, username: true }));
		} else {
			setFormError((prevValue) => ({ ...prevValue, username: false }));
		}
	};

	const handlePasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setPassword(e.target.value);
	};

	const handlePasswordValidation = (): void => {
		if (
			!password ||
			!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)
		) {
			setFormError((prevValue) => ({ ...prevValue, password: true }));
		} else {
			setFormError((prevValue) => ({ ...prevValue, password: false }));
		}
	};

	const handleConfirmPassword = (
		e: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setConfirmPassword(e.target.value);
	};

	const handleConfirmPasswordValidation = (): void => {
		if (!confirmPassword) {
			setFormError((prevValue) => ({
				...prevValue,
				confirmPassword: true,
			}));
		}

		if (confirmPassword !== password) {
			setErrorMessage(i18n('passwordsDoNotMatch'));
			setFormError((prevValue) => ({
				...prevValue,
				confirmPassword: true,
			}));
		} else if (confirmPassword && confirmPassword === password) {
			setFormError((prevValue) => ({
				...prevValue,
				confirmPassword: false,
			}));
			setErrorMessage('');
		}
	};

	const handleSuccessChange = (): void => {
		setSuccess((prevValue) => !prevValue);
		setShowForm(false);
	};

	// useEffect(() => {
	// 	// setUserAltKey(params.userAltKey ?? '');
	// 	// nav('/signup', { replace: true });
	// }, []);

	const onChange = (value: string | null): void => {
		if (value) {
			setCaptchaRes(value);
			setVerified(true);
		}
	};

	const submitHandler = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		setErrorMessage('');

		if (!verified) {
			setErrorMessage(i18n('pleaseCompleteRecaptcha'));
		}

		if (verified && password === confirmPassword) {
			recaptchaRef.current?.reset();
			setVerified(false);
			const signUpRes = await getSignupData(
				userAltKey,
				context.accountUid,
				username,
				password,
				captchaRes,
			);

			if (
				//@ts-ignore
				signUpRes?.response?.data?.errorMessage === 'username is not available'
			) {
				setErrorMessage(i18n('usernameUnavailable'));
			}

			if (!signUpRes) {
				handleSuccessChange();
			}
		}
	};

	return (
		<>
			{showForm && (
				<VStack spacing="5" w={{ base: '100%', md: '358px' }}>
					<form>
						<VStack
							spacing="5"
							w={{ base: '100%', md: '358px' }}
							as="form"
							method="post"
							noValidate>
							<Heading style={{ alignContent: 'center' }} fontSize="28px">
								<p>{i18n('signUpText')}</p>
							</Heading>

							<FormControl isRequired isInvalid={formError.username}>
								<FormLabel
									marginBottom={1}
									requiredIndicator={<RequiredIndicator />}>
									{i18n('username')}
								</FormLabel>
								<Input
									id="username"
									autoFocus
									placeholder="name@email.com"
									name="username"
									value={username}
									onChange={handleUsernameChange}
									onBlur={handleUsernameValidation}
									maxLength={100}
								/>
								<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
							</FormControl>

							<FormControl isRequired isInvalid={formError.password}>
								<FormLabel
									marginBottom={1}
									requiredIndicator={<RequiredIndicator />}>
									{i18n('password')}
								</FormLabel>
								<Input
									id="newPassword"
									type="password"
									placeholder={i18n('password')}
									name="password"
									value={password}
									onChange={handlePasswordChange}
									onBlur={handlePasswordValidation}
								/>
								<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
							</FormControl>

							<FormControl isRequired isInvalid={formError.confirmPassword}>
								<FormLabel
									marginBottom={1}
									requiredIndicator={<RequiredIndicator />}>
									{i18n('reenterPasswordFormLabel')}
								</FormLabel>
								<Input
									id="newPassword2"
									type="password"
									placeholder={i18n('reenterPasswordFormLabel')}
									name="confirmPassword"
									value={confirmPassword}
									onChange={handleConfirmPassword}
									onBlur={handleConfirmPasswordValidation}
								/>
								<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
							</FormControl>

							{context.recaptchaSiteKey && (
								<ReCAPTCHA
									sitekey={context.recaptchaSiteKey}
									onChange={onChange}
									ref={recaptchaRef}
								/>
							)}
							{/* @ts-ignore */}
							<Button w="full" onClick={submitHandler} name="Login">
								{i18n('continueBtnText')}
							</Button>

							{errorMessage && (
								<Alert status="error" bg="ampError.50">
									<AlertIcon />
									<Text align="center" color="ampError.700">
										{i18n(errorMessage)}
									</Text>
								</Alert>
							)}

							<Text>{i18n('passwordRuleText')}</Text>
							<UnorderedList>
								<ListItem>{i18n('upperCaseRule')}</ListItem>
								<ListItem>{i18n('lowerCaseRule')}</ListItem>
								<ListItem>{i18n('digitRule')}</ListItem>
								<ListItem>{i18n('specialCharacterRule')}</ListItem>
							</UnorderedList>
						</VStack>
					</form>
				</VStack>
			)}
			{success && (
				<Center height="100%">
					<VStack>
						<Text>{i18n('userCreated')}</Text>
						<Text>
							{i18n('please')}{' '}
							<Link
								as={ReactRouterLink}
								to={{
									pathname: '/login',
									search: `?abbrevName=${abbrevName}`,
								}}
								color="ampSecondary.500"
								textDecoration="underline">
								{i18n('clickHere')}
							</Link>{' '}
							{i18n('toLogIn')}
						</Text>
					</VStack>
				</Center>
			)}
		</>
	);
}

export default SignUp;
