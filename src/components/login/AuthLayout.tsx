import { useEffect, useState } from 'react';
import {
	json,
	LoaderFunctionArgs,
	Outlet,
	useParams,
	useSearchParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useInitialAccountDataService from '../../services/useInitialAccountDataService';
import { ReactComponent as AmpLogo } from '../../ampLogo.svg';
import { ReactComponent as HeadLogo } from '../../headLogo.svg';
import { Box, Container, Flex, VStack } from '@chakra-ui/react';
import CookieConsent from 'react-cookie-consent';
import { z } from 'zod';
import { bootstrap } from '../../services/auth.reactrouter';
import { BootstrapData } from '../../routes/Root';

const AuthLayoutContextSchema = z.object({
	accountKey: z.string().optional(),
	abbrevNameState: z.string(),
	accountUid: z.string(),
	recaptcha: z.string(),
});
export type AuthLayoutContext = z.infer<typeof AuthLayoutContextSchema>;

export const authLayoutLoader =
	() =>
	async ({ request }: LoaderFunctionArgs) => {
		let data: BootstrapData | null = null;
		const bootstrapData = (await bootstrap(request)) as BootstrapData;
		data = {
			...bootstrapData,
		};
		return json(data);
	};

export default function AuthLayout() {
	const { t: i18n } = useTranslation();
	const [accountKey, setAccountKey] = useState('');
	const [abbrevNameState, setAbbrevNameState] = useState('');
	const [accountUid, setAccountUid] = useState('');
	const [recaptcha, setRecaptcha] = useState('');
	const [selfRegistration, setSelfRegistration] = useState(null);
	const [searchParams] = useSearchParams();
	const { abbrevName: urlParamsAbbrevName } = useParams();

	const { fetchInitialAccountData, error: fetchInitialAccountDataError } =
		useInitialAccountDataService();

	const handleFetchInitialUserData = async (account: any) => {
		// TODO: useLoaderData instead
		const data = await fetchInitialAccountData(account);
		const { key, abbrevName, uid, allowSelfRegistration } = data.accountInfo;
		const { recaptchaSiteKey } = data;
		setAccountKey(key);
		setAbbrevNameState(abbrevName);
		setAccountUid(uid);
		setRecaptcha(recaptchaSiteKey);
		setSelfRegistration(allowSelfRegistration);
	};

	useEffect(() => {
		handleFetchInitialUserData(
			searchParams.get('abbrevName') || urlParamsAbbrevName,
		);
	}, []);

	return (
		<>
			<Container maxW="container.xl" centerContent>
				<Flex minH="665px" py={40}>
					<Box
						minH="665px"
						borderLeftRadius="xl"
						display={{ base: 'none', lg: 'flex' }}
						bg="ampPrimary.700">
						<HeadLogo />
					</Box>
					<VStack
						minH="665px"
						p="72px"
						spacing={10}
						w={{ base: '100%', md: '640px' }}
						alignItems=" center"
						bg="white"
						borderLeftRadius={{ base: 'xl', lg: 'none' }}
						borderRightRadius="xl">
						<AmpLogo />
						<Outlet
							context={{
								accountKey: accountKey,
								abbrevNameState: abbrevNameState,
								accountUid: accountUid,
								recaptcha: recaptcha,
								fetchInitialAccountDataError: fetchInitialAccountDataError,
								allowSelfRegistration: selfRegistration,
							}}
						/>
					</VStack>
				</Flex>
			</Container>
			<CookieConsent
				cookieName="cookie_message_accepted"
				expires={3600}
				disableStyles
				containerClasses="cookie-container"
				contentClasses="cookie-content"
				buttonClasses="cookie-button"
				buttonText="I ACCEPT">
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
		</>
	);
}
