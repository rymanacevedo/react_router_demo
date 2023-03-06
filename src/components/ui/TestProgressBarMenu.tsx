import { Box, Button, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import AmpMicroChip from '../../css/AmpMicroChip';
import { useTranslation } from 'react-i18next';
import { EnterIcon, ExitIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useMediaQuery } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

type ProgressBarMenu = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	answerHistory: ApiRes;
	questionData: any;
	currentRoundQuestionListData: any;
};

type ApiRes = {
	items: Item[];
};

type Item = {
	publishedQuestionUri: string;
	answerHistory: AnswerHistory[];
};

type AnswerHistory = {
	roundNumber: number;
	confidence: string;
	correctness: string;
};

type ModuleTitleType = {
	assignmentType: string;
	title: string;
};

type RoundNumberType = {
	roundNumber?: number;
};

//refactor to accept assignment type, title, time left, progress props
const ModuleTitle = ({ assignmentType, title }: ModuleTitleType) => {
	return (
		<Text fontSize={'21px'} fontWeight={'600'}>
			{/* {i18n('theScienceOfLearning')} */}
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

const RoundNumberAndPhase = ({ roundNumber }: RoundNumberType) => {
	return (
		<Text fontSize={'20px'} fontWeight={'600'}>
			{`Round ${roundNumber}: Learning`}
		</Text>
	);
};

type AnswerHistoryType = {
	totalQuestionCount: number;
	masteredQuestionCount: number;
	seenCount: number;
	misinformedCount: number;
	unseenCount: number;
	answerHistory: ApiRes;
};

const variantFunc = (answerHistory: any, dotIndex: number) => {
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
	};

	if (answerHistory.items) {
		const wholeAnswerString: any = answerHistory.items.map(
			(ans: any, i: number) => {
				if (i === dotIndex) {
					const classString: keyof LookupType = `${ans.answerHistory[0].confidence}${ans.answerHistory[0].correctness}`;
					return lookup[classString];
				} else {
					return lookup.empty;
				}
			},
		);

		return wholeAnswerString[dotIndex];
	}
};

const AnswerHistoryComponent = ({
	totalQuestionCount,
	answerHistory,
}: AnswerHistoryType) => {
	return (
		<HStack>
			{Array.from({ length: totalQuestionCount }, (_, i) => (
				<AmpMicroChip key={i} variant={variantFunc(answerHistory, i)} />
			))}
		</HStack>
	);
};

const TestProgressBarMenu = ({
	isOpen,
	setIsOpen,
	answerHistory,
	questionData,
	currentRoundQuestionListData,
}: ProgressBarMenu) => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const seenCount =
		currentRoundQuestionListData?.notSureCount +
		currentRoundQuestionListData?.uninformedCount +
		currentRoundQuestionListData?.informedCount +
		currentRoundQuestionListData?.misinformedCount;

	const progress = currentRoundQuestionListData
		? currentRoundQuestionListData?.totalQuestionCount /
		  currentRoundQuestionListData?.masteredQuestionCount
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
						answerHistory={answerHistory}
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
						leftIcon={isOpen ? <ExitIcon /> : <EnterIcon />}
						onClick={() => {
							setIsOpen(!isOpen);
						}}>
						<Text fontSize={'16px'} fontWeight="600">
							{isOpen ? i18n('hideProgress') : i18n('showProgress')}
						</Text>
					</Button>
				)}
			</HStack>
			<Progress
				value={progress}
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
