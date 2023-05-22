import { useEffect, useRef, useState } from 'react';
import {
	Link as ReactRouterLink,
	useNavigate,
	useOutletContext,
	useParams,
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
} from '@chakra-ui/react';

import ReCAPTCHA from 'react-google-recaptcha';
import useSignupDataService from '../../services/useSignupDataService';

function SignUp() {
	const context = useOutletContext();
	const params = useParams();
	const nav = useNavigate();
	const { t: i18n } = useTranslation();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [success, setSuccess] = useState(false);
	const [userAltKey, setUserAltKey] = useState({});
	const [captchaRes, setCaptchaRes] = useState(null);
	const [showForm, setShowForm] = useState(true);
	const [verified, setVerified] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [formError, setFormError] = useState({
		username: false,
		password: false,
		confirmPassword: false,
	});
	const recaptchaRef = useRef();

	const { postSignupData } = useSignupDataService();

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handleUsernameValidation = () => {
		if (!username) {
			setFormError((prevValue) => ({ ...prevValue, username: true }));
		} else {
			setFormError((prevValue) => ({ ...prevValue, username: false }));
		}
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handlePasswordValidation = () => {
		if (
			!password ||
			!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)
		) {
			setFormError((prevValue) => ({ ...prevValue, password: true }));
		} else {
			setFormError((prevValue) => ({ ...prevValue, password: false }));
		}
	};

	const handleConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleConfirmPasswordValidation = () => {
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

	const handleSuccessChange = () => {
		setSuccess(!success);
		setShowForm(false);
	};

	useEffect(() => {
		setUserAltKey(params.userAltKey);

		nav('/signup', { replace: true });
	}, []);

	const onChange = (value) => {
		if (value) {
			setCaptchaRes(value);
			setVerified(true);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setErrorMessage('');

		if (!verified) {
			setErrorMessage(i18n('pleaseCompleteRecaptcha'));
		}

		if (verified && password === confirmPassword) {
			recaptchaRef.current.reset();
			setVerified(false);

			const signUpRes = await postSignupData(
				context.accountUid,
				userAltKey,
				username,
				password,
				captchaRes,
			);

			if (
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
				<VStack
					spacing="5"
					w={{ base: '100%', md: '358px' }}
					as="form"
					method="post"
					onSubmit={submitHandler}
					noValidate>
					<Heading align="center" fontSize="28px">
						<p>{i18n('signUpText')}</p>
					</Heading>

					<FormControl isRequired isInvalid={formError.username}>
						<FormLabel marginBottom={1} requiredIndicator>
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
							maxLength="100"
						/>
						<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
					</FormControl>

					<FormControl isRequired isInvalid={formError.password}>
						<FormLabel marginBottom={1} requiredIndicator>
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
						<FormLabel marginBottom={1} requiredIndicator>
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

					{context.recaptcha && (
						<ReCAPTCHA
							sitekey={context.recaptcha}
							onChange={onChange}
							ref={recaptchaRef}
						/>
					)}

					<Button w="full" type="submit" name="Login">
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
									search: `?abbrevName=${context.abbrevNameState}`,
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
