import { Box, Container, HStack, Stack, useMediaQuery } from '@chakra-ui/react';
import Question from '../Question';
import ProgressMenu from '../ProgressMenu';

import {
	AnswerData,
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	QuestionInFocus,
	SelectedAnswers,
} from '../../pages/AssignmentView/AssignmentTypes';
import AnswerArea from '../AnswerInput/AnswerArea';
import { useEffect, useRef, useState } from 'react';
import { findDateData } from '../../../utils/logic';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';
import TestProgressBarMenu from '../TestProgressBarMenu';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import { findQuestionInFocus } from '../../pages/AssignmentView/findQuestionInFocus';
import { useNavigate } from 'react-router-dom';
import LoadingAssignmentView from '../loading/LoadingAssignmentView';
import { ModuleData, useQuizContext } from '../../../hooks/useQuizContext';
import FireProgressToast from '../ProgressToast';
import ModuleOutro from '../../pages/ModuleOutro';
import { useProgressMenuContext } from '../../../hooks/useProgressMenuContext';

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
	correctness: '',
	confidence: '',
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
		confidence: '',
		correctness: '',
		difficultyScore: 0,
		displayOrder: 0,
		explanationRc: null,
		flagged: false,
		hasModuleIntroduction: undefined,
		hideQuestionIntroImages: false,
		id: 0,
		interactiveState: null,
		introductionRc: null,
		moreInformationRc: null,
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
		useState<CurrentRoundQuestionListData>();

	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers[]>([]);
	const [currentRoundAnswerOverLayData, setCurrentRoundAnswerOverLayData] =
		useState<CurrentRoundAnswerOverLayData>(initState);
	const [showOverlay, setShowOverlay] = useState(false);
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
		outroLink: null,
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

			let revSkipRes = {} as CurrentRoundQuestionListData;

			if (currentRoundQuestionsResponse.roundPhase === 'REVIEW') {
				handleMessage('FIVE_CONSEC_SC', true);
				handleMessage('SIX_DK_IN_ROUND', true);
				handleMessage('FULL_ROUND_OF_SC', true);
				setIsSureAndCorrectAllRound(false);
				handleMessage('FIVE_FAST_ANSWERS', true);
			}

			if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
				if (
					currentRoundQuestionsResponse?.totalQuestionCount ===
					currentRoundQuestionsResponse?.masteredQuestionCount
				) {
					setOutro(true);
				} else if (
					currentRoundQuestionsResponse.questionList.every(
						(question: { correctness: string; confidence: string }) =>
							question.correctness === 'Correct' &&
							question.confidence === 'Sure',
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
					navigate(`/app/learning/assignmentReview/${assignmentKey}`);
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
		setShowOverlay(false);
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
		setAnswerData((answerDataArg: any) => {
			return {
				...answerDataArg,
				answerDate: findDateData(),
				questionSeconds: questionSecondsRef.current,
				answerList: [...selectedAnswers],
			};
		});
	};

	const continueBtnFunc = () => {
		if (showOverlay) {
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
			const overLayData = await putCurrentRound(
				currentRoundQuestionListData?.id,
				questionInFocus.id,
				answerData,
			);

			if (overLayData) {
				if (
					overLayData.confidence === 'Sure' &&
					overLayData.correctness === 'Correct'
				) {
					if (message.FIVE_CONSEC_SC < 5 && isSureAndCorrectAllRound) {
						handleMessage('BOTH_SC', false);
					} else {
						handleMessage('FIVE_CONSEC_SC', false);
					}
				} else if (
					questionSecondsRef.current <= 5 &&
					overLayData.correctness !== 'Correct' &&
					overLayData.correctness !== 'NoAnswerSelected' &&
					message.FIVE_FAST_ANSWERS < 5
				) {
					setIsSureAndCorrectAllRound(false);
					handleMessage('FULL_ROUND_OF_SC', true);
					handleMessage('FIVE_FAST_ANSWERS', false);
					handleMessage('FIVE_CONSEC_SC', true);
				} else if (
					overLayData.confidence === 'Sure' &&
					overLayData.correctness === 'Incorrect' &&
					message.FIVE_CONSEC_SI < 5
				) {
					setIsSureAndCorrectAllRound(false);
					handleMessage('FULL_ROUND_OF_SC', true);
					handleMessage('FIVE_CONSEC_SI', false);
					handleMessage('FIVE_CONSEC_SC', true);
				} else if (
					overLayData.confidence === 'NotSure' &&
					overLayData.correctness === 'NoAnswerSelected' &&
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

				setCurrentRoundAnswerOverLayData(overLayData);
				setShowOverlay(true);
				questionSecondsRef.current = 0;
				stopTimer();

				if (
					questionInFocus &&
					`${overLayData.confidence}${overLayData.correctness}` ===
						'SureIncorrect'
				) {
					const publishedAnswer = questionInFocus.answerList.find((answer) => {
						return answer.id === overLayData.answerList[0].answerId;
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
				if (
					!(
						overLayData.correctness === 'Correct' &&
						overLayData.confidence === 'Sure'
					)
				) {
					handleMessage(
						'TWO_NPA_ON_LU',
						false,
						Number(questionInFocus.publishedQuestionId),
					);
				}
			}
		};
		if (currentRoundQuestionListData?.id && questionInFocus?.id && answerData) {
			putCurrentRoundRes();
		}
	}, [answerData]);

	const handleReturnHome = () => {
		navigate('/app/learning');
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
						questionData={questionData}
						currentRoundQuestionListData={currentRoundQuestionListData}
						currentQuestion={questionInFocus}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
					/>
					<HStack width="100%">
						<Stack
							w="100%"
							p="12px"
							alignItems="stretch"
							justifyContent={'center'}
							direction={['column', 'column', 'row', 'row', 'row', 'row']}>
							<Box
								backgroundColor="white"
								boxShadow="md"
								borderRadius={24}
								flex={1}
								p={'72px'}>
								<Question questionInFocus={questionInFocus} />
							</Box>
							<AnswerArea
								isOpen={isInstructionalOverlayOpen}
								onClose={onClose}
								smallerThan1000={isSmallerThan1000}
								initialFocusRef={initRef}
								showOverlay={showOverlay}
								questionInFocus={questionInFocus}
								selectedAnswers={selectedAnswers}
								selectedAnswersState={setSelectedAnswers}
								clearSelection={clearSelection}
								clearSelectionState={setClearSelection}
								currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
								onClick={continueBtnFunc}
								clearSelectionFunction={clearSelectionButtonFunc}
								IDKResponse={IDKResponse}
								setIDKResponse={setIDKResponse}
							/>
						</Stack>
						<ProgressMenu
							textPrompt={textPrompt}
							currentRoundQuestionListData={currentRoundQuestionListData}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						/>
					</HStack>
				</Container>
			) : (
				// @ts-ignore
				<ModuleOutro moduleData={questionData} action={handleReturnHome} />
			)}
		</>
	) : (
		<LoadingAssignmentView />
	);
}
