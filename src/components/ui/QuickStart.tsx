import { Flex, Link, Text, VStack, Center } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const QuickStart = () => {
	const { t: i18n } = useTranslation();

	return (
		<Flex justify="flex-end" ml="auto" minW="150">
			<Center h="60px">
				<Link
					as={ReactRouterLink}
					to="tour"
					textDecoration="none"
					color="ampWhite">
					<VStack spacing={0} align="flex-start">
						<Text color="ampError.200" fontSize="xs">
							{i18n('needHelp')}
						</Text>
						<Text fontSize="xs">{i18n('viewTour')}</Text>
					</VStack>
				</Link>
			</Center>
		</Flex>
	);
};

export default QuickStart;
