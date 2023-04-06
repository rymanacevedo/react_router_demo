import { Box, Container, HStack, useMediaQuery } from '@chakra-ui/react';
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
import { useQuizContext } from '../../../hooks/useQuizContext';
import FireProgressToast from '../ProgressToast';

type Props = {
	isMenuOpen: boolean;
	setIsMenuOpen: (isMenuOpen: boolean) => void;
	isToastOpen: boolean;
	setIsToastOpen: (isToastOpen: boolean) => void;
	expandProgressMenu: () => void;
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
	isMenuOpen,
	setIsMenuOpen,
	isToastOpen,
	setIsToastOpen,
	expandProgressMenu,
	isInstructionalOverlayOpen,
	onClose,
	initRef,
	assignmentKey,
}: Props) {
	const navigate = useNavigate();
	const { message, handleMessage } = useQuizContext();
	const [isCorrectAndSure, setIsCorrectAndSure] = useState<boolean>(false);
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
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
	const { getCurrentRound, putCurrentRound } = useCurrentRoundService();
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
	});

	const [localQuestionHistory, setLocalQuestionHistory] = useLocalStorage(
		`questionHistory${assignmentKey}`,
		null,
	);
	const [IDKResponse, setIDKResponse] = useState(false);
	const intervalRef = useRef<ReturnType<typeof setInterval>>();
	const questionSecondsRef = useRef(0);

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

			if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
				if (currentRoundQuestionsResponse.roundPhase === 'QUIZ') {
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

	const submitAnswer = () => {
		if (
			currentRoundAnswerOverLayData.confidence === 'Sure' &&
			currentRoundAnswerOverLayData.correctness === 'Correct' &&
			message.FIVE_CONSEC_SC < 5
		) {
			setIsCorrectAndSure(true);
			handleMessage('FIVE_CONSEC_SC', false);
		} else {
			setIsCorrectAndSure(false);
			handleMessage('FIVE_CONSEC_SC', true);
		}
		if (questionSecondsRef.current <= 5 && isCorrectAndSure === false) {
			if (message.FIVE_FAST_ANSWERS < 5) {
				handleMessage('FIVE_FAST_ANSWERS', false);
			}
		} else {
			handleMessage('FIVE_FAST_ANSWERS', true);
		}

		questionSecondsRef.current = 0;
		stopTimer();

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
			getNextTask();
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
					overLayData.correctness === 'Correct' &&
					message.FIVE_CONSEC_SC < 5
				) {
					setIsCorrectAndSure(true);
					handleMessage('FIVE_CONSEC_SC', false);
				} else {
					setIsCorrectAndSure(false);
					handleMessage('FIVE_CONSEC_SC', true);
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
			}
		};
		if (currentRoundQuestionListData?.id && questionInFocus?.id && answerData) {
			putCurrentRoundRes();
		}
	}, [answerData]);

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
		if (assignmentKey) {
			fetchModuleQuestionsData();
		}
	}, [assignmentKey]);

	return currentRoundQuestionListData ? (
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
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				currentRoundQuestionListData={currentRoundQuestionListData}
				currentQuestion={questionInFocus}
				currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
			/>
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
	) : (
		<LoadingAssignmentView />
	);
}
