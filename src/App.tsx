import './css/App.css';
import { z } from 'zod';
import { UserSchema } from './services/user';
import { generateTabs, TabsSchema } from './services/roles';
import { Suspense } from 'react';
import { json, Outlet } from 'react-router-dom';
import { getUser } from './utils/user';
import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';

export const AuthenticationDataSchema = z.object({
	user: UserSchema,
	permissions: z.array(z.string()),
	tabs: TabsSchema,
	redirectTo: z.string(),
});

export type AuthenticationData = z.infer<typeof AuthenticationDataSchema>;
export const appLoader = () => {
	const user = getUser();
	let data: AuthenticationData | null = null;
	if (user) {
		const { tabs, redirectTo, permissions } = generateTabs(user);
		data = {
			user,
			tabs,
			permissions,
			redirectTo,
		} as AuthenticationData;
	}

	return json(data);
};

export default function App() {
	const { t: i18n } = useTranslation();
	return (
		<Suspense fallback={<>Loading...</>}>
			<Outlet />
			<CookieConsent
				cookieName="cookie_message_accepted"
				expires={3600}
				disableStyles
				containerClasses="cookie-container"
				contentClasses="cookie-content"
				buttonClasses="cookie-button"
				buttonText={i18n('iAccept')}>
				<p>
					{i18n('cookiesMessage')}{' '}
					<a
						className="white-text"
						href="src/components/login/LoginForm"
						target="_blank"
						rel="noopener noreferrer">
						{' '}
						{i18n('privacyPolicy')}{' '}
					</a>{' '}
					and{' '}
					<a
						className="white-text"
						href="src/components/login/LoginForm"
						target="_blank"
						rel="noopener noreferrer">
						{i18n('termsAndConditions')}
					</a>
				</p>
			</CookieConsent>
		</Suspense>
	);
}
