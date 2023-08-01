import { Center, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
	json,
	Link as ReactRouterLink,
	useLoaderData,
	useOutletContext,
} from 'react-router-dom';
import { LoaderFunction } from 'react-router';
import { AuthLayoutContext } from '../components/login/AuthLayout';

export const successLoader: LoaderFunction = async ({ request }) => {
	const successMessageToShow = new URL(request.url).searchParams.get(
		'successMessageToShow',
	);

	const obsfucatedEmail = new URL(request.url).searchParams.get(
		'obsfucatedEmail',
	);
	return json({
		message: successMessageToShow,
		obsfucatedEmail: obsfucatedEmail,
	});
};

export default function Success() {
	const { t: i18n } = useTranslation();
	const context = useOutletContext<AuthLayoutContext>();
	const { message, obsfucatedEmail } = useLoaderData() as any;

	const forgotUsernameSuccess = (
		<Flex
			direction="column"
			grow={1}
			w={{ base: '100%', md: '358px' }}
			align="center"
			justify="center">
			<Center>
				<Text align="center" mb={5}>
					{i18n('weWillSendEmail')}
				</Text>
			</Center>
			<Center>
				<Text align="center">
					{i18n('please')}{' '}
					<Link
						as={ReactRouterLink}
						to={{
							pathname: '/login',
							search: `?abbrevName=${context.abbrevNameState}`,
						}}
						color="ampSecondary.500"
						textDecoration="underline">
						{i18n('clickHere')}
					</Link>{' '}
					{i18n('toLogIn')}
				</Text>
			</Center>
		</Flex>
	);

	const signUpSuccess = (
		<Center height="100%">
			<VStack>
				<Text>{i18n('userCreated')}</Text>
				<Text>
					{i18n('please')}{' '}
					<Link
						as={ReactRouterLink}
						to={{
							pathname: '/login',
							search: `?abbrevName=${context.abbrevNameState}`,
						}}
						color="ampSecondary.500"
						textDecoration="underline">
						{i18n('clickHere')}
					</Link>{' '}
					{i18n('toLogIn')}
				</Text>
			</VStack>
		</Center>
	);

	const forgotPasswordSuccess = (
		<Flex
			direction="column"
			grow={1}
			w={{ base: '100%', md: '358px' }}
			align="center"
			justify="center">
			<Center>
				<Text align="center" mb={5}>
					{i18n('forgotPasswordSuccess', { email: obsfucatedEmail })}
				</Text>
			</Center>
			<Center>
				<Text align="center">{i18n('pleaseCloseWindow')}</Text>
			</Center>
		</Flex>
	);

	const registerSuccess = (
		<Center height="100%">
			<VStack>
				<Text>{i18n('userCreated')}</Text>
				<Text>
					{i18n('please')}{' '}
					<Link
						as={ReactRouterLink}
						to={{
							pathname: '/login',
							search: `?abbrevName=${context.abbrevNameState}`,
						}}
						color="ampSecondary.500"
						textDecoration="underline">
						{i18n('clickHere')}
					</Link>{' '}
					{i18n('toLogIn')}
				</Text>
			</VStack>
		</Center>
	);

	const getSuccessComponent = () => {
		switch (message) {
			case 'forgotUsername':
				return forgotUsernameSuccess;
			case 'signUp':
				return signUpSuccess;
			case 'forgotPassword':
				return forgotPasswordSuccess;
			case 'register':
				return registerSuccess;
			default:
				return null;
		}
	};

	return <>{getSuccessComponent()}</>;
}
