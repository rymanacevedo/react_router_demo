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
import { bootstrap, isBootStrapData } from '../../services/auth.reactrouter';
import AlertMessage from '../ui/AlertMessage';
import { unauthorized } from '../../services/utils';
import { InferSafeParseErrors } from './LoginForm';

const AuthLayoutContextSchema = z.object({
	accountKey: z.string().optional(),
	abbrevNameState: z.string(),
	accountUid: z.string(),
	recaptcha: z.string(),
	error: z.boolean(),
});

export const BootstrapDataSchema = z.object({
	accountInfo: z.object({
		key: z.string(),
		abbrevName: z.string(),
		uid: z.string(),
		name: z.string().optional(),
		parentUid: z.string().optional(),
		demo: z.boolean().optional(),
		modifiedTime: z.number().optional(),
		allowSelfRegistration: z.boolean(),
	}),
	recaptchaSiteKey: z.string(),
	items: z
		.array(
			z.object({
				messageCode: z.string(),
				message: z.string(),
			}),
		)
		.optional(),
});
export type AuthLayoutContext = z.infer<typeof AuthLayoutContextSchema>;
export type BootstrapData = z.infer<typeof BootstrapDataSchema>;
type BootstrapDataErrors = InferSafeParseErrors<typeof BootstrapDataSchema>;

type LoaderData<T> = {
	errors?: T extends BootstrapData ? BootstrapDataErrors : any;
};
export const authLayoutLoader = async ({ request }: LoaderFunctionArgs) => {
	const bootstrapData = (await bootstrap(request)) as BootstrapData | null;

	if (bootstrapData !== null && bootstrapData.items) {
		const error = bootstrapData.items[0];
		const { message } = error;

		return unauthorized({
			fields: bootstrapData,
			errors: {
				fieldErrors: {
					accountInfo: [`${message}`],
				},
			},
		});
	}

	return json(bootstrapData);
};

export default function AuthLayout() {
	const data = useLoaderData() as LoaderData<BootstrapData>;
	const [accountKey, setAccountKey] = useState('');
	const [abbrevNameState, setAbbrevNameState] = useState('');
	const [accountUid, setAccountUid] = useState('');
	const [recaptcha, setRecaptcha] = useState('');
	const [selfRegistration, setSelfRegistration] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (data && isBootStrapData(data)) {
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

		return () => {
			setAccountKey('');
			setAbbrevNameState('');
			setAccountUid('');
			setRecaptcha('');
			setSelfRegistration(false);
			setError(false);
		};
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
					p={12}
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
							error: error,
						}}
					/>
					{error && (
						<AlertMessage
							text={
								data?.errors?.fieldErrors?.accountInfo
									? Array.isArray(data.errors.fieldErrors.accountInfo)
										? data.errors.fieldErrors.accountInfo.join(', ')
										: data.errors.fieldErrors.accountInfo
									: 'No account info provided'
							}
						/>
					)}
				</VStack>
			</Flex>
		</Container>
	);
}
