import React, { useEffect, useState } from 'react';
import {
	Link,
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AmpLogo } from '../../ampLogo.svg';
import { ReactComponent as HeadLogo } from '../../headLogo.svg';
import ReCAPTCHA from 'react-google-recaptcha';
import useInitialAccountDataService from '../../services/useInitialAccountDataService';
import useSignupDataService from '../../services/useSignupDataService';

function SignUp() {
	const params = useParams();
	const [searchParams] = useSearchParams();
	const nav = useNavigate();
	const { t: i18n } = useTranslation();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [success, setSuccess] = useState(false);
	const [accountData, setAccountData] = useState({});
	const [userAltKey, setUserAltKey] = useState({});
	const [captchaRes, setCaptchaRes] = useState(null);
	const [showForm, setShowForm] = useState(true);
	const [verified, setVerified] = useState(false);

	const [disabled, setDisabled] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	const { postSignupData } = useSignupDataService();
	const { fetchInitialAccountData } = useInitialAccountDataService();

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handleSuccessChange = () => {
		setSuccess(!success);
		setShowForm(false);
	};

	useEffect(() => {
		setUserAltKey(params.userAltKey);

		async function getAccountData() {
			const accountDataResponse = await fetchInitialAccountData(
				searchParams.get('abbrevName'),
			);
			setAccountData(accountDataResponse);
		}

		getAccountData();
		nav('/signup', { replace: true });
	}, []);

	const onChange = (value) => {
		if (value) {
			setCaptchaRes(value);
			setVerified(true);
			setDisabled(false);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (confirmPassword !== password) {
			setErrorMessage('Password mismatch');
		}

		if (!verified) {
			setErrorMessage('Please complete Recaptcha');
		}

		if (verified && password === confirmPassword) {
			const signUpRes = await postSignupData(
				accountData.accountInfo.uid,
				userAltKey,
				username,
				password,
				captchaRes,
			);
			const signUpResJson = signUpRes.json();

			if (signUpResJson.statusMessage === 'not authorized') {
				handleSuccessChange();
			}
		}
	};

	return (
		<>
			<div className="login-wrapper">
				<div className="login-left">
					<HeadLogo />
				</div>

				<div className="login-right">
					<AmpLogo />
					<div className="login-right-content-wrapper">
						{showForm && (
							<div className="form-wrapper">
								<div className="welcome">
									<p>{i18n('signUpText')}</p>
								</div>

								<form className="login-form" onSubmit={submitHandler}>
									<div className="input-stack">
										<div className="input-stack-label">
											<label htmlFor="username">{i18n('username')}</label>
										</div>
										<input
											onInvalid={(e) =>
												e.target.setCustomValidity(i18n('enterUsername'))
											}
											onInput={(e) => e.target.setCustomValidity('')}
											id="username"
											type="text"
											maxLength="100"
											autoFocus
											placeholder="name@email.com"
											name="username"
											required
											value={username}
											onChange={handleUsernameChange}
										/>
									</div>

									<div className="input-stack">
										<div className="input-stack-label">
											<label htmlFor="password">{i18n('password')}</label>
										</div>
										<input
											onInvalid={(e) =>
												e.target.setCustomValidity(i18n('enterPassword'))
											}
											onInput={(e) => e.target.setCustomValidity('')}
											type="password"
											id="newPassword"
											placeholder={i18n('password')}
											name="password"
											required
											value={password}
											onChange={handlePasswordChange}
										/>
									</div>

									<div className="input-stack">
										<div className="input-stack-label">
											<label htmlFor="confirmPassword">
												{i18n('reenterPasswordFormLabel')}
											</label>
										</div>
										<input
											onInvalid={(e) =>
												e.target.setCustomValidity(
													i18n('reenterPasswordFormLabel'),
												)
											}
											onInput={(e) => e.target.setCustomValidity('')}
											type="password"
											id="newPassword2"
											placeholder={i18n('reenterPasswordFormLabel')}
											name="confirmPassword"
											required
											value={confirmPassword}
											onChange={handleConfirmPassword}
										/>
									</div>
									{accountData.recaptchaSiteKey && (
										<ReCAPTCHA
											sitekey={accountData.recaptchaSiteKey}
											onChange={onChange}
										/>
									)}
									<button
										className="primary-button"
										type="submit"
										name="Login"
										disabled={disabled}>
										{i18n('continueBtnText')}
									</button>

									<div className="text-center">
										<p className="error-text">{i18n(errorMessage)}</p>
									</div>

									<div className="mt-20">
										<p>{i18n('passwordRuleText')}</p>
										<ul className="list-styled">
											<li>{i18n('upperCaseRule')}</li>
											<li>{i18n('lowerCaseRule')}</li>
											<li>{i18n('digitRule')}</li>
											<li>{i18n('specialCharacterRule')}</li>
										</ul>
									</div>
								</form>
							</div>
						)}
						{success && (
							<div className="text-center">
								<p>{i18n('userCreated')}.</p>
								<p>
									{i18n('please')} <Link to="/">{i18n('clickHere')}</Link>{' '}
									{i18n('toLogIn')}
								</p>
								'
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default SignUp;
