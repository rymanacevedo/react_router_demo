import { Flex, Heading, Text } from '@chakra-ui/react';
import CountUpTimer from './CountUpTimer';
import { useTranslation } from 'react-i18next';

const PracticeTestHeader = ({
	text,
	timeRemaining,
}: {
	text: string;
	timeRemaining: number | null;
}) => {
	const { t: i18n } = useTranslation();

	return (
		<Flex
			borderBottom={'1px'}
			borderBottomColor="ampPrimary.200"
			width="100%"
			height={{ base: 28, md: 20 }}
			bg={'transparent'}
			px={6}
			py={2}
			justify="space-between"
			align={{ base: 'flex-start', md: 'center' }}
			direction={{
				base: 'column',
				md: 'row',
			}}>
			{/* //TODO: investigate header sizing  */}
			<Heading as="h1" color="ampSecondaryText" fontSize="lg">
				{/* //TODO: get module name from parent once it is available. Also, how do we translate module names and other client generated strings? */}
				{i18n('practiceTest')}: {text}
			</Heading>
			{timeRemaining !== null && (
				<Flex direction="column" align={{ base: 'flex-start', md: 'flex-end' }}>
					<Text fontSize="xs" color={'ampPrimary.600'}>
						{i18n('timeLeft')}
					</Text>
					<CountUpTimer
						seconds={timeRemaining}
						color={'ampPrimary.600'}
						boxSize={6}
					/>
				</Flex>
			)}
		</Flex>
	);
};

export default PracticeTestHeader;
