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
import CountUpTimer from './CountUpTimer';
import { useTranslation } from 'react-i18next';
import { CurrentRoundAnswerOverLayData } from '../pages/AssignmentView/AssignmentTypes';
import { RoundData } from '../../lib/validator';
import { useProgressMenuContext } from '../../hooks/useProgressMenuContext';

type ProgressMenuType = {
	currentRoundQuestionListData: RoundData | undefined;
	currentRoundAnswerOverLayData: CurrentRoundAnswerOverLayData | undefined;
	textPrompt?: string;
};

const ProgressMenu = (props: ProgressMenuType) => {
	const {
		currentRoundQuestionListData,
		currentRoundAnswerOverLayData,
		textPrompt,
	} = props;
	const { isMenuOpen, seconds } = useProgressMenuContext();
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
		<SlideFade
			in={isMenuOpen}
			offsetX="180px"
			offsetY="0px"
			style={{
				alignSelf: 'flex-start',
				paddingTop: '10px',
				marginLeft: '0px',
			}}>
			<VStack
				style={{
					backgroundColor: 'white',
				}}
				boxShadow="2xl"
				h="600px"
				marginRight={3}
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
					<Divider borderWidth="1px" width="297px" marginLeft={6} />
					<Box padding={6}>
						<Heading as="h3" size="lg">
							The road to mastery
						</Heading>
						<Progress
							colorScheme="green"
							marginTop={3}
							size="lg"
							height="24px"
							value={progressPercent}
							borderRadius="3xl"
							variant="ampDarkSuccess"
							bg="ampSuccess.50"
						/>
						<HStack marginTop={3}>
							<VStack>
								<Text fontSize="xs" fontWeight="normal">
									{i18n('mastered')}
								</Text>{' '}
								<Text fontSize="md" fontWeight="semibold" w="100%">
									{dataSource?.masteredQuestionCount}
								</Text>
							</VStack>
							<VStack paddingLeft={3}>
								<Text fontSize="xs" fontWeight="normal">
									{i18n('incorrect')}
								</Text>{' '}
								<Text fontSize="md" fontWeight="semibold" w="100%">
									{dataSource?.misinformedCount}
								</Text>
							</VStack>
							<VStack paddingLeft={3}>
								<Text fontSize="xs" fontWeight="normal">
									{i18n('learning')}
								</Text>{' '}
								<Text fontSize="md" fontWeight="semibold" w="100%">
									{Number(learningCount())}
								</Text>
							</VStack>
							<VStack paddingLeft={3}>
								<Text fontSize="xs" fontWeight="normal">
									{i18n('unseen')}
								</Text>{' '}
								<Text fontSize="md" fontWeight="semibold" w="100%">
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
					borderBottomRadius="xl"
					padding={6}>
					<Text fontSize="xs" color={'ampWhite'}>
						{i18n('sessionTimer')}
					</Text>
					<CountUpTimer seconds={seconds} color={'ampWhite'} boxSize={5} />
				</Box>
			</VStack>
		</SlideFade>
	);
};

export default ProgressMenu;
