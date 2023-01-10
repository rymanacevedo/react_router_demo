import { HStack, Icon, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

const CourseHome = () => {
	const { t: i18n } = useTranslation();

	return (
		<>
			<HStack
				style={{
					color: 'white',
					margin: '0px 8px',
					height: '80px',
					padding: '25px',
					boxSizing: 'border-box',
					fontWeight: 'bold',
					textAlign: 'center',
				}}>
				<Link as={ReactRouterLink} to="/app/courses" textDecoration="underline">
					<Icon as={ArrowLeftIcon} />
					<Text>{i18n('courseHome')}</Text>
				</Link>
			</HStack>
		</>
	);
};

export default CourseHome;
