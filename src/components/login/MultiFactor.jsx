import React, { useState } from 'react';

import { ReactComponent as AmpLogo } from '../../ampLogo.svg';
import { ReactComponent as HeadLogo } from '../../headLogo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CookieConsent, Cookies } from 'react-cookie-consent';
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

	const { fetchUserRoles } = useUserRolesService();
	const { fetchCompleteUserData } = useCompleteUserDataService();
	const { fetchMultiFactorAuthData } = useMultiFactorAuthService();
	const { fetchCompleteUserAccount } = useCompleteUserAccountService();

	const handlePasscodeChange = (e) => {
		setPasscode(e.target.value);
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
		const mfaUserContext = mfaData.userContexts[0];

		// TODO: mfaData.statusMessage returns 'not authorized' sometimes

		if (mfaData.sessionKey !== null) {
			const completeUserData = await fetchCompleteUserData(
				mfaUserContext.userKey,
				mfaData.sessionKey,
			);
			const userRoles = await fetchUserRoles(
				mfaUserContext.userKey,
				mfaData.sessionKey,
			);
			const userAccount = await fetchCompleteUserAccount(
				mfaUserContext.accountKey,
				mfaData.sessionKey,
			);

			if (mfaData.deviceUid) {
				const cookieKey = 'device_uid';
				const cookieValue = window.base64.encode(mfaData.deviceUid);
				Cookies.set(cookieKey, cookieValue, { expires: 90, path: null });
			}

			login({
				initialUserData: mfaData,
				completeUserData,
				userRoles,
				userAccount,
			});
		}

		if (mfaData.errorMessage === 'one time passcode does not match') {
			setDisabled(true);
			setErrorMessage(i18n('multiFactorAuthCodeInvalidError'));
		}
	};

	const mailParts = location.state.email.split('@');
	const obsfucatedEmail = `${mailParts[0].slice(0, 1)}...${mailParts[0].slice(
		-1,
	)}@${mailParts[1]}`;

	return (
		<>
			<div className="login-wrapper">
				<div className="login-left">
					<HeadLogo />
				</div>

				<div className="login-right">
					<div className="login-right-content-wrapper">
						<AmpLogo />

						<div className="form-wrapper">
							<div className="text-center">
								<p>
									{i18n('multiFactorAuthEmailSentMsg', {
										email: obsfucatedEmail,
									})}
								</p>
								<p>{i18n('multiFactorAuthTimeoutMsg', { duration: 20 })}</p>
								<p className="mt-20">{i18n('multiFactorAuthCheckEmailMsg')}</p>
							</div>

							<form className="login-form" onSubmit={submitHandler}>
								<div className="input-stack">
									<div className="input-stack-label">
										<label htmlFor="username">Passcode</label>
										<span className="help-text"></span>
									</div>
									<input
										onInvalid={(e) =>
											e.target.setCustomValidity('Please enter your passcode')
										}
										onInput={(e) => e.target.setCustomValidity('')}
										disabled={disabled}
										type="text"
										minLength="1"
										maxLength="6"
										placeholder="passcode"
										name="passcode"
										required
										value={passcode}
										onChange={handlePasscodeChange}
									/>
								</div>

								<div>
									<input
										type="checkbox"
										id="mfa-checkbox"
										tabIndex="0"
										className="customCheckbox mr-15"
										checked={remember}
										onChange={handleCheckbox}
									/>
									<label htmlFor="mfa-checkbox" className="customCheckboxLabel">
										{i18n('multiFactorAuthRememberDevice')}
									</label>
								</div>

								<div className="button-row mt-20">
									<button
										className="primary-button mr-15"
										type="submit"
										name="Login"
										disabled={disabled}>
										{i18n('submit')}
									</button>
									<button
										className="react-secondary-button"
										name="cancel"
										onClick={() => {
											navigate(-1);
										}}>
										{i18n('cancel')}
									</button>
								</div>

								<div className="text-center">
									<p className="error-text">{i18n(errorMessage)}</p>
								</div>
							</form>
						</div>

						<div className="forgot"></div>
					</div>
				</div>
			</div>

			<CookieConsent
				cookieName="cookie_message_accepted"
				expires={3650}
				disableStyles="true"
				containerClasses="cookie-container"
				contentClasses="cookie-content"
				buttonClasses="cookie-button"
				buttonText="I ACCEPT">
				<p>
					{i18n('cookiesMessage')}
					<a
						className="white-text"
						href="src/components/login/MultiFactor"
						target="_blank"
						rel="noopener noreferrer">
						{i18n('privacyPolicy')}
					</a>
					and
					<a
						className="white-text"
						href="src/components/login/MultiFactor"
						target="_blank"
						rel="noopener noreferrer">
						{i18n('termsAndConditions')}
					</a>
				</p>
			</CookieConsent>
		</>
	);
}

export default MultiFactor;
