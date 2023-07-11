import { Flex, Link, Text, VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const QuickStart = () => {
	const { t: i18n } = useTranslation();

	return (
		<Flex justify="flex-end" ml="auto" minW="150">
			<Link
				as={ReactRouterLink}
				to="tour"
				textDecoration="none"
				color="ampWhite"
				h="80px"
				py="25px">
				<VStack spacing={0} align="flex-start">
					<Text color="ampError.200" fontSize="xs">
						{i18n('needHelp')}
					</Text>
					<Text fontSize="xs">{i18n('viewTour')}</Text>
				</VStack>
			</Link>
		</Flex>
	);
};

export default QuickStart;
