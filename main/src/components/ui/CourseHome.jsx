import {HStack, Icon, Link, Text} from '@chakra-ui/react';
import {Link as ReactRouterLink} from 'react-router-dom';

import {ArrowLeftIcon} from '@radix-ui/react-icons';
import {useTranslation} from 'react-i18next';
import {useQuizContext} from '../../../../src/hooks/useQuizContext';

const CourseHome = () => {
	const { t: i18n } = useTranslation();
    const { handleMessage } = useQuizContext();
    const handleClick = () => {
        handleMessage('FIVE_FAST_ANSWERS', true);
        handleMessage('FIVE_CONSEC_SC', true);
		handleMessage('FIVE_CONSEC_SI', true);
		handleMessage('SIX_DK_IN_ROUND', true);
    }

	return (
		<Link
            onClick={handleClick}
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
