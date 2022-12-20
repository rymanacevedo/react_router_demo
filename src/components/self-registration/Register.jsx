import { useEffect, useRef, useState } from 'react';
import { Link as ReactRouterLink, useOutletContext } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import useRegisterService from '../../services/useRegisterService';
import {
	Alert,
	AlertIcon,
	Button,
	Center,
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
	const context = useOutletContext();
	const { t: i18n } = useTranslation();
	const recaptchaRef = useRef();
	const { postPersonalDetails } = useRegisterService();

	const [errorMessage, setErrorMessage] = useState('');
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		emailAddress: '',
		userName: '',
		password: '',
		confirmPassword: '',
	});
	const [formError, setFormError] = useState({
		firstName: false,
		lastName: false,
		emailAddress: false,
		userName: false,
		password: false,
		confirmPassword: false,
	});
	const [recaptchaRes, setRecaptchaRes] = useState(null);
	const [showForm, setShowForm] = useState(true);
	const [title, setTitle] = useState('');
	const [verified, setVerified] = useState(false);
	const [success, setSuccess] = useState(false);

	const checkFormErrors = () => {
		for (let errorState in formError) {
			if (formError[errorState] === true) {
				return true;
			}
		}
		return false;
	};

	const onRecaptchaChange = (value) => {
		if (value) {
			setRecaptchaRes(value);
			setVerified(true);
		} else {
			setVerified(false);
		}
	};

	const clearFormData = () => {
		setFormData({
			firstName: '',
			lastName: '',
			emailAddress: '',
			userName: '',
			password: '',
			confirmPassword: '',
		});
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
		// Password must be at least 5 characters long, and contain at least 3 of the following:
		// Uppercase letter (A-Z)
		// Lowercase letter (a-z)
		// Digit (0-9)
		// Special character (!@#$% etc.)
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

	const showConfirmation = () => {
		setShowForm(false);
		setSuccess(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');

		if (!verified) {
			setErrorMessage(i18n('pleaseCompleteRecaptcha'));
		}

		if (
			verified &&
			checkFormErrors() === false &&
			formData.password === formData.confirmPassword
		) {
			const personalDetailsResponse = await postPersonalDetails(
				formData,
				context.accountUid,
				context.accountKey,
				recaptchaRes,
			);

			if (personalDetailsResponse?.response?.data?.items) {
				if (
					personalDetailsResponse?.response?.data?.items[0].messageCode ===
					'USERS_SELF_REGISTRATION_USER_ALREADY_EXISTS_ERROR'
				) {
					setErrorMessage(i18n('userAlreadyExistsClickBelowToLogin'));
				} else {
					setErrorMessage(i18n('unknown error'));
					throw new Error(`Error! status: ${personalDetailsResponse.status}`);
				}
			}

			if (personalDetailsResponse.status === 201) {
				showConfirmation();
			}
			clearFormData();
			recaptchaRef.current.reset();
		}
	};
	return (
		<>
			{!context.allowSelfRegistration && !success && (
				<Center height="100%">
					<VStack>
						<Alert status="error" bg="ampError.50">
							<AlertIcon />
							<Text align="center" color="ampError.700">
								{i18n('selfRegisterNotAllowed')}
							</Text>
						</Alert>
					</VStack>
				</Center>
			)}

			{showForm && !success && context.allowSelfRegistration && (
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
						{i18n('submitBtnText')}
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
			)}

			{!showForm && success && (
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
export default Register;
