import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as AmpLogo } from '../../ampLogo.svg';
import { ReactComponent as HeadLogo } from '../../headLogo.svg';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import Confirmation from './Confirmation';
import useRegisterService from '../../services/useRegisterService';
import useSignupDataService from '../../services/useSignupDataService';
import useInitialAccountDataService from '../../services/useInitialAccountDataService';

function Register() {
	const { t: i18n } = useTranslation();
	const [step, setStep] = useState(3);
	const [verified, setVerified] = useState(false);
	const [recaptchaSiteKey, setRecaptchaSiteKey] = useState('');
	const [recaptchaRes, setRecaptchaRes] = useState(null);
	const [title, setTitle] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [userAltKey, setUserAltKey] = useState('');
	const recaptchaRef = useRef();

	const { postSignupData } = useSignupDataService();
	const { fetchInitialAccountData } = useInitialAccountDataService();
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

	const renderRecaptcha = () => {
		if (!recaptchaSiteKey) {
			return (
				<ReCAPTCHA
					id="recaptcha"
					ref={recaptchaRef}
					sitekey={recaptchaSiteKey}
					onChange={onRecaptchaChange}
				/>
			);
		}
	};

	useEffect(() => {
		fetchInitialAccountData().then((response) => {
			setRecaptchaSiteKey(response.recaptchaSiteKey);
		});
		renderRecaptcha();
		setTitle(i18n('enrollCompleteFormText'));
	}, []);

	// Handle fields change
	const handleChange = (input) => (e) => {
		setFormData({ ...formData, [input]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');
		if (step === 1) {
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

				const response = await postPersonalDetails(
					formData,
					'93110891-3822-41e5-bb15-45284ebe8f96',
					recaptchaRes,
				);

				if (!response.ok) {
					setErrorMessage(i18n('unknown error'));
					throw new Error(`Error! status: ${response.status}`);
				}

				response.json().then((data) => {
					setUserAltKey(data.key);
					setStep(step + 1);
					setTitle(i18n('signUpText'));
					// remove recaptcha in dom
					document.getElementById('recaptcha').style.display = 'none';
				});
			} else {
				return setErrorMessage(i18n('pleaseCompleteRecaptcha'));
			}
		} else if (step === 2) {
			if (formData.userName === '' || formData.userName.length <= 1) {
				return setErrorMessage(i18n('enterUserName'));
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

			const response = await postSignupData(
				'93110891-3822-41e5-bb15-45284ebe8f96',
				userAltKey,
				formData.userName,
				formData.password,
				recaptchaRes,
			);

			if (!response.ok) {
				setErrorMessage(i18n('unknownError'));
				throw new Error(`Error! status: ${response.status}`);
			}

			setStep(step + 1);
			setTitle('');
		}
	};

	const getStepComponent = () => {
		switch (step) {
			case 1:
				return <PersonalDetails handleChange={handleChange} />;
			case 2:
				return <UserDetails handleChange={handleChange} />;
			case 3:
				return <Confirmation />;
			default:
				return <PersonalDetails />;
		}
	};

	const renderText = () => {
		switch (step) {
			case 1:
				return (
					<p>
						If you are already registered, <a href="#">click here</a> to login.
					</p>
				);
			case 2:
				return (
					<>
						<p>
							{i18n(
								'passwordRequirements',
								{ charactersNumber: 5 },
								{ numberOfCriteria: 3 },
							)}
						</p>
						<ul>
							<li>{i18n('upperCaseRule')}</li>
							<li>{i18n('lowerCaseRule')}</li>
							<li>{i18n('digitRule')}</li>
							<li>{i18n('specialCharacterRule')}</li>
						</ul>
					</>
				);
		}
	};

	return (
		<>
			<div className="login-wrapper">
				<div className="login-left">
					<HeadLogo />
				</div>
				<div className="login-right">
					<div className="login-right-content-wrapper">
						<AmpLogo />
						<h1>{i18n(title)}</h1>
						<div className="form-wrapper">
							<form className="login-form">
								{getStepComponent()}
								{renderRecaptcha()}
								<button
									onClick={handleSubmit}
									className="primary-button"
									type="submit"
									name="Login">
									{step === 1 ? i18n('continueBtnText') : i18n('submitBtnText')}
								</button>
								<p className="text-center error-text">{errorMessage}</p>
								{renderText()}
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
