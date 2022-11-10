import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useInitialAccountDataService from '../../services/useInitialAccountDataService';
import { ReactComponent as AmpLogo } from '../../ampLogo.svg';
import { ReactComponent as HeadLogo } from '../../headLogo.svg';
import { Box, Container, Flex, VStack } from '@chakra-ui/react';
import CookieConsent from 'react-cookie-consent';

export default function LoginWrapper() {
	const { t: i18n } = useTranslation();
	const [accountKey, setAccountKey] = useState('');
	const [abbrevNameState, setAbbrevNameState] = useState('');
	const [accountUid, setAccountUid] = useState('');
	const [recaptcha, setRecaptcha] = useState('');
	const [searchParams] = useSearchParams();

	const { fetchInitialAccountData, error: fetchInitialAccountDataError } =
		useInitialAccountDataService();

	const handleFetchInitialUserData = async (account: any) => {
		const data = await fetchInitialAccountData(account);
		const { key, abbrevName, uid } = data.accountInfo;
		const { recaptchaSiteKey } = data;
		setAccountKey(key);
		setAbbrevNameState(abbrevName);
		setAccountUid(uid);
		setRecaptcha(recaptchaSiteKey);
	};

	useEffect(() => {
		handleFetchInitialUserData(searchParams.get('abbrevName'));
	}, []);

	return (
		<>
			<Container maxW="container.xl" centerContent p={0}>
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
						<VStack spacing={16} alignItems="center">
							<AmpLogo />
						</VStack>
						<Outlet
							context={{
								accountKey: accountKey,
								abbrevNameState: abbrevNameState,
								accountUid: accountUid,
								recaptcha: recaptcha,
								fetchInitialAccountDataError: fetchInitialAccountDataError,
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
