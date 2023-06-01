import { useRef, useState, ChangeEvent, FormEvent } from 'react';
import {
	Link as ReactRouterLink,
	useNavigate,
	useOutletContext,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import useForgotUsernameService from '../../services/useForgotUsernameService';
import { z } from 'zod';

import {
	Alert,
	AlertIcon,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Link,
	Text,
	VStack,
	FormErrorMessage,
	Heading,
	RequiredIndicator,
} from '@chakra-ui/react';
import { AuthLayoutContext } from './AuthLayout';

const emailSchema = z.string().email({ message: 'Invalid email address' });

function ForgotUsername(): JSX.Element {
	const navigate = useNavigate();
	const { t: i18n } = useTranslation();
	const [emailAddress, setEmailAddress] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const [recaptchaRes, setRecaptchaRes] = useState<string | null>(null);
	const [verified, setVerified] = useState(false);
	const [showForm, setShowForm] = useState(true);
	const [success, setSuccess] = useState(false);
	const [formError, setFormError] = useState(false);

	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const { fetchForgotUsername } = useForgotUsernameService();
	const context = useOutletContext<AuthLayoutContext>();

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmailAddress(e.target.value);
	};

	const handleError = () => {
		setErrorMessage(i18n('forgotUsernameErrorText'));
		setShowForm(false);
	};

	const handleSuccess = () => {
		setShowForm(false);
		setSuccess(true);
	};

	const handleEmailValidation = () => {
		try {
			emailSchema.parse(emailAddress);
			setFormError(false);
		} catch (error) {
			setFormError(true);
		}
	};

	const onChange = (value: string | null) => {
		if (value) {
			setRecaptchaRes(value);
			setVerified(true);
		}
	};

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (!emailAddress) {
			handleEmailValidation();
		}

		if (!verified) {
			setErrorMessage(i18n('pleaseCompleteRecaptcha'));
		}

		if (verified && emailAddress) {
			if (recaptchaRef.current) {
				recaptchaRef.current.reset();
			}
			setEmailAddress('');

			try {
				emailSchema.parse(emailAddress);
				const forgotUsernameApiResponse = await fetchForgotUsername(
					emailAddress,
					context.accountUid,
					recaptchaRes!,
				);

				if (forgotUsernameApiResponse === 200) {
					handleSuccess();
				} else {
					handleError();
				}
			} catch (error) {
				handleError();
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
					<Heading style={{ alignItems: 'center', fontSize: '28px' }}>
						{i18n('pleaseEnterEmailAddress')}
					</Heading>

					<Text align="center">{i18n('weWillSendEmail')}</Text>

					<FormControl isRequired isInvalid={formError}>
						<FormLabel
							marginBottom={1}
							requiredIndicator={<RequiredIndicator />}>
							{i18n('emailLabel')}
						</FormLabel>
						<Input
							id="email"
							type="email"
							placeholder="name@email.com"
							name="email"
							value={emailAddress}
							onChange={handleEmailChange}
							onBlur={handleEmailValidation}
						/>
						<FormErrorMessage>{i18n('enterEmailAddress')}</FormErrorMessage>
					</FormControl>

					{context.recaptcha && (
						<ReCAPTCHA
							sitekey={context.recaptcha}
							onChange={onChange}
							ref={recaptchaRef}
						/>
					)}
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

					{errorMessage && !verified && (
						<Alert status="error" bg="ampError.50">
							<AlertIcon />
							<Text align="center" color="ampError.700">
								{i18n(errorMessage)}
							</Text>
						</Alert>
					)}
				</VStack>
			)}
			{success && (
				<Flex
					direction="column"
					grow={1}
					w={{ base: '100%', md: '358px' }}
					align="center"
					justify="center">
					<Center>
						<Text align="center" mb={5}>
							{i18n('weWillSendEmail')}
						</Text>
					</Center>
					<Center>
						<Text align="center">
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
					</Center>
				</Flex>
			)}
			{!success && !showForm && (
				<Flex
					direction="column"
					grow={1}
					w="full"
					align="center"
					justify="center">
					<Center>
						<Alert status="error" bg="ampError.50">
							<AlertIcon />
							<Text align="center" color="ampError.700">
								{i18n(errorMessage)}
							</Text>
						</Alert>
					</Center>
				</Flex>
			)}
		</>
	);
}

export default ForgotUsername;
