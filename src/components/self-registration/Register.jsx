import { useEffect, useRef, useState } from 'react';
import { Link as ReactRouterLink, useOutletContext } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import Confirmation from './Confirmation';
import useRegisterService from '../../services/useRegisterService';
import useSignupDataService from '../../services/useSignupDataService';
import {
	Alert,
	AlertIcon,
	Button,
	Heading,
	HStack,
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
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');

		if (verified) {
			if (formData.firstName === '' || formData.firstName.length < 1) {
				return setErrorMessage(i18n('enterFirstName'));
			}

			if (formData.lastName === '' || formData.lastName.length < 1) {
				return setErrorMessage(i18n('enterLastName'));
			}

			if (formData.emailAddress === '' || formData.emailAddress.length < 1) {
				return setErrorMessage(i18n('enterEmailAddress'));
			}

			const personalDetailsResponse = await postPersonalDetails(
				formData,
				'93110891-3822-41e5-bb15-45284ebe8f96',
				recaptchaRes,
			);

			if (!personalDetailsResponse.ok) {
				setErrorMessage(i18n('unknown error'));
				throw new Error(`Error! status: ${personalDetailsResponse.status}`);
			}

			personalDetailsResponse.json().then((data) => {
				setUserAltKey(data.key);
				setStep(step + 1);
				setTitle(i18n('signUpText'));
				// remove recaptcha in dom
				document.getElementById('recaptcha').style.display = 'none';
			});
			////////step2 begin

			if (formData.userName === '' || formData.userName.length <= 1) {
				return setErrorMessage(i18n('enterUsername'));
			}

			if (formData.password === '') {
				return setErrorMessage(i18n('enterPassword'));
			} else if (formData.password.length < 5) {
				return setErrorMessage(i18n('enterAtLeastCharacters', { number: 5 }));
			}
			// check if password has one lowercase letter, one uppercase letter one number or special character
			else if (
				!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
					formData.password,
				)
			) {
				return setErrorMessage(i18n('passwordMustContain'));
			}

			if (formData.confirmPassword !== formData.password) {
				return setErrorMessage(i18n('passwordsDoNotMatch'));
			}

			const signupResponse = await postSignupData(
				'93110891-3822-41e5-bb15-45284ebe8f96',
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

	const getStepComponent = () => {
		switch (step) {
			case 1:
				return (
					<>
						<HStack spacing={4}>
							<PersonalDetails handleChange={handleChange} />{' '}
							<UserDetails handleChange={handleChange} />
						</HStack>
					</>
				);
			case 2:
				return <Confirmation />;
			default:
				return <PersonalDetails />;
		}
	};

	const renderText = () => {
		return (
			<>
				<Text>
					{i18n(
						'passwordRequirements',
						{ charactersNumber: 5 },
						{ numberOfCriteria: 3 },
					)}
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
			</>
		);
	};

	return (
		<>
			<VStack as="form" onSubmit={handleSubmit}>
				<Heading>{i18n(title)}</Heading>
				{getStepComponent()}
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
				{renderText()}
			</VStack>
		</>
	);
}

export default Register;
