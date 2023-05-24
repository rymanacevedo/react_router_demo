import { useEffect, useState } from 'react';
import {
	json,
	LoaderFunctionArgs,
	Outlet,
	useLoaderData,
} from 'react-router-dom';
import { ReactComponent as AmpLogo } from '../../ampLogo.svg';
import { ReactComponent as HeadLogo } from '../../headLogo.svg';
import { Box, Container, Flex, VStack } from '@chakra-ui/react';
import { z } from 'zod';
import { bootstrap } from '../../services/auth.reactrouter';
import { BootstrapData } from '../../App';
import AlertMessage from '../ui/AlertMessage';

const AuthLayoutContextSchema = z.object({
	accountKey: z.string().optional(),
	abbrevNameState: z.string(),
	accountUid: z.string(),
	recaptcha: z.string(),
});
export type AuthLayoutContext = z.infer<typeof AuthLayoutContextSchema>;

export const authLayoutLoader = async ({ request }: LoaderFunctionArgs) => {
	const bootstrapData = (await bootstrap(request)) as BootstrapData | null;
	return json(bootstrapData);
};

export default function AuthLayout() {
	const data = useLoaderData() as BootstrapData;
	const [accountKey, setAccountKey] = useState('');
	const [abbrevNameState, setAbbrevNameState] = useState('');
	const [accountUid, setAccountUid] = useState('');
	const [recaptcha, setRecaptcha] = useState('');
	const [selfRegistration, setSelfRegistration] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (data) {
			const { key, abbrevName, uid, allowSelfRegistration } = data.accountInfo;
			const { recaptchaSiteKey } = data;
			setAccountKey(key);
			setAbbrevNameState(abbrevName);
			setAccountUid(uid);
			setRecaptcha(recaptchaSiteKey);
			setSelfRegistration(allowSelfRegistration);
		} else {
			setError(true);
		}
	}, []);

	return (
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
							allowSelfRegistration: selfRegistration,
						}}
					/>
					{error && <AlertMessage text={'No account info provided'} />}
				</VStack>
			</Flex>
		</Container>
	);
}
