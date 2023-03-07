import { HStack, Icon, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

const CourseHome = () => {
	const { t: i18n } = useTranslation();

	return (
		<Link
			as={ReactRouterLink}
			to="/app/learning"
			textDecoration="none"
			w="full"
			color="ampWhite"
			h="80px"
			py="25px">
			<HStack>
				<Icon as={ArrowLeftIcon} />
				<Text>{i18n('courseHome')}</Text>
			</HStack>
		</Link>
	);
};

export default CourseHome;
