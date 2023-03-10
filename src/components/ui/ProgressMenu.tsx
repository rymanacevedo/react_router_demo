import {
	Box,
	Divider,
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
import { CurrentRoundQuestionListData } from '../pages/AssignmentView/AssignmentTypes';

type ProgressMenuType = {
	isMenuOpen: boolean;
	currentRoundQuestionListData: CurrentRoundQuestionListData | undefined;
};

const ProgressMenu = ({
	isMenuOpen,
	currentRoundQuestionListData,
}: ProgressMenuType) => {
	const { t: i18n } = useTranslation();
	const progressPercent = currentRoundQuestionListData
		? Math.floor(
				(currentRoundQuestionListData?.masteredQuestionCount /
					currentRoundQuestionListData?.totalQuestionCount) *
					100,
		  )
		: 0;

	const learningCount = () => {
		return (
			currentRoundQuestionListData?.notSureCount +
			currentRoundQuestionListData?.uninformedCount +
			currentRoundQuestionListData?.informedCount +
			currentRoundQuestionListData?.misinformedCount -
			currentRoundQuestionListData?.misinformedCount
		);
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
				borderRadius={24}
				boxSizing="border-box"
				justifyContent={'space-between'}>
				<Box>
					<ProgressMessageComponent />
					<Divider borderWidth="1px" width="297px" marginLeft="24px" />
					<Box padding="24px">
						<Text fontSize="21px" fontWeight={'600'}>
							The road to mastery
						</Text>
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
									{currentRoundQuestionListData?.masteredQuestionCount}
								</Text>
							</VStack>
							<VStack paddingLeft="12px">
								<Text fontSize={'12px'} fontWeight="400">
									{i18n('incorrect')}
								</Text>{' '}
								<Text fontSize={'16px'} fontWeight="600" w="100%">
									{currentRoundQuestionListData?.misinformedCount}
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
									{currentRoundQuestionListData?.unseenCount}
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
