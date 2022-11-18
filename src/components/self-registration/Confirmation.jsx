import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as ReactRouterLink, useOutletContext } from 'react-router-dom';
import { Center, Link, Text, VStack } from '@chakra-ui/react';

const Confirmation = () => {
	const { t: i18n } = useTranslation();
	const context = useOutletContext();
	return (
		<>
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
		</>
	);
};

export default Confirmation;
