import React from 'react';
import { useTranslation } from 'react-i18next';

const PersonalDetails = ({ handleChange }) => {
	const { t: i18n } = useTranslation();
	return (
		<>
			<div className="input-stack">
				<label className="input-stack-label" htmlFor="firstName">
					{i18n('first name')}
				</label>
				<input
					onChange={handleChange('firstName')}
					id="firstName"
					type="text"
					placeholder="first name"
					name="firstName"
					required
				/>
			</div>
			<div className="input-stack">
				<label className="input-stack-label" htmlFor="lastName">
					{i18n('last name')}
				</label>
				<input
					onChange={handleChange('lastName')}
					id="lastName"
					type="text"
					placeholder="last name"
					name="lastName"
					required
				/>
			</div>
			<div className="input-stack">
				<label className="input-stack-label" htmlFor="emailAddress">
					{i18n('email')}
				</label>
				<input
					onChange={handleChange('emailAddress')}
					id="emailAddress"
					type="text"
					placeholder="name@email.com"
					name="emailAddress"
					required
				/>
			</div>
		</>
	);
};

export default PersonalDetails;
