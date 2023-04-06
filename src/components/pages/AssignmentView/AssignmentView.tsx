import { useEffect, useRef, useState, useContext } from 'react';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie-consent';
import AssignmentComponent from '../../ui/Assignment/AssignmentComponent';

const AssignmentView = () => {
	const { message, handleMessage } = useContext(QuizContext);
	const [isCorrectAndSure, setIsCorrectAndSure] = useState<boolean>(false);
	const [textPrompt, setTextPrompt] = useState<string>('');
	const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isInstructionalOverlayOpen, setIsInstructionalOverlayOpen] = useState(
		!Cookies.get('instructional_overlay'),
	);
	const [hasNotSeenTour] = useState(!Cookies.get('seen_tour'));
	const initRef = useRef(null);
	const { assignmentKey } = useParams();
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

	const continueBtnFunc = () => {
		setIsToastOpen(false);
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
			handleMessage('FIVE_CONSEC_SC', true);
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
		if (hasNotSeenTour) {
			navigate('tour');
		}
	}, []);

	const expandProgressMenu = () => {
		setIsToastOpen(false);
		setIsMenuOpen(true);
	};

	return (
		<main id="learning-assignment">
			<Modal isOpen={isInstructionalOverlayOpen} onClose={onClose}>
				<ModalOverlay />
			</Modal>
			<AssignmentComponent
				assignmentKey={assignmentKey}
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				isInstructionalOverlayOpen={isInstructionalOverlayOpen}
				onClose={onClose}
				initRef={initRef}
			/>
		</main>
	);
};

export default AssignmentView;
