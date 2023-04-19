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
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';
import TestProgressBarMenu from '../TestProgressBarMenu';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import { findQuestionInFocus } from '../../pages/AssignmentView/findQuestionInFocus';
import { useNavigate } from 'react-router-dom';
import LoadingAssignmentView from '../loading/LoadingAssignmentView';
import {
	useQuizContext,
	SeenQuestionType,
} from '../../../hooks/useQuizContext';
import FireProgressToast from '../ProgressToast';
import ModuleOutro from '../../pages/ModuleOutro';
import { useProgressMenuContext } from '../../../hooks/useProgressMenuContext';

type Props = {
	isInstructionalOverlayOpen: boolean;
	onClose: () => void;
	initRef: any;
	assignmentKey: string | undefined;
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
	const { message, handleMessage, setSeenQuestions } = useQuizContext();
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
		id: '',
		questionRc: '',
		confidence: '',
		correctness: '',
		reviewSeconds: 0,
		publishedQuestionId: '',
		answerList: [{ answerRc: '', id: '' }],
	});

	const [currentRoundQuestionListData, setCurrentRoundQuestionListData] =
		useState<CurrentRoundQuestionListData>();

	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers[]>([]);
	const [currentRoundAnswerOverLayData, setCurrentRoundAnswerOverLayData] =
		useState<CurrentRoundAnswerOverLayData>(initState);
	const [showOverlay, setShowOverlay] = useState(false);
	const [questionData, setQuestionData] = useState({
		learningUnits: [{ questions: [] }],
		kind: '',
		name: '',
		outroLink: '',
		outroButtonText: '',
		introductionRc: '',
		outroRc: '',
	});

	const [localQuestionHistory, setLocalQuestionHistory] = useLocalStorage(
		`questionHistory${assignmentKey}`,
		null,
	);
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
			let [currentRoundQuestionsResponse, moduleQuestionsResponse] = [
				await getCurrentRound(assignmentKey),
				await fetchModuleQuestions(assignmentKey),
			];
			let revSkipRes = {} as CurrentRoundQuestionListData;

			if (currentRoundQuestionsResponse.roundPhase === 'REVIEW') {
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
						(question: { correctness: string }) =>
							question.correctness === 'Correct',
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
					setLocalQuestionHistory(null);
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
	}, []);

	useEffect(() => {
		setSeenQuestions(
			(seenQuestions: SeenQuestionType[]): SeenQuestionType[] => {
				return [
					...seenQuestions,
					{
						[questionInFocus.id]: {
							seenCount: 1,
							correctness: '',
							confidence: '',
							npaCount: 0,
							siCount: 0,
						},
					},
				];
			},
		);
	}, [questionInFocus]);

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
				} else if (
					overLayData.confidence === 'Sure' &&
					overLayData.correctness === 'Incorrect' &&
					message.FIVE_CONSEC_SI < 5
				) {
					setIsSureAndCorrectAllRound(false);
					handleMessage('FULL_ROUND_OF_SC', true);
					handleMessage('FIVE_CONSEC_SI', false);
				} else if (
					overLayData.confidence === 'NotSure' &&
					overLayData.correctness === 'NoAnswerSelected' &&
					message.SIX_DK_IN_ROUND < 6
				) {
					setIsSureAndCorrectAllRound(false);
					handleMessage('FULL_ROUND_OF_SC', true);
					handleMessage('SIX_DK_IN_ROUND', false);
				} else {
					handleMessage('FIVE_CONSEC_SC', true);
					handleMessage('FIVE_FAST_ANSWERS', true);
					handleMessage('FIVE_CONSEC_SI', true);
					handleMessage('SIX_DK_IN_ROUND', true);
					handleMessage('FULL_ROUND_OF_SC', true);
					setIsSureAndCorrectAllRound(false);
				}

				let updatedLocalQuestionHistory = localQuestionHistory
					?.roundQuestionsHistory.length
					? {
							currentRoundId: currentRoundQuestionListData?.id,
							roundQuestionsHistory: [
								...localQuestionHistory?.roundQuestionsHistory,
								{
									answeredQuestionId: questionInFocus.id,
									answersChosen: [...answerData.answerList],
									correctAnswerIds: [...overLayData.correctAnswerIds],
									questionSeconds: answerData.questionSeconds,
								},
							],
					  }
					: {
							currentRoundId: currentRoundQuestionListData?.id,
							roundQuestionsHistory: [
								{
									answeredQuestionId: questionInFocus.id,
									answersChosen: [...answerData.answerList],
									correctAnswerIds: [...overLayData.correctAnswerIds],
									questionSeconds: answerData.questionSeconds,
								},
							],
					  };

				setLocalQuestionHistory(updatedLocalQuestionHistory);
				setCurrentRoundAnswerOverLayData(overLayData);
				setShowOverlay(true);
				questionSecondsRef.current = 0;
				stopTimer();
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
