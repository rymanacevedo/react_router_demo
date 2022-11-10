import { useState } from 'react';
import {
	Link as ReactRouterLink,
	useNavigate,
	useOutletContext,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import usefetchInitialUserData from '../../services/useInitialUserDataService';
import useUserRolesService from '../../services/useUserRolesService';
import useCompleteUserDataService from '../../services/useCompleteUserDataService';
import useCompleteUserAccountService from '../../services/useCompleteUserAccountService';

import { Cookies } from 'react-cookie-consent';

import {
	Alert,
	AlertIcon,
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
import { useAuth } from '../../hooks/useAuth';

// TODO add prop types

function LoginForm() {
	const { login } = useAuth();
	const nav = useNavigate();
	const context = useOutletContext();
	const { t: i18n } = useTranslation();
	const [disabled, setDisabled] = useState(false);
	const [loginAttemptCountState, setLoginAttemptCountState] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
	const [formErrors, setFormErrors] = useState({
		username: false,
		password: false,
	});
	const [formData, setFormData] = useState({ username: '', password: '' });

	const { fetchUserRoles } = useUserRolesService();
	const { fetchCompleteUserData } = useCompleteUserDataService();
	const { fetchInitialUserData } = usefetchInitialUserData();

	const { fetchCompleteUserAccount } = useCompleteUserAccountService();

	const handlePasswordChange = (e) => {
		setFormData(() => ({
			...formData,
			password: e.target.value,
		}));
	};

	const handleUsernameChange = (e) => {
		setFormData(() => ({
			...formData,
			username: e.target.value,
		}));
	};

	const incrementCount = () => {
		setLoginAttemptCountState(loginAttemptCountState + 1);
	};

	const handleUsernameValidation = () => {
		if (!formData.username) {
			setFormErrors(() => ({
				...formErrors,
				username: true,
			}));
		}

		if (formData.username) {
			setFormErrors(() => ({
				...formErrors,
				username: false,
			}));
		}
	};

	const handlePasswordValidation = () => {
		if (!formData.password) {
			setFormErrors(() => ({
				...formErrors,
				password: true,
			}));
		}
		if (formData.password) {
			setFormErrors(() => ({
				...formErrors,
				password: false,
			}));
		}
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		incrementCount();
		if (loginAttemptCountState < 4) {
			const cookieKey = 'device_uid';
			const rememberedDeviceUid = Cookies.get(cookieKey);
			const initialUserData = await fetchInitialUserData(
				context.accountKey,
				formData.username,
				formData.password,
				rememberedDeviceUid,
			);

			if (initialUserData.statusMessage === 'one time passcode sent') {
				nav('/MultiFactor', {
					state: {
						email: initialUserData.userContexts[0].userEmailAddress,
						username: formData.username,
						password: formData.password,
						accountKey: context.accountKey,
					},
				});
			}

			if (initialUserData.sessionKey !== null) {
				const completeUserData = await fetchCompleteUserData(
					initialUserData.userContexts[0].userKey,
					initialUserData.sessionKey,
				);
				const userRoles = await fetchUserRoles(
					initialUserData.userContexts[0].userKey,
					initialUserData.sessionKey,
				);
				const userAccount = await fetchCompleteUserAccount(
					initialUserData.userContexts[0].accountKey,
					initialUserData.sessionKey,
				);

				login({ initialUserData, completeUserData, userRoles, userAccount });
			}

			if (
				initialUserData.sessionKey === null &&
				initialUserData.errorMessage ===
					'account is locked, password must be reset'
			) {
				setFormData({ username: '', password: '' });
				setDisabled(true);
				setErrorMessage('accountLockedResetPassword');
			}

			if (
				(initialUserData.sessionKey === null &&
					initialUserData.errorMessage === 'invalid password') ||
				(initialUserData.sessionKey === null &&
					initialUserData.errorMessage === 'not authorized')
			) {
				setFormData({ username: '', password: '' });
				setErrorMessage('userPassIncorrect');
			}
		} else {
			setFormData({ username: '', password: '' });
			setDisabled(true);
			setErrorMessage('accountLockedResetPassword');
		}
	};

	return (
		<>
			<VStack
				spacing="5"
				w={{ base: '100%', md: '358px' }}
				as="form"
				method="post"
				onSubmit={submitHandler}>
				<Heading fontSize="28px">{i18n('welcomeMsg')}</Heading>
				<FormControl
					isRequired
					isDisabled={disabled || context.fetchInitialAccountDataError}
					isInvalid={formErrors.username}>
					<FormLabel marginBottom={1} requiredIndicator>
						{i18n('username')}
						<Text float="right" fontSize="12px">
							{i18n('typicallyEmail')}
						</Text>
					</FormLabel>
					<Input
						id="username"
						placeholder="name@email.com"
						name="username"
						value={formData.username}
						onChange={handleUsernameChange}
						onBlur={handleUsernameValidation}
					/>
					<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
				</FormControl>

				<FormControl
					isRequired
					isDisabled={disabled || context.fetchInitialAccountDataError}
					isInvalid={formErrors.password}>
					<FormLabel marginBottom={1} requiredIndicator>
						{i18n('password')}
						<Text float="right" fontSize="12px">
							{i18n('caseSensitive')}
						</Text>
					</FormLabel>
					<Input
						id="password"
						type="password"
						placeholder={i18n('password')}
						name="password"
						value={formData.password}
						onChange={handlePasswordChange}
						onBlur={handlePasswordValidation}
					/>
					<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
				</FormControl>

				<Button
					w="full"
					type="submit"
					method="post"
					name="Login"
					isDisabled={disabled || context.fetchInitialAccountDataError}>
					{i18n('logIn')}
				</Button>

				{errorMessage && (
					<Alert status="error" bg="ampError.50">
						<AlertIcon />
						<Text align="center" color="ampError.700">
							{i18n(errorMessage)}
						</Text>
					</Alert>
				)}

				{context.fetchInitialAccountDataError && (
					<Text color="ampError.500" align="center">
						{i18n('accountUrlErrorText')}
					</Text>
				)}

				<HStack spacing={6}>
					<Link
						as={ReactRouterLink}
						to="/ForgotUsername"
						state={{
							abbrevName: context.abbrevNameState,
							accountUid: context.accountUid,
							recaptchaSiteKey: context.recaptcha,
						}}
						color="ampSecondary.500"
						textDecoration="underline">
						{i18n('forgotUsername')}
					</Link>

					<Link
						as={ReactRouterLink}
						to="/ForgotPassword"
						state={{
							abbrevName: context.abbrevNameState,
							accountUid: context.accountUid,
							recaptchaSiteKey: context.recaptcha,
						}}
						color="ampSecondary.500"
						textDecoration="underline">
						{i18n('forgotPassword')}
					</Link>
				</HStack>
			</VStack>
		</>
	);
}

export default LoginForm;
