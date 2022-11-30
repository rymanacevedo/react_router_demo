import { useEffect, useRef, useState } from 'react';
import { Link as ReactRouterLink, useOutletContext } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import useRegisterService from '../../services/useRegisterService';
import useSignupDataService from '../../services/useSignupDataService';
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
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react';

function Register() {
	const { t: i18n } = useTranslation();
	const context = useOutletContext();
	const [step, setStep] = useState(1);
	const [verified, setVerified] = useState(false);
	const [recaptchaRes, setRecaptchaRes] = useState(null);
	const [title, setTitle] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [userAltKey, setUserAltKey] = useState('');
	const recaptchaRef = useRef();
	const [formError, setFormError] = useState({
		firstName: false,
		lastName: false,
		emailAddress: false,
		userName: false,
		password: false,
		confirmPassword: false,
	});

	const { postSignupData } = useSignupDataService();

	const { postPersonalDetails } = useRegisterService();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		emailAddress: '',
		userName: '',
		password: '',
		confirmPassword: '',
	});

	const onRecaptchaChange = (value) => {
		if (value) {
			setRecaptchaRes(value);
			setVerified(true);
		}
	};

	useEffect(() => {
		setTitle(i18n('enrollCompleteFormText'));
	}, []);

	// Handle fields change
	const handleChange = (input) => (e) => {
		setFormData({ ...formData, [input]: e.target.value });
	};

	const validateInput = (e) => {
		let fieldName = e.target.name;
		if (e.target.value === '' || e.target.value < 1) {
			setFormError((prevValue) => ({
				...prevValue,
				[fieldName]: true,
			}));
		} else {
			setFormError((prevValue) => ({
				...prevValue,
				[fieldName]: false,
			}));
		}
	};

	const validatePassword = (e) => {
		let fieldName = e.target.name;
		if (
			e.target.value === '' ||
			e.target.value < 5 ||
			!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(e.target.value)
		) {
			setFormError((prevValue) => ({
				...prevValue,
				[fieldName]: true,
			}));
		} else {
			setFormError((prevValue) => ({
				...prevValue,
				[fieldName]: false,
			}));
		}
	};

	const validateConfirmPassword = () => {
		if (
			formData.password !== formData.confirmPassword ||
			formData.confirmPassword === '' ||
			formData.confirmPassword < 1
		) {
			setFormError((prevValue) => ({
				...prevValue,
				confirmPassword: true,
			}));
		} else {
			setFormError((prevValue) => ({
				...prevValue,
				confirmPassword: false,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');

		if (verified && !formError) {
			const personalDetailsResponse = await postPersonalDetails(
				formData,
				context.accountUid,
				context.accountKey,
				recaptchaRes,
			);

			if (!personalDetailsResponse.ok) {
				setErrorMessage(i18n('unknown error'));
				throw new Error(`Error! status: ${personalDetailsResponse.status}`);
			}

			personalDetailsResponse.json().then((data) => {
				setUserAltKey(data.key);
				setTitle(i18n('signUpText'));
				// remove recaptcha in dom
				document.getElementById('recaptcha').style.display = 'none';
			});

			const signupResponse = await postSignupData(
				context.accountUid,
				userAltKey,
				formData.userName,
				formData.password,
				recaptchaRes,
			);

			if (!signupResponse.ok) {
				setErrorMessage(i18n('unknownError'));
				throw new Error(`Error! status: ${signupResponse.status}`);
			}

			setStep(step + 1);
			setTitle('');
			/////////////////////// end step 2
		} else {
			return setErrorMessage(i18n('pleaseCompleteRecaptcha'));
		}
	};

	return (
		<>
			<VStack spacing={5} as="form" onSubmit={handleSubmit}>
				<Heading>{i18n(title)}</Heading>

				<HStack spacing={5}>
					<VStack>
						<FormControl isRequired isInvalid={formError.firstName}>
							<FormLabel marginBottom={1} requiredIndicator>
								{i18n('first name')}
							</FormLabel>
							<Input
								id="firstName"
								placeholder="first name"
								name="firstName"
								onChange={handleChange('firstName')}
								value={formData.firstName}
								onBlur={validateInput}
							/>
							<FormErrorMessage>{i18n('enterFirstName')}</FormErrorMessage>
						</FormControl>

						<FormControl isRequired isInvalid={formError.lastName}>
							<FormLabel marginBottom={1} requiredIndicator>
								{i18n('last name')}
							</FormLabel>
							<Input
								id="lastName"
								placeholder="last name"
								name="lastName"
								onChange={handleChange('lastName')}
								value={formData.lastName}
								onBlur={validateInput}
							/>
							<FormErrorMessage>{i18n('enterLastName')}</FormErrorMessage>
						</FormControl>

						<FormControl isRequired isInvalid={formError.emailAddress}>
							<FormLabel marginBottom={1} requiredIndicator>
								{i18n('email')}
							</FormLabel>
							<Input
								id="emailAddress"
								placeholder="name@email.com"
								name="emailAddress"
								onChange={handleChange('emailAddress')}
								value={formData.emailAddress}
								onBlur={validateInput}
							/>
							<FormErrorMessage>{i18n('enterEmailAddress')}</FormErrorMessage>
						</FormControl>
					</VStack>
					<VStack>
						<FormControl isRequired isInvalid={formError.userName}>
							<FormLabel marginBottom={1} requiredIndicator>
								{i18n('username')}
							</FormLabel>
							<Input
								id="userName"
								placeholder="name@email.com"
								name="userName"
								onChange={handleChange('userName')}
								value={formData.userName}
								onBlur={validateInput}
							/>
							<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
						</FormControl>

						<FormControl isRequired isInvalid={formError.password}>
							<FormLabel marginBottom={1} requiredIndicator>
								{i18n('password')}
							</FormLabel>
							<Input
								id="password"
								placeholder="password"
								type="password"
								name="password"
								onChange={handleChange('password')}
								value={formData.password}
								onBlur={validatePassword}
							/>
							<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
						</FormControl>

						<FormControl isRequired isInvalid={formError.password}>
							<FormLabel marginBottom={1} requiredIndicator>
								{i18n('confirmPassword')}
							</FormLabel>
							<Input
								id="confirmPassword"
								placeholder="confirm password"
								type="password"
								name="confirmPassword"
								onChange={handleChange('confirmPassword')}
								value={formData.confirmPassword}
								onBlur={validateConfirmPassword}
							/>
							<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
						</FormControl>
					</VStack>
				</HStack>

				{context.recaptcha && (
					<ReCAPTCHA
						id="recaptcha"
						ref={recaptchaRef}
						sitekey={context.recaptcha}
						onChange={onRecaptchaChange}
					/>
				)}

				<Button onClick={handleSubmit} type="submit" name="Login">
					{step === 1 ? i18n('continueBtnText') : i18n('submitBtnText')}
				</Button>

				{errorMessage && (
					<Alert status="error" bg="ampError.50">
						<AlertIcon />
						<Text align="center" color="ampError.700">
							{errorMessage}
						</Text>
					</Alert>
				)}

				<Text>
					{i18n('passwordRequirements', {
						charactersNumber: 5,
						numberOfCriteria: 3,
					})}
				</Text>

				<UnorderedList>
					<ListItem>{i18n('upperCaseRule')}</ListItem>
					<ListItem>{i18n('lowerCaseRule')}</ListItem>
					<ListItem>{i18n('digitRule')}</ListItem>
					<ListItem>{i18n('specialCharacterRule')}</ListItem>
				</UnorderedList>

				<Text>
					If you are already registered,{' '}
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
		</>
	);
}

export default Register;
