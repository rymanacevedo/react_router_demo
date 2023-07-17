import { HStack, Icon, Link, Text, Center } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { useProgressMenuContext } from '../../hooks/useProgressMenuContext';

const CourseHome = () => {
	const { t: i18n } = useTranslation();
	const { clearTimer } = useProgressMenuContext();

	return (
		<Center h="60px">
			<Link
				as={ReactRouterLink}
				to="/learning"
				textDecoration="none"
				w="full"
				color="ampWhite"
				onClick={clearTimer}>
				<HStack>
					<Icon as={ArrowLeftIcon} />
					<Text>{i18n('courseHome')}</Text>
				</HStack>
			</Link>
		</Center>
	);
};

export default CourseHome;
