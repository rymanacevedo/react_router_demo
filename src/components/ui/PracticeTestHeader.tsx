import { Flex, Text } from '@chakra-ui/react';
import CountUpTimer from './CountUpTimer';
import { useTranslation } from 'react-i18next';

const PraticeTestHeader = () => {
	const { t: i18n } = useTranslation();

	return (
		<Flex
			borderBottom={'1px'}
			borderBottomColor="ampPrimary.200"
			width="100%"
			height={20}
			bg={'transparent'}
			px={6}
			justify="space-between"
			align={{ base: 'flex-start', md: 'center' }}
			direction={{
				base: 'column',
				md: 'row',
			}}>
			<Text color="ampSecondaryText" fontSize="lg">
				{i18n('practiceTest')}: The Science of Learning
			</Text>
			<Flex direction="column" align={{ base: 'flex-start', md: 'flex-end' }}>
				<Text fontSize="xs" color={'ampPrimary.600'}>
					{i18n('timeLeft')}
				</Text>
				<CountUpTimer seconds={10000} color={'ampPrimary.600'} boxSize={6} />
			</Flex>
		</Flex>
	);
};

export default PraticeTestHeader;
