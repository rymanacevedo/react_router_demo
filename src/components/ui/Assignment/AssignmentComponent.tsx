import { Box, Container, HStack, Stack, useMediaQuery } from '@chakra-ui/react';
import Question from '../Question';
import ProgressMenu from '../ProgressMenu';

import {
	AnswerData,
	Confidence,
	Correctness,
	CurrentRoundAnswerOverLayData,
	ModuleData,
	QuestionInFocus,
	RoundData,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import AnswerArea from '../AnswerArea';
import { useEffect, useRef, useState } from 'react';
import { findDateData } from '../../../utils/logic';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';
import TestProgressBarMenu from '../TestProgressBarMenu';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import { findQuestionInFocus } from '../../pages/AssignmentView/findQuestionInFocus';
import { useNavigate } from 'react-router-dom';
import LoadingAssignmentView from '../loading/LoadingAssignmentView';
import { useQuizContext } from '../../../hooks/useQuizContext';
import FireProgressToast from '../ProgressToast';
import ModuleOutro from '../../pages/ModuleOutro';
import { useProgressMenuContext } from '../../../hooks/useProgressMenuContext';
import Matching from '../Matching';

type Props = {
	isInstructionalOverlayOpen: boolean;
	onClose: () => void;
	initRef: any;
	assignmentKey: string;
};

const initState = {
	self: null,
	totalQuestionCount: 0,
	masteredQuestionCount: 0,
	unseenCount: 0,
	misinformedCount: 0,
	uninformedCount: 0,
	notSureCount: 0,
	informedCount: 0,
	onceCorrectCount: 0,
	twiceCorrectCount: 0,
	completionPercentage: 0,
	completionAlgorithmType: '',
	questionsMastered: 0,
	questionSeconds: 0,
	reviewSeconds: 0,
	answerDate: '',
	correctness: null,
	confidence: null,
	correctAnswerIds: [],
	moduleComplete: false,
	avatarMessage: null,
	answerList: [],
};

export default function AssignmentComponent({
	isInstructionalOverlayOpen,
	onClose,
	initRef,
	assignmentKey,
}: Props) {
	const { handleMenuOpen } = useProgressMenuContext();
	const navigate = useNavigate();
	const {
		message,
		handleMessage,
		incrimentTwoFastReviewsInLu,
		moduleLearningUnitsData,
		updateModuleLearningUnitsData,
	} = useQuizContext();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isSureAndCorrectAllRound, setIsSureAndCorrectAllRound] =
		useState<boolean>(true);
	const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
	const [textPrompt, setTextPrompt] = useState<string>('');
	const [answerData, setAnswerData] = useState<AnswerData>({
		answerDate: '',
		answerList: [],
		avatarMessage: null,
		completionAlgorithmType: null,
		completionPercentage: 0,
		confidence: null,
		correctAnswerIds: null,
		correctness: null,
		informedCount: 0,
		masteredQuestionCount: 0,
		misinformedCount: 0,
		moduleComplete: false,
		notSureCount: 0,
		onceCorrectCount: 0,
		questionSeconds: 0,
		questionsMastered: 0,
		reviewSeconds: 0,
		self: null,
		totalQuestionCount: 0,
		twiceCorrectCount: 0,
		uninformedCount: 0,
		unseenCount: 0,
	});
	const [clearSelection, setClearSelection] = useState(false);
	const { getCurrentRound, putCurrentRound, getCurrentRoundSkipReview } =
		useCurrentRoundService();
	const { fetchModuleQuestions } = useModuleContentService();

	const [questionInFocus, setQuestionInFocus] = useState<QuestionInFocus>({
		answerList: [],
		answered: false,
		confidence: null,
		correctness: null,
		difficultyScore: 0,
		displayOrder: 0,
		explanationRc: '',
		flagged: false,
		hasModuleIntroduction: undefined,
		hideQuestionIntroImages: false,
		id: 0,
		interactiveState: null,
		introductionRc: '',
		moreInformationRc: '',
		name: '',
		pointsWorth: 0,
		publishedLearningUnitUri: '',
		publishedQuestionAuthoringKey: '',
		publishedQuestionId: 0,
		publishedQuestionUri: '',
		questionRc: '',
		questionType: '',
		questionVersionId: 0,
		quizSeconds: 0,
		reviewSeconds: 0,
	});

	const [currentRoundQuestionListData, setCurrentRoundQuestionListData] =
		useState<RoundData>();

	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
	const [currentRoundAnswerOverLayData, setCurrentRoundAnswerOverLayData] =
		useState<CurrentRoundAnswerOverLayData>(initState);
	const [showFeedback, setShowFeedback] = useState(false);
	const [questionData, setQuestionData] = useState<ModuleData>({
		accountUri: '',
		children: null,
		customizations: [],
		descriptionRc: null,
		id: 0,
		introductionRc: null,
		isAllowTimeIncrease: false,
		isCustomMessagesEnabled: false,
		isRecommendedModulesEnabled: false,
		key: '',
		kind: '',
		learningUnits: [],
		locale: '',
		name: '',
		outroButtonText: null,
		outroLink: '',
		outroRc: null,
		ownerAccountUid: '',
		publishedVersionId: null,
		self: '',
		timeAllotted: null,
		timedAssessment: false,
		uid: '',
		versionId: 0,
	});

	const [IDKResponse, setIDKResponse] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval>>();
	const questionSecondsRef = useRef(0);
	const [outro, setOutro] = useState(false);

	const clearSelectionButtonFunc = () => {
		setSelectedAnswers([]);
		setClearSelection(true);
		setIDKResponse(false);
	};

	const fetchModuleQuestionsData = async () => {
		try {
			let currentRoundQuestionsResponse = await getCurrentRound(assignmentKey);
			let moduleQuestionsResponse = {} as ModuleData;
			if (moduleLearningUnitsData.assignmentKey === assignmentKey) {
				moduleQuestionsResponse = moduleLearningUnitsData.data as ModuleData;
			} else {
				let res = await fetchModuleQuestions(assignmentKey);
				moduleQuestionsResponse = res;
				updateModuleLearningUnitsData(res, assignmentKey);
			}

			let revSkipRes: RoundData;

			if (currentRoundQuestionsResponse.roundPhase === 'REVIEW') {
				handleMessage('FIVE_CONSEC_SC', true);
				handleMessage('SIX_DK_IN_ROUND', true);
				handleMessage('FULL_ROUND_OF_SC', true);
				handleMessage('FIVE_FAST_ANSWERS', true);
				setIsSureAndCorrectAllRound(false);
			}

			if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
				if (
					currentRoundQuestionsResponse?.totalQuestionCount ===
					currentRoundQuestionsResponse?.masteredQuestionCount
				) {
					setOutro(true);
				} else if (
					currentRoundQuestionsResponse.questionList.every(
						(question: QuestionInFocus) =>
							question.correctness === Correctness.Correct &&
							question.confidence === Confidence.Sure,
					)
				) {
					revSkipRes = await getCurrentRoundSkipReview(assignmentKey);
					setQuestionData(moduleQuestionsResponse);
					setCurrentRoundQuestionListData(revSkipRes);
					setQuestionInFocus(
						findQuestionInFocus(
							moduleQuestionsResponse,
							revSkipRes,
							false,
							false,
						),
					);
				} else if (currentRoundQuestionsResponse.roundPhase === 'QUIZ') {
					setQuestionData(moduleQuestionsResponse);
					setCurrentRoundQuestionListData(currentRoundQuestionsResponse);
					setQuestionInFocus(
						findQuestionInFocus(
							moduleQuestionsResponse,
							currentRoundQuestionsResponse,
							false,
							false,
						),
					);
				} else {
					navigate(`/learning/assignmentReview/${assignmentKey}`);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};
	const stopTimer = () => {
		clearInterval(intervalRef.current);
		questionSecondsRef.current = 0;
	};
	const startTimer = () => {
		intervalRef.current = setInterval(() => {
			questionSecondsRef.current = questionSecondsRef.current + 1;
		}, 1000);

		return () => clearInterval(intervalRef.current);
	};

	const getNextTask = () => {
		setIsToastOpen(false);
		clearSelectionButtonFunc();
		setShowFeedback(false);
		fetchModuleQuestionsData().then(() => {
			setCurrentRoundAnswerOverLayData(initState);
			startTimer();
		});
	};

	useEffect(() => {
		startTimer();
		incrimentTwoFastReviewsInLu();
	}, []);

	const submitAnswer = () => {
		setAnswerData((answerDataArg: AnswerData) => {
			return {
				...answerDataArg,
				answerDate: findDateData(),
				questionSeconds: questionSecondsRef.current,
				answerList: [...selectedAnswers],
			};
		});
	};

	const submitMultiSelectAnswer = (s: SelectedAnswer[], c: Confidence) => {
		setAnswerData((answerDataArg: AnswerData) => {
			return {
				...answerDataArg,
				answerDate: findDateData(),
				questionSeconds: questionSecondsRef.current,
				answerList: [...s],
				confidence: c,
			};
		});
	};

	const continueBtnFunc = () => {
		if (showFeedback) {
			if (
				currentRoundQuestionListData?.totalQuestionCount ===
				currentRoundQuestionListData?.masteredQuestionCount
			) {
				setOutro(true);
			} else {
				getNextTask();
			}
		} else {
			submitAnswer();
		}
	};

	useEffect(() => {
		const putCurrentRoundRes = async () => {
			const feedbackData: CurrentRoundAnswerOverLayData = await putCurrentRound(
				currentRoundQuestionListData?.id,
				questionInFocus.id,
				answerData,
			);
			if (feedbackData) {
				if (
					feedbackData.confidence === Confidence.Sure &&
					feedbackData.correctness === Correctness.Correct
				) {
					if (message.FIVE_CONSEC_SC < 5 && isSureAndCorrectAllRound) {
						handleMessage('BOTH_SC', false);
					} else {
						handleMessage('FIVE_CONSEC_SC', false);
					}
				} else if (
					questionSecondsRef.current <= 5 &&
					feedbackData.correctness !== Correctness.Correct &&
					feedbackData.correctness !== Correctness.NoAnswerSelected &&
					message.FIVE_FAST_ANSWERS < 5
				) {
					setIsSureAndCorrectAllRound(false);
					handleMessage('FULL_ROUND_OF_SC', true);
					handleMessage('FIVE_FAST_ANSWERS', false);
					handleMessage('FIVE_CONSEC_SC', true);
				} else if (
					feedbackData.confidence === Confidence.Sure &&
					feedbackData.correctness === Correctness.Incorrect &&
					message.FIVE_CONSEC_SI < 5
				) {
					setIsSureAndCorrectAllRound(false);
					handleMessage('FULL_ROUND_OF_SC', true);
					handleMessage('FIVE_CONSEC_SI', false);
					handleMessage('FIVE_CONSEC_SC', true);
				} else if (
					feedbackData.confidence === Confidence.NotSure &&
					feedbackData.correctness === Correctness.NoAnswerSelected &&
					message.SIX_DK_IN_ROUND < 6
				) {
					setIsSureAndCorrectAllRound(false);
					handleMessage('FULL_ROUND_OF_SC', true);
					handleMessage('SIX_DK_IN_ROUND', false);
					handleMessage('FIVE_CONSEC_SC', true);
				} else {
					handleMessage('FIVE_CONSEC_SC', true);
					handleMessage('FIVE_FAST_ANSWERS', true);
					handleMessage('FIVE_CONSEC_SI', true);
					handleMessage('SIX_DK_IN_ROUND', true);
					handleMessage('FULL_ROUND_OF_SC', true);
					setIsSureAndCorrectAllRound(false);
				}

				setCurrentRoundAnswerOverLayData(feedbackData);
				setShowFeedback(true);
				questionSecondsRef.current = 0;
				stopTimer();

				if (
					!(
						feedbackData.correctness === Correctness.Correct &&
						feedbackData.confidence === Confidence.Sure
					)
				) {
					handleMessage(
						'TWO_NPA_IN_ROUND',
						false,
						Number(questionInFocus.publishedQuestionId),
						currentRoundQuestionListData?.roundNumber,
					);

					handleMessage(
						'TWO_NPA_ON_LU',
						false,
						Number(questionInFocus.publishedQuestionId),
					);
				}
				if (
					feedbackData.correctness === Correctness.Incorrect &&
					feedbackData.confidence === Confidence.Sure &&
					questionInFocus
				) {
					const publishedAnswer = questionInFocus.answerList.find((answer) => {
						return answer.id === feedbackData.answerList[0].answerId;
					});
					if (publishedAnswer) {
						handleMessage(
							'TWO_IDENTICAL_SI',
							false,
							Number(questionInFocus.publishedQuestionId),
							Number(publishedAnswer.publishedAnswerId),
						);
					} else {
						console.error('publishedAnswer not found');
					}
				}
			}
		};

		if (currentRoundQuestionListData?.id && questionInFocus?.id && answerData) {
			putCurrentRoundRes();
		}
	}, [answerData]);

	const handleReturnHome = () => {
		navigate('/learning');
	};

	useEffect(() => {
		if (message.FIVE_FAST_ANSWERS === 5 && message.FIVE_CONSEC_SC !== 5) {
			setIsToastOpen(true);
			setTextPrompt('FIVE_FAST_ANSWERS');
			handleMessage('FIVE_FAST_ANSWERS', true);
		}
	}, [message.FIVE_FAST_ANSWERS]);

	useEffect(() => {
		if (message.FIVE_CONSEC_SC === 5) {
			setIsToastOpen(true);
			setTextPrompt('FIVE_CONSEC_SC');
			handleMessage('FIVE_CONSEC_SC', true);
		}
	}, [message.FIVE_CONSEC_SC]);

	useEffect(() => {
		if (message.FIVE_CONSEC_SI === 5) {
			setIsToastOpen(true);
			setTextPrompt('FIVE_CONSEC_SI');
			handleMessage('FIVE_CONSEC_SI', true);
		}
	}, [message.FIVE_CONSEC_SI]);

	useEffect(() => {
		if (assignmentKey) {
			fetchModuleQuestionsData();
		}
	}, [assignmentKey]);

	const expandProgressMenu = () => {
		handleMenuOpen();
		setIsToastOpen(false);
	};

	useEffect(() => {
		if (message.SIX_DK_IN_ROUND === 6) {
			setIsToastOpen(true);
			setTextPrompt('SIX_DK_IN_ROUND');
			handleMessage('SIX_DK_IN_ROUND', true);
		}
	}, [message.SIX_DK_IN_ROUND]);

	useEffect(() => {
		if (
			currentRoundQuestionListData?.questionList.length &&
			currentRoundQuestionListData?.questionList.length >= 5
		) {
			if (
				message.FULL_ROUND_OF_SC ===
					currentRoundQuestionListData?.questionList.length &&
				isSureAndCorrectAllRound
			) {
				setIsToastOpen(true);
				setTextPrompt('FULL_ROUND_OF_SC');
				handleMessage('FULL_ROUND_OF_SC', true);
			}
		}
	}, [
		message.FULL_ROUND_OF_SC,
		currentRoundQuestionListData?.questionList.length,
	]);

	useEffect(() => {
		const index = message.TWO_IDENTICAL_SI.findIndex(
			(obj) => obj.questionId === questionInFocus.publishedQuestionId,
		);

		if (index !== -1 && message.TWO_IDENTICAL_SI[index].siCount >= 2) {
			setIsToastOpen(true);
			setTextPrompt('TWO_IDENTICAL_SI');
			handleMessage(
				'TWO_IDENTICAL_SI',
				true,
				Number(questionInFocus?.publishedQuestionId),
			);
		}
	}, [message.TWO_IDENTICAL_SI]);

	useEffect(() => {
		if (message.TWO_NPA_IN_ROUND === 2) {
			setIsToastOpen(true);
			setTextPrompt('TWO_NPA_IN_ROUND');
			handleMessage('TWO_NPA_IN_ROUND', true);
		}
	}, [message.TWO_NPA_IN_ROUND]);

	useEffect(() => {
		// event listener for when the round changes
		handleMessage('TWO_NPA_IN_ROUND', true);
	}, [currentRoundQuestionListData?.roundNumber]);

	useEffect(() => {
		const index = message.TWO_NPA_ON_LU.findIndex(
			(obj) => obj.questionId === questionInFocus.publishedQuestionId,
		);

		if (index > -1 && message.TWO_NPA_ON_LU[index].npaCount >= 2) {
			setIsToastOpen(true);
			setTextPrompt('TWO_NPA_ON_LU');
		}
	}, [message.TWO_NPA_ON_LU]);

	return currentRoundQuestionListData ? (
		<>
			{!outro ? (
				<Container
					id={'learning-assignment'}
					margin="0"
					padding="0"
					maxWidth={'100vw'}
					overflowY={'hidden'}
					overflowX={'hidden'}>
					<FireProgressToast
						textPrompt={textPrompt}
						expandProgressMenu={expandProgressMenu}
						isToastOpen={isToastOpen}
					/>
					<TestProgressBarMenu
						isInReviewView={false}
						questionData={questionData}
						currentRoundQuestionListData={currentRoundQuestionListData}
						currentQuestion={questionInFocus}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
					/>
					<HStack justify="center" align="space-between">
						{questionInFocus.questionType !== 'Matching' && (
							<Stack
								maxW="1496"
								w="100%"
								p="12px"
								pr="0px"
								alignItems="stretch"
								direction={['column', 'column', 'row', 'row', 'row', 'row']}>
								<Box
									backgroundColor="white"
									boxShadow="md"
									borderRadius={24}
									px={12}
									py="44px"
									w={{ base: '100%', md: '50%' }}>
									<Question questionInFocus={questionInFocus} />
								</Box>
								<AnswerArea
									isOpen={isInstructionalOverlayOpen}
									onClose={onClose}
									smallerThan1000={isSmallerThan1000}
									initialFocusRef={initRef}
									showFeedback={showFeedback}
									questionInFocus={questionInFocus}
									selectedAnswers={selectedAnswers}
									setSelectedAnswers={setSelectedAnswers}
									clearSelection={clearSelection}
									clearSelectionState={setClearSelection}
									currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
									continueBtnFunc={continueBtnFunc}
									clearSelectionFunction={clearSelectionButtonFunc}
									IDKResponse={IDKResponse}
									setIDKResponse={setIDKResponse}
									submitMultiSelectAnswer={submitMultiSelectAnswer}
								/>
							</Stack>
						)}
						{questionInFocus.questionType === 'Matching' && (
							<Matching questionInFocus={questionInFocus} />
						)}
						<ProgressMenu
							textPrompt={textPrompt}
							currentRoundQuestionListData={currentRoundQuestionListData}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						/>
					</HStack>
				</Container>
			) : (
				<ModuleOutro moduleData={questionData} action={handleReturnHome} />
			)}
		</>
	) : (
		<LoadingAssignmentView />
	);
}
