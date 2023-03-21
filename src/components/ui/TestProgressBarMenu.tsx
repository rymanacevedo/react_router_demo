import {
	Box,
	Button,
	HStack,
	Progress,
	Text,
	VStack,
	useMediaQuery,
} from '@chakra-ui/react';
import AmpMicroChip from '../../css/AmpMicroChip';
import { useTranslation } from 'react-i18next';
import { EnterIcon, ExitIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useLocation } from 'react-router-dom';

type ProgressBarMenu = {
	isMenuOpen: boolean;
	setIsMenuOpen: (isMenuOpen: boolean) => void;
	questionData: any;
	currentRoundQuestionListData: any;
	currentQuestion: any;
};

type ModuleTitleType = {
	assignmentType: string;
	title: string;
};

type RoundNumberType = {
	roundNumber: number;
	roundPhase: string;
};

//refactor to accept assignment type, title, time left, progress props
const ModuleTitle = ({ assignmentType, title }: ModuleTitleType) => {
	return (
		<Text fontSize={'21px'} fontWeight={'600'}>
			{assignmentType}: {title}
		</Text>
	);
};

const ModuleTimeRemaining = () => {
	const location = useLocation();

	const estimatedTimeRemaining = () => {
		const time = location?.state?.estimatedTimeToComplete;
		let hour = 0;
		let min = 0;

		if (time == null || time <= 0) {
			return '';
		}

		if (time >= 3600) {
			// over an hour
			hour = time / 3600;
			min = Math.ceil((time % 3600) / 60);

			return `About ${hour} hr ${min} mins remaining.`;
		} else {
			// under one hour
			min = Math.ceil(time / 60);

			return `About ${min} mins remaining.`;
		}
	};
	return (
		<Text fontSize={'16px'} color="ampNeutral.800">
			{estimatedTimeRemaining()}
		</Text>
	);
};

const RoundNumberAndPhase = ({ roundNumber, roundPhase }: RoundNumberType) => {
	let phase;

	switch (roundPhase) {
		case 'REVIEW':
			phase = 'Learning';
			break;
		case 'QUIZ':
			phase = 'Questions';
			break;
		default:
			phase = '';
	}

	return (
		<Text fontSize={'20px'} fontWeight={'600'}>
			{`Round ${roundNumber}: ${phase}`}
		</Text>
	);
};

type AnswerHistoryType = {
	totalQuestionCount: number;
	masteredQuestionCount: number;
	seenCount: number;
	misinformedCount: number;
	unseenCount: number;
	roundLength: any;
	currentQuestion: any;
	questionList: any;
};

const variantFunc = (
	dotIndex: number,
	currentQuestion: any,
	questionList: any,
) => {
	type LookupType = {
		[key: string]: string;
		OneAnswerPartSureCorrect: string;
		PartSureCorrect: string;
		SureCorrect: string;
		SureIncorrect: string;
		UnsureCorrect: string;
		UnsureIncorrect: string;
		empty: string;
		PartSurePartiallyCorrect: string;
		OneAnswerPartSureIncorrect: string;
		PartSureIncorrect: string;
		currentQuestion: string;
		NotSureNoAnswerSelected: string;
	};
	const lookup: LookupType = {
		OneAnswerPartSureCorrect: 'ampDarkSuccessOutline',
		PartSureCorrect: 'ampDarkSuccessOutline',
		SureCorrect: 'ampDarkSuccess',
		SureIncorrect: 'ampDarkError',
		UnsureCorrect: 'ampDarkSuccessOutline',
		UnsureIncorrect: 'ampDarkErrorOutline',
		empty: 'ampNeutralUnfilled',
		PartSurePartiallyCorrect: 'ampWarningOutline',
		OneAnswerPartSureIncorrect: 'ampDarkErrorOutline',
		PartSureIncorrect: 'ampDarkErrorOutline',
		currentQuestion: 'ampSecondaryDot',
		NotSureNoAnswerSelected: 'ampNeutralFilled',
	};

	let classNamesArray = questionList?.map((question: any) => {
		if (dotIndex === currentQuestion.displayOrder - 1) {
			return lookup.currentQuestion;
		}
		if (question.answered) {
			return lookup[`${question.confidence}${question.correctness}`];
		} else {
			return lookup.empty;
		}
	});

	return classNamesArray[dotIndex] !== undefined
		? classNamesArray[dotIndex]
		: lookup.empty;
};

const AnswerHistoryComponent = ({
	roundLength,
	currentQuestion,
	questionList,
}: AnswerHistoryType) => {
	return (
		<HStack>
			{Array.from({ length: roundLength }, (_, i) => (
				<AmpMicroChip
					key={i}
					variant={variantFunc(i, currentQuestion, questionList)}
				/>
			))}
		</HStack>
	);
};

const TestProgressBarMenu = ({
	isMenuOpen,
	setIsMenuOpen,
	questionData,
	currentQuestion,
	currentRoundQuestionListData,
}: ProgressBarMenu) => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const seenCount =
		currentRoundQuestionListData?.notSureCount +
		currentRoundQuestionListData?.uninformedCount +
		currentRoundQuestionListData?.informedCount +
		currentRoundQuestionListData?.misinformedCount;
	const progressPercent = currentRoundQuestionListData
		? Math.floor(
				(currentRoundQuestionListData?.masteredQuestionCount /
					currentRoundQuestionListData?.totalQuestionCount) *
					100,
		  )
		: 0;

	const assignmentType = questionData?.kind;
	const title = questionData?.name;

	return (
		<Box width="100vw" boxSizing="border-box">
			<HStack
				borderBottom={'1px'}
				borderBottomColor="ampSecondary.300"
				zIndex="2"
				position={'absolute'}
				width="100%"
				height={'80px'}
				bg={'transparent'}
				justifyContent={isSmallerThan1000 ? '' : 'space-between'}
				paddingLeft="24px"
				paddingRight="24px"
				flexDirection={isSmallerThan1000 ? 'column' : 'initial'}>
				<VStack align={'left'} display={isSmallerThan1000 ? 'none' : 'block'}>
					<ModuleTitle title={title} assignmentType={assignmentType} />
					<ModuleTimeRemaining />
				</VStack>
				<VStack
					alignSelf={'center'}
					style={{ marginTop: isSmallerThan1000 ? '12px' : '' }}>
					<RoundNumberAndPhase
						roundNumber={currentRoundQuestionListData?.roundNumber}
						roundPhase={currentRoundQuestionListData?.roundPhase}
					/>
					<AnswerHistoryComponent
						totalQuestionCount={
							currentRoundQuestionListData?.totalQuestionCount
						}
						masteredQuestionCount={
							currentRoundQuestionListData?.masteredQuestionCount
						}
						unseenCount={currentRoundQuestionListData?.unseenCount}
						misinformedCount={currentRoundQuestionListData?.misinformedCount}
						seenCount={seenCount}
						roundLength={currentRoundQuestionListData?.questionList?.length}
						currentQuestion={currentQuestion}
						questionList={currentRoundQuestionListData?.questionList}
					/>
				</VStack>

				{isSmallerThan1000 ? (
					<Button
						variant={'outline'}
						borderColor={'ampPrimary.300'}
						bg="ampWhite"
						alignSelf={'flex-end'}
						style={{ marginTop: '-40px' }}>
						{<ChevronDownIcon />}
					</Button>
				) : (
					<Button
						variant={'outline'}
						borderColor={'ampPrimary.300'}
						bg="ampWhite"
						width="200px"
						leftIcon={isMenuOpen ? <ExitIcon /> : <EnterIcon />}
						onClick={() => {
							setIsMenuOpen(!isMenuOpen);
						}}>
						<Text fontSize={'16px'} fontWeight="600">
							{isMenuOpen ? i18n('hideProgress') : i18n('showProgress')}
						</Text>
					</Button>
				)}
			</HStack>
			<Progress
				value={progressPercent}
				height={'80px'}
				colorScheme="gray"
				zIndex={'1'}
				width="100%"
				bg="ampNeutral.50"
			/>
		</Box>
	);
};

export default TestProgressBarMenu;
