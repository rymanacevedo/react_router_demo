/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Box,
	Button,
	Heading,
	HStack,
	Progress,
	Text,
	useMediaQuery,
	VStack,
	Flex,
} from '@chakra-ui/react';
import AmpMicroChip from '../../css/AmpMicroChip';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, EnterIcon, ExitIcon } from '@radix-ui/react-icons';
import { useLocation } from 'react-router-dom';
import {
	AnswerHistory,
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
} from '../pages/AssignmentView/AssignmentTypes';
import { useProgressMenuContext } from '../../hooks/useProgressMenuContext';
import { Icons } from './Review/ReviewQuestions';

type ProgressBarMenu = {
	questionData: any;
	currentRoundQuestionListData: any;
	currentRoundAnswerOverLayData?: CurrentRoundAnswerOverLayData;
	currentQuestion: any;
	inReview?: boolean;
	questionIndex?: number;
	viewCorrect?: boolean;
	showType?: boolean;
	answerHistory?: AnswerHistory[];
	isInReviewView: boolean;
};

type ModuleTitleType = {
	assignmentType: string;
	title: string;
	showType?: boolean;
};

type RoundNumberType = {
	roundNumber: number;
	roundPhase: string;
};

//refactor to accept assignment type, title, time left, progress props

const ModuleTitle = ({ assignmentType, title, showType }: ModuleTitleType) => {
	return (
		<Heading as="h1" fontSize={'21px'}>
			{!showType ? `${assignmentType}: ${title}` : title}
		</Heading>
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
	inReview?: boolean;
	currentRoundAnswerOverLayData?: CurrentRoundAnswerOverLayData;
	questionIndex?: number;
	viewCorrect?: boolean;
};

const variantFunc = (
	dotIndex: number,
	currentQuestion: any,
	questionList: QuestionInFocus[],
	wrongAnswers: QuestionInFocus[],
	inReview?: boolean,
	currentRoundAnswerOverLayData?: CurrentRoundAnswerOverLayData,
	questionIndex?: number,
) => {
	type LookupType = {
		[key: string]: string;
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
		CurrentSureIncorrect: 'ampDarkErrorDot',
		CurrentUnsureIncorrect: 'ampDarkErrorOutlineDot',
		CurrentOneAnswerPartSureIncorrect: 'ampDarkErrorOutlineDot',
		CurrentNotSureNoAnswerSelected: 'ampNeutralFilledDot',
		CurrentPartSurePartiallyCorrect: 'ampWarningOutlineDot',
		CurrentPartSureCorrect: 'ampDarkSuccessOutlineDot',
		CurrentOneAnswerPartSureCorrect: 'ampDarkSuccessOutlineDot',
		CurrentSureCorrect: 'ampDarkSuccessDot',
	};
	let arrayToMap = inReview ? wrongAnswers : questionList;
	let classNamesArray = arrayToMap?.map((question: any) => {
		if (!inReview && dotIndex === currentQuestion.displayOrder - 1) {
			if (question.confidence === null && question.correctness === null) {
				if (
					currentRoundAnswerOverLayData?.confidence &&
					currentRoundAnswerOverLayData?.correctness
				) {
					return lookup[
						`Current${currentRoundAnswerOverLayData?.confidence}${currentRoundAnswerOverLayData?.correctness}`
					];
				}
			}

			return lookup.currentQuestion;
		}
		if (inReview && dotIndex === questionIndex) {
			return lookup[`Current${question?.confidence}${question?.correctness}`];
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
	inReview,
	currentRoundAnswerOverLayData,
	questionIndex,
	viewCorrect,
}: AnswerHistoryType) => {
	const wrongAnswers = inReview
		? questionList?.filter((question: any) => {
				if (viewCorrect) {
					return (
						`${question.confidence}${question.correctness}` === 'SureCorrect'
					);
				} else {
					return (
						`${question.confidence}${question.correctness}` !== 'SureCorrect'
					);
				}
		  })
		: [];

	return (
		<>
			<HStack>
				{Array.from(
					{ length: inReview ? wrongAnswers?.length : roundLength },
					(_, i) => (
						<AmpMicroChip
							key={i}
							variant={variantFunc(
								i,
								currentQuestion,
								questionList,
								wrongAnswers,
								inReview,
								currentRoundAnswerOverLayData,
								questionIndex,
							)}
						/>
					),
				)}
			</HStack>
		</>
	);
};

const TestProgressBarMenu = ({
	questionData,
	currentQuestion,
	currentRoundQuestionListData,
	inReview,
	currentRoundAnswerOverLayData,
	questionIndex,
	viewCorrect,
	showType,
	answerHistory,
	isInReviewView,
}: ProgressBarMenu) => {
	const { isMenuOpen, handleMenuOpen } = useProgressMenuContext();
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const dataSource = !currentRoundAnswerOverLayData?.answerDate
		? currentRoundQuestionListData
		: currentRoundAnswerOverLayData;

	const seenCount =
		dataSource?.notSureCount +
		dataSource?.uninformedCount +
		dataSource?.informedCount +
		dataSource?.misinformedCount;

	const progressPercent = dataSource
		? Math.floor(
				(dataSource?.masteredQuestionCount / dataSource?.totalQuestionCount) *
					100,
		  )
		: 0;

	const assignmentType = questionData?.kind;
	const title = questionData?.name;

	const rightSideProgressRender = () => {
		if (isInReviewView) {
			return (
				<Box>
					<Flex align="center">
						<Text fontWeight="bold" mr={5}>
							Attempts
						</Text>
						<Icons
							isInReviewView={true}
							addMargins={false}
							answerHistory={answerHistory}
							isExpanded={true}
						/>
					</Flex>
				</Box>
			);
		} else {
			return (
				<Button
					variant={'outline'}
					color="ampPrimary.600"
					borderColor={'ampPrimary.300'}
					bg="ampWhite"
					width={40}
					px={4}
					py={2.5}
					leftIcon={
						isMenuOpen ? (
							<ExitIcon />
						) : (
							<EnterIcon style={{ transform: 'rotateY(180deg)' }} />
						)
					}
					onClick={() => {
						handleMenuOpen();
					}}>
					<Text fontSize={'16px'} fontWeight="600">
						{isMenuOpen ? i18n('hideProgress') : i18n('showProgress')}
					</Text>
				</Button>
			);
		}
	};

	return (
		<Box width="100vw" boxSizing="border-box">
			<HStack
				borderBottom={'1px'}
				borderBottomColor="ampPrimary.200"
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
					<ModuleTitle
						title={title}
						assignmentType={assignmentType}
						showType={showType}
					/>
					<ModuleTimeRemaining />
				</VStack>
				<VStack
					alignSelf={'center'}
					style={{ marginTop: isSmallerThan1000 ? '12px' : '' }}>
					{!isInReviewView && (
						<RoundNumberAndPhase
							roundNumber={currentRoundQuestionListData?.roundNumber}
							roundPhase={currentRoundQuestionListData?.roundPhase}
						/>
					)}

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
						inReview={inReview}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						questionIndex={questionIndex}
						viewCorrect={viewCorrect}
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
					rightSideProgressRender()
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
