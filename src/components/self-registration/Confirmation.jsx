import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Confirmation = () => {
	const { t: i18n } = useTranslation();
	return (
		<>
			<p>{i18n('userCreated')}</p>
			<p>
				{i18n('please')} <Link to="/">{i18n('clickHere')}</Link>
				{i18n('toLogIn')}
			</p>
		</>
	);
};

export default Confirmation;
