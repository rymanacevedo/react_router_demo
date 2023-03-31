import { useEffect, useRef, useState, useContext } from 'react';
import {
	Box,
	Container,
	HStack,
	Modal,
	ModalOverlay,
	useMediaQuery,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';
import { useNavigate, useParams } from 'react-router-dom';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import {
	AnswerData,
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	QuestionInFocus,
	SelectedAnswers,
} from './AssignmentTypes';
import { findQuestionInFocus } from './findQuestionInFocus';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { findDateData } from '../../../utils/logic';
import { Cookies } from 'react-cookie-consent';
import AnswerArea from '../../ui/AnswerInput/AnswerArea';
import QuizContext from './QuizContext';
import FireProgressToast from '../../ui/ProgressToast';

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

const AssignmentView = () => {
	const { message, handleMessage } = useContext(QuizContext);
	const [textPrompt, setTextPrompt] = useState<string>('');
	const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isInstructionalOverlayOpen, setIsInstructionalOverlayOpen] = useState(
		!Cookies.get('instructional_overlay'),
	);
	const initRef = useRef(null);
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
	});
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
	const { assignmentKey } = useParams();
	const [localQuestionHistory, setLocalQuestionHistory] = useLocalStorage(
		`questionHistory${assignmentKey}`,
		null,
	);
	const [IDKResponse, setIDKResponse] = useState(false);

	const { fetchModuleQuestions } = useModuleContentService();
	const { getCurrentRound, putCurrentRound } = useCurrentRoundService();
	const navigate = useNavigate();
	const intervalRef = useRef<ReturnType<typeof setInterval>>();
	const questionSecondsRef = useRef(0);

	const fetchModuleQuestionsData = async () => {
		try {
			let [currentRoundQuestionsResponse, moduleQuestionsResponse] = [
				await getCurrentRound(assignmentKey),
				await fetchModuleQuestions(assignmentKey),
			];

			if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
				if (currentRoundQuestionsResponse.roundPhase === 'QUIZ') {
					setQuestionData(moduleQuestionsResponse);
					setCurrentRoundQuestionListData(currentRoundQuestionsResponse);
					setQuestionInFocus(
						findQuestionInFocus(
							moduleQuestionsResponse,
							currentRoundQuestionsResponse,
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
	const submitAnswer = () => {
		setAnswerData((answerDataArg: any) => {
			return {
				...answerDataArg,
				answerDate: findDateData(),
				questionSeconds: questionSecondsRef.current,
				answerList: [...selectedAnswers],
			};
		});

		if (questionSecondsRef.current <= 5) {
			if (message.FIVE_FAST_ANSWERS < 5) {
				handleMessage('FIVE_FAST_ANSWERS', false);
			}
		} else {
			handleMessage('FIVE_FAST_ANSWERS', true);
		}

		questionSecondsRef.current = 0;
		stopTimer();
	};

	const clearSelectionButtonFunc = () => {
		setSelectedAnswers([]);
		setClearSelection(true);
		setIDKResponse(false);
	};

	const getNextTask = () => {
		setIsToastOpen(false);
		clearSelectionButtonFunc();
		setShowOverlay(false);
		fetchModuleQuestionsData();
		setCurrentRoundAnswerOverLayData(initState);
		startTimer();
	};

	useEffect(() => {
		startTimer();
	}, []);
	useEffect(() => {
		if (assignmentKey) {
			fetchModuleQuestionsData();
		}
	}, [assignmentKey]);

	useEffect(() => {
		const putCurrentRoundRes = async () => {
			const overLayData = await putCurrentRound(
				currentRoundQuestionListData?.id,
				questionInFocus.id,
				answerData,
			);

			if (overLayData) {
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
			}
		};
		if (currentRoundQuestionListData?.id && questionInFocus?.id && answerData) {
			putCurrentRoundRes();
		}
	}, [answerData]);

	const continueBtnFunc = () => {
		if (showOverlay) {
			getNextTask();
		} else {
			submitAnswer();
		}
	};

	const onClose = () => {
		setIsInstructionalOverlayOpen(false);
		Cookies.set('instructional_overlay', window.btoa('instructional_overlay'), {
			path: '/',
		});
	};

	useEffect(() => {
		const courseHomeElement = Array.from(
			document.getElementsByTagName('p'),
		).find((p) => p.innerText === 'Course Home');

		const handleClick = () => {
			handleMessage('FIVE_FAST_ANSWERS', true);
		};

		if (courseHomeElement) {
			courseHomeElement.addEventListener('click', handleClick);
		}

		return () => {
			if (courseHomeElement) {
				courseHomeElement.removeEventListener('click', handleClick);
			}
		};
	}, []);

	useEffect(() => {
		if (message.FIVE_FAST_ANSWERS === 5) {
			setIsToastOpen(true);
			setTextPrompt('FIVE_FAST_ANSWERS');
			handleMessage('FIVE_FAST_ANSWERS', true);
		}
	}, [message.FIVE_FAST_ANSWERS]);

	return (
		<main id="learning-assignment">
			<Modal isOpen={isInstructionalOverlayOpen} onClose={onClose}>
				<ModalOverlay />
			</Modal>
			<Container
				id={'learning-assignment'}
				margin="0"
				padding="0"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<FireProgressToast isToastOpen={isToastOpen} textPrompt={textPrompt} />
				<TestProgressBarMenu
					questionData={questionData}
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={setIsMenuOpen}
					currentRoundQuestionListData={currentRoundQuestionListData}
					currentQuestion={questionInFocus}
					currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
				/>{' '}
				<HStack width="100%">
					<HStack
						w="100%"
						p="12px"
						justifyContent={'center'}
						flexWrap={isSmallerThan1000 ? 'wrap' : 'nowrap'}>
						<Box
							style={{
								backgroundColor: 'white',
								margin: '6px',
							}}
							boxShadow="2xl"
							w="100%"
							maxWidth={726}
							h={isSmallerThan1000 ? '' : '745px'}
							overflow="hidden"
							borderRadius={24}
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
					</HStack>
					<ProgressMenu
						isMenuOpen={isMenuOpen}
						currentRoundQuestionListData={currentRoundQuestionListData}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
					/>
				</HStack>
			</Container>
		</main>
	);
};

export default AssignmentView;
