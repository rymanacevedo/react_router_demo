import React, { useRef, useState } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import useForgotPasswordService from '../../services/useForgotPasswordService';

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
	Text,
	VStack,
	FormErrorMessage,
	Heading,
} from '@chakra-ui/react';

function ForgotPassword() {
	const navigate = useNavigate();
	const { t: i18n } = useTranslation();
	const [username, setUsername] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [recaptchaRes, setRecaptchaRes] = useState(null);
	const [verified, setVerified] = useState(false);
	const [showForm, setShowForm] = useState(true);
	const [success, setSuccess] = useState(false);
	const [emailAddress, setEmailAddress] = useState('');
	const recaptchaRef = useRef();
	const [formError, setFormError] = useState(false);

	const context = useOutletContext();

	const { fetchForgotPassword } = useForgotPasswordService();

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handleError = () => {
		setErrorMessage(i18n('passwordResetError'));
		setEmailAddress('');
		setShowForm(false);
		setSuccess(false);
	};

	const handleSuccess = (forgotPasswordApiResponse) => {
		const mailParts = forgotPasswordApiResponse.data.text.split('@');
		const obsfucatedEmail = `${mailParts[0].slice(0, 1)}...${mailParts[0].slice(
			-1,
		)}@${mailParts[1]}`;
		setEmailAddress(obsfucatedEmail);
		setShowForm(false);
		setSuccess(true);
	};

	const onChange = (value) => {
		if (value) {
			setRecaptchaRes(value);
			setVerified(true);
		}
	};

	const handleUsernameValidation = () => {
		if (!username || username.length > 100) {
			setFormError(true);
		} else {
			setFormError(false);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (!username) {
			handleUsernameValidation();
		}

		if (!verified) {
			setErrorMessage(i18n('pleaseCompleteRecaptcha'));
		}

		if (verified && username) {
			setUsername('');
			recaptchaRef.current.reset();
			const forgotPasswordApiResponse = await fetchForgotPassword(
				username,
				context.accountUid,
				recaptchaRes,
			);

			if (forgotPasswordApiResponse.data?.text) {
				handleSuccess(forgotPasswordApiResponse);
			} else {
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
					<Heading align="center" fontSize="28px">
						{i18n('enterUsername')}
					</Heading>

					<Text align="center">{i18n('weWillSendPasswordResetEmail')}</Text>

					<FormControl isRequired isInvalid={formError}>
						<FormLabel marginBottom={1} requiredIndicator>
							{i18n('username')}
							<Text float="right" fontSize="12px">
								{i18n('typicallyEmail')}
							</Text>
						</FormLabel>
						<Input
							id="email"
							placeholder="name@email.com"
							name="username"
							value={username}
							onChange={handleUsernameChange}
							onBlur={handleUsernameValidation}
							maxLength="100"
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
							{i18n('forgotPasswordSuccess', {
								email: emailAddress,
							})}
						</Text>
					</Center>
					<Center>
						<Text align="center">{i18n('pleaseCloseWindow')}</Text>
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

export default ForgotPassword;
