import { Box, Button, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import AmpMicroChip from '../../css/AmpMicroChip';
import { useTranslation } from 'react-i18next';

const TestProgressBarMenu = () => {
	const { t: i18n } = useTranslation();

	return (
		<Box width="100%" boxSizing="border-box">
			<HStack
				borderBottom={'1px'}
				borderBottomColor="ampSecondary.300"
				zIndex="2"
				position={'absolute'}
				width="100%"
				height={'80px'}
				bg={'transparent'}
				justify="space-between"
				paddingLeft="24px"
				paddingRight="24px">
				<VStack align={'left'}>
					<Text fontSize={'21px'} fontWeight={'600'}>
						{i18n('theScienceOfLearning')}
					</Text>
					<Text fontSize={'16px'} color="ampNeutral.800">
						{`${i18n('about')} 24 ${i18n('minsLeft')}`}
					</Text>
				</VStack>
				<VStack>
					<Text fontSize={'20px'} fontWeight={'600'}>
						{`Round 1: ${i18n('questions')}`}
					</Text>
					<HStack>
						<AmpMicroChip variant="ampDarkSuccess" />
						<AmpMicroChip variant="ampDarkSuccess" />
						<AmpMicroChip variant="ampDarkSuccess" />
						<AmpMicroChip variant="ampDarkErrorOutline" />
						<AmpMicroChip variant="ampDarkError" />
						<AmpMicroChip variant="ampSecondaryDot" />
						<AmpMicroChip variant="ampNeutralUnfilled" />
					</HStack>
				</VStack>
				<Button variant={'outline'} borderColor={'ampPrimary.300'}>
					<Text fontSize={'16px'} fontWeight="600">
						{i18n('showProgress')}
					</Text>
				</Button>
			</HStack>
			<Progress
				value={80}
				height={'80px'}
				colorScheme="gray"
				zIndex={'1'}
				width="100%"
			/>
		</Box>
	);
};

export default TestProgressBarMenu;
