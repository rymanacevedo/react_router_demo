import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Cookies } from 'react-cookie-consent';

import {
	Alert,
	AlertIcon,
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	HStack,
	Text,
	VStack,
} from '@chakra-ui/react';
import useMultiFactorAuthService from '../../services/useMultiFactorAuthService';
import useUserRolesService from '../../services/useUserRolesService';
import useCompleteUserDataService from '../../services/useCompleteUserDataService';
import useCompleteUserAccountService from '../../services/useCompleteUserAccountService';
import { useAuth } from '../../hooks/useAuth';

function MultiFactor() {
	const { login } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const { t: i18n } = useTranslation();
	const [passcode, setPasscode] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [remember, setRemember] = useState(false);
	const [formError, setFormError] = useState(false);

	const { fetchUserRoles } = useUserRolesService();
	const { fetchCompleteUserData } = useCompleteUserDataService();
	const { fetchMultiFactorAuthData } = useMultiFactorAuthService();
	const { fetchCompleteUserAccount } = useCompleteUserAccountService();

	const handlePasscodeChange = (e) => {
		setPasscode(e.target.value);
	};

	const handlePasscodeValidation = () => {
		if (!passcode || passcode.length < 4) {
			setFormError(true);
			setErrorMessage(i18n('pleaseEnterPasscode'));
		} else {
			setFormError(false);
			setErrorMessage('');
		}
	};

	const handleCheckbox = () => {
		setRemember(!remember);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const mfaData = await fetchMultiFactorAuthData(
			location.state.accountKey,
			location.state.username,
			location.state.password,
			remember,
			passcode,
		);

		// TODO: mfaData.statusMessage returns 'not authorized' sometimes

		if (mfaData.sessionKey !== null) {
			const completeUserData = await fetchCompleteUserData(
				mfaData.userContexts[0].userKey,
				mfaData.sessionKey,
			);
			const userRoles = await fetchUserRoles(
				mfaData.userContexts[0].userKey,
				mfaData.sessionKey,
			);
			const userAccount = await fetchCompleteUserAccount(
				mfaData.userContexts[0].accountKey,
				mfaData.sessionKey,
			);

			if (mfaData.deviceUid) {
				const cookieKey = 'device_uid';
				const cookieValue = window.base64.encode(mfaData.deviceUid);
				Cookies.set(cookieKey, cookieValue, {
					expires: 90,
					path: null,
				});
			}

			login({
				initialUserData: mfaData,
				completeUserData,
				userRoles,
				userAccount,
			});
		}

		if (
			mfaData.sessionKey === null &&
			mfaData.errorMessage === 'one time passcode does not match'
		) {
			setDisabled(true);
			setErrorMessage(i18n('multiFactorAuthCodeInvalidError'));
		}
		if (
			mfaData.sessionKey === null &&
			mfaData.errorMessage === 'account is locked, password must be reset'
		) {
			setPasscode('');
			setErrorMessage(i18n('accountLockedResetPassword'));
		}
	};

	const mailParts = location.state.email.split('@');
	const obsfucatedEmail = `${mailParts[0].slice(0, 1)}...${mailParts[0].slice(
		-1,
	)}@${mailParts[1]}`;

	return (
		<>
			<VStack
				spacing="5"
				w={{ base: '100%', md: '358px' }}
				as="form"
				method="post"
				onSubmit={submitHandler}
				noValidate>
				<Text align="center">
					{i18n('multiFactorAuthEmailSentMsg', {
						email: obsfucatedEmail,
					})}
					<br />
					{i18n('multiFactorAuthTimeoutMsg', { duration: 20 })}
				</Text>

				<Text align="center">{i18n('multiFactorAuthCheckEmailMsg')}</Text>

				<FormControl isRequired isInvalid={formError} isDisabled={disabled}>
					<FormLabel marginBottom={1} requiredIndicator>
						{i18n('passcode')}
					</FormLabel>
					<Input
						id="passcode"
						minLength="1"
						maxLength="6"
						placeholder="passcode"
						name="passcode"
						value={passcode}
						onChange={handlePasscodeChange}
						onBlur={handlePasscodeValidation}
					/>
					<FormErrorMessage>{i18n('pleaseEnterPasscode')}</FormErrorMessage>
				</FormControl>

				<FormControl>
					<Checkbox
						id="mfa-checkbox"
						isChecked={remember}
						onChange={handleCheckbox}
						defaultChecked={false}
						variant="formCheckbox">
						{i18n('multiFactorAuthRememberDevice')}
					</Checkbox>
				</FormControl>

				<HStack w="100%">
					<Button w="50%" type="submit" name="Login" isDisabled={disabled}>
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

				{errorMessage && (
					<Alert status="error" bg="ampError.50">
						<AlertIcon />
						<Text align="center" color="ampError.700">
							{i18n(errorMessage)}
						</Text>
					</Alert>
				)}
			</VStack>
		</>
	);
}

export default MultiFactor;
