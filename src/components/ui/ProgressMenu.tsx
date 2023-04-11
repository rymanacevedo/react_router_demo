import {
	Box,
	Divider,
	Heading,
	HStack,
	Progress,
	SlideFade,
	Text,
	VStack,
} from '@chakra-ui/react';
import ProgressMessageComponent from './ProgressMessageComponent';
import { LapTimerIcon } from '@radix-ui/react-icons';
import CountUpTimer from './CountUpTimer';
import { useTranslation } from 'react-i18next';
import {
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
} from '../pages/AssignmentView/AssignmentTypes';
import { useProgressMenuContext } from '../../hooks/useProgressMenuContext';

type ProgressMenuType = {
	currentRoundQuestionListData: CurrentRoundQuestionListData | undefined;
	currentRoundAnswerOverLayData: CurrentRoundAnswerOverLayData | undefined;
	textPrompt?: string;
};

const ProgressMenu = (props: ProgressMenuType) => {
	const {
		currentRoundQuestionListData,
		currentRoundAnswerOverLayData,
		textPrompt,
	} = props;
	const { isMenuOpen } = useProgressMenuContext();
	const { t: i18n } = useTranslation();
	const dataSource = !currentRoundAnswerOverLayData?.answerDate
		? currentRoundQuestionListData
		: currentRoundAnswerOverLayData;

	const progressPercent = dataSource
		? Math.floor(
				(dataSource?.masteredQuestionCount / dataSource?.totalQuestionCount) *
					100,
		  )
		: 0;

	const seenCount = () => {
		return (
			dataSource?.notSureCount +
			dataSource?.uninformedCount +
			dataSource?.informedCount +
			dataSource?.misinformedCount
		);
	};

	const learningCount = () => {
		return seenCount() - dataSource?.misinformedCount;
	};

	return (
		<SlideFade in={isMenuOpen} offsetX="180px" offsetY="0px">
			<VStack
				style={{
					backgroundColor: 'white',
				}}
				boxShadow="2xl"
				h="745px"
				marginRight="24px"
				w={isMenuOpen ? '345px' : '0px'}
				display={isMenuOpen ? 'flex' : 'none'}
				borderRadius={24}
				boxSizing="border-box"
				justifyContent={'space-between'}>
				<Box>
					<ProgressMessageComponent
						textPrompt={textPrompt}
						isMenuOpen={isMenuOpen}
					/>
					<Divider borderWidth="1px" width="297px" marginLeft="24px" />
					<Box padding="24px">
						<Heading as="h3" size="lg">
							The road to mastery
						</Heading>
						<Progress
							colorScheme="green"
							marginTop="12px"
							size="lg"
							height="24px"
							value={progressPercent}
							borderRadius="24px"
							variant="ampDarkSuccess"
							bg="ampSuccess.50"
						/>
						<HStack marginTop="12px">
							<VStack>
								<Text fontSize={'12px'} fontWeight="400">
									{i18n('mastered')}
								</Text>{' '}
								<Text fontSize={'16px'} fontWeight="600" w="100%">
									{dataSource?.masteredQuestionCount}
								</Text>
							</VStack>
							<VStack paddingLeft="12px">
								<Text fontSize={'12px'} fontWeight="400">
									{i18n('incorrect')}
								</Text>{' '}
								<Text fontSize={'16px'} fontWeight="600" w="100%">
									{dataSource?.misinformedCount}
								</Text>
							</VStack>
							<VStack paddingLeft="12px">
								<Text fontSize={'12px'} fontWeight="400">
									{i18n('learning')}
								</Text>{' '}
								<Text fontSize={'16px'} fontWeight="600" w="100%">
									{Number(learningCount())}
								</Text>
							</VStack>
							<VStack paddingLeft="12px">
								<Text fontSize={'12px'} fontWeight="400">
									{i18n('unseen')}
								</Text>{' '}
								<Text fontSize={'16px'} fontWeight="600" w="100%">
									{dataSource?.unseenCount}
								</Text>
							</VStack>
						</HStack>
					</Box>
				</Box>
				<Box
					h="92px"
					w="100%"
					bg="ampSecondary.500"
					borderBottomRadius={'12px'}
					padding="24px">
					<Text fontSize={'12px'} color={'ampWhite'}>
						{i18n('sessionTimer')}
					</Text>
					<HStack>
						<LapTimerIcon
							style={{ color: 'white', height: '19px', width: '19px' }}
						/>
						<CountUpTimer />
					</HStack>
				</Box>
			</VStack>
		</SlideFade>
	);
};

export default ProgressMenu;
