import React from 'react';
import { useTranslation } from 'react-i18next';

const UserDetails = ({ handleChange }) => {
	const { t: i18n } = useTranslation();
	return (
		<>
			<div className="input-stack">
				<label className="input-stack-label" htmlFor="userName">
					{i18n('username')}
				</label>
				<input
					onChange={handleChange('userName')}
					id="userName"
					type="text"
					placeholder="enter username"
					name="userName"
					required
				/>
			</div>
			<div className="input-stack">
				<label className="input-stack-label" htmlFor="password">
					{i18n('password')}
				</label>
				<input
					type="password"
					onChange={handleChange('password')}
					id="password"
					placeholder="password"
					name="password"
					required
				/>
			</div>
			<div className="input-stack">
				<label className="input-stack-label" htmlFor="confirmPassword">
					{i18n('confirmPassword')}
				</label>
				<input
					type="password"
					id="confirmPassword"
					onChange={handleChange('confirmPassword')}
					placeholder="confirm password"
					name="confirmPassword"
					required
				/>
			</div>
		</>
	);
};

export default UserDetails;
