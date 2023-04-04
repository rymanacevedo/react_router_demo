import { useEffect, useRef, useState } from 'react';
import {
	Box,
	Button,
	Collapse,
	Container,
	HStack,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
	useMediaQuery,
	VStack,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import MultipleChoiceOverLay from '../../ui/MultipleChoiceOverLay';
import {
	AnswerData,
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	QuestionInFocus,
	SelectedAnswers,
} from '../AssignmentView/AssignmentTypes';
import { findQuestionInFocus } from '../AssignmentView/findQuestionInFocus';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import WhatYouNeedToKnowComponent from '../../ui/WhatYouNeedToKnowComponent';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import ExplanationTitle from '../../ui/ExplanationTitle';
import MultipleChoiceAnswers from '../../ui/MultipleChoiceAnswers';
import { findDateData } from '../../../utils/logic';

const AssignmentReviewView = () => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showExplanation, setShowExplanation] = useState(false);
	const [questionInFocus, setQuestionInFocus] = useState<QuestionInFocus>({
		id: '',
		questionRc: '',
		publishedQuestionId: '',
		reviewSeconds: 0,
		confidence: '',
		correctness: '',
		explanationRc: '',
		answerList: [{ answerRc: '', id: '' }],
	});
	const [tryAgain, setTryAgain] = useState(false);
	const [revealAnswer, setRevealAnswer] = useState(false);

	const [currentRoundQuestionListData, setCurrentRoundQuestionListData] =
		useState<CurrentRoundQuestionListData>();
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers[]>([]);
	const [currentRoundAnswerOverLayData, setCurrentRoundAnswerOverLayData] =
		useState<CurrentRoundAnswerOverLayData>({
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
		});
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
	const [answerSubmitted, setAnswerSubmitted] = useState(false);
	const [clearSelection, setClearSelection] = useState(false);
	const [viewCorrect, setViewCorrect] = useState(false);
	const [questionIndex, setQuestionIndex] = useState(0);
	const { assignmentKey } = useParams();
	const [localQuestionHistory, setLocalQuestionHistory] = useLocalStorage(
		`questionHistory${assignmentKey}`,
		null,
	);
	// eslint-disable-next-line
	const [localQuestionReviewHistory, setLocalQuestionReviewHistory] =
		useLocalStorage(
			`questionReviewHistory${assignmentKey}${questionInFocus?.id}`,
			null,
		);
	const [IDKResponse, setIDKResponse] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { fetchModuleQuestions } = useModuleContentService();
	const { getCurrentRound, putCurrentRound } = useCurrentRoundService();
	const [questionSecondsHistory, setQuestionSecondsHistory] = useState(0);
	const navigate = useNavigate();
	const intervalRef = useRef<ReturnType<typeof setInterval>>();
	const questionSecondsRef = useRef(0);
	const proceedDownDesiredPathRef = useRef(true);

	const putReviewInfo = async () => {
		let storedtime = 0;
		if (questionInFocus?.id) {
			const myObjectString = localStorage.getItem(
				`questionReviewHistory${assignmentKey}${questionInFocus?.id}`,
			);
			const myObject = JSON.parse(String(myObjectString));
			if (myObject?.localStorageQuestionReviewSeconds) {
				storedtime = myObject.localStorageQuestionReviewSeconds;
			}
		}

		await putCurrentRound(
			currentRoundQuestionListData?.id,
			questionInFocus?.id,
			{
				...answerData,
				answerDate: null,
				answerList: null,
				questionSeconds: questionSecondsHistory,
				reviewSeconds: Number(questionSecondsRef.current) + Number(storedtime),
			},
		);
	};

	const fetchModuleQuestionsData = async (firstRender?: boolean) => {
		try {
			let [currentRoundQuestionsResponse, moduleQuestionsResponse] = [
				await getCurrentRound(assignmentKey),
				await fetchModuleQuestions(assignmentKey),
			];

			if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
				if (firstRender) {
					setQuestionIndex(
						Number(
							currentRoundQuestionsResponse?.questionList.findIndex(
								(question: { reviewSeconds: number }) =>
									Number(question.reviewSeconds) === 0,
							),
						),
					);
				}

				const savedData = localQuestionHistory?.roundQuestionsHistory?.find(
					(questionHistory: { answeredQuestionId: number }) => {
						console.log(
							'***************',
							findQuestionInFocus(
								moduleQuestionsResponse,
								currentRoundQuestionsResponse,
								true,
								viewCorrect,
							),
							moduleQuestionsResponse,
							currentRoundQuestionsResponse,
						);
						return (
							questionHistory.answeredQuestionId ===
							findQuestionInFocus(
								moduleQuestionsResponse,
								currentRoundQuestionsResponse,
								true,
								viewCorrect,
							)[questionIndex].id
						);
					},
				);
				setQuestionSecondsHistory(savedData?.questionSeconds);
				setSelectedAnswers(savedData?.answersChosen);
				setCurrentRoundAnswerOverLayData((roundAnswerOverLayData) => {
					return {
						...roundAnswerOverLayData,
						correctAnswerIds: savedData?.correctAnswerIds,
					};
				});
				setQuestionData(moduleQuestionsResponse);
				setCurrentRoundQuestionListData(currentRoundQuestionsResponse);
				setQuestionInFocus(
					findQuestionInFocus(
						moduleQuestionsResponse,
						currentRoundQuestionsResponse,
						true,
						viewCorrect,
					)[questionIndex],
				);
			}
		} catch (error) {
			console.error(error);
		}
	};
	function handleBeforeUnload() {
		if (questionInFocus?.id) {
			setLocalQuestionReviewHistory({
				localStorageQuestionReviewSeconds: Number(questionSecondsRef.current),
			});
		}
	}
	useEffect(() => {
		// Clean up function to add the stored value when the component unmounts if user is not done with review
		return () => {
			if (proceedDownDesiredPathRef.current) {
				handleBeforeUnload();
			}
		};
	}, []);

	useEffect(() => {
		// Register a listener for the beforeunload event
		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			// Remove the listener
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [setLocalQuestionReviewHistory]);

	const numberOfQInReview = currentRoundQuestionListData?.questionList?.filter(
		(item: { confidence: string; correctness: string }) => {
			if (viewCorrect) {
				return item.confidence === 'Sure' && item.correctness === 'Correct';
			} else {
				return !(item.confidence === 'Sure' && item.correctness === 'Correct');
			}
		},
	).length;

	useEffect(() => {
		fetchModuleQuestionsData();
	}, [questionIndex]);

	useEffect(() => {
		setQuestionIndex(0);
		if (viewCorrect) {
			setShowExplanation(true);
			setAnswerData((answerDataArg: any) => {
				return {
					...answerDataArg,
					questionSeconds: questionSecondsHistory,
					reviewSeconds: questionSecondsRef.current,
				};
			});
		}
	}, [viewCorrect]);

	useEffect(() => {
		if (assignmentKey) {
			fetchModuleQuestionsData(true);
		}
	}, [assignmentKey]);
	const closeExplainModal = () => {
		onClose();
		setShowExplanation(true);
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
	useEffect(() => {
		startTimer();
	}, []);

	const submitAnswer = () => {
		setAnswerData((answerDataArg: any) => {
			return {
				...answerDataArg,
				answerDate: findDateData(),
				questionSeconds: questionSecondsHistory,
				answerList: [...selectedAnswers],
			};
		});
		questionSecondsRef.current = 0;
	};
	useEffect(() => {
		const putCurrentRoundRes = async () => {
			const overLayData = await putCurrentRound(
				currentRoundQuestionListData?.id,
				questionInFocus?.id,
				answerData,
			);
			if (overLayData) {
				setTryAgain(false);
				setCurrentRoundAnswerOverLayData(currentRoundAnswerOverLayData);
				setAnswerSubmitted(true);
			}
		};
		if (currentRoundQuestionListData?.id && questionInFocus?.id && answerData) {
			putCurrentRoundRes();
		}
	}, [answerData]);
	const incrementQuestion = () => {
		let count = questionIndex;
		count += 1;
		setQuestionIndex(count);
	};

	const decrementQuestion = () => {
		let count = questionIndex;
		count -= 1;
		setQuestionIndex(count);
	};

	const handleNextQuestionInReview = async () => {
		setRevealAnswer(false);
		setShowExplanation(viewCorrect ? true : false);
		setAnswerSubmitted(false);
		setTryAgain(false);
		incrementQuestion();
		fetchModuleQuestionsData();
		putReviewInfo();
		stopTimer();
		startTimer();
	};
	const handelKeepGoing = async () => {
		proceedDownDesiredPathRef.current = false;
		setAnswerData((answerDataArg: any) => {
			return {
				...answerDataArg,
				questionSeconds: questionSecondsHistory,
				reviewSeconds: questionSecondsRef.current,
			};
		});
		putReviewInfo();
		setLocalQuestionHistory(null);
		localStorage.removeItem(
			`questionReviewHistory${assignmentKey}${questionInFocus?.id}`,
		);
		navigate(`/app/learning/assignment/${assignmentKey}`);
	};
	const reviewButtonsConditionRender = () => {
		if (revealAnswer || questionInFocus?.correctness === 'Correct') {
			return;
		}

		if (tryAgain) {
			if (answerSubmitted === false && showExplanation) {
				return (
					<>
						<Button onClick={submitAnswer} variant={'ampSolid'} w="150px">
							<Text>{i18n('submitBtnText')}</Text>
						</Button>
					</>
				);
			}
		}
		if (viewCorrect) {
			return;
		} else if (tryAgain === false) {
			if (answerSubmitted) {
				return (
					<Button
						display={showExplanation ? '' : 'none'}
						onClick={() => {
							setRevealAnswer(true);
						}}
						variant={'ampOutline'}
						w="220px">
						<Text>{i18n('revealCorrectAns')}</Text>
					</Button>
				);
			} else {
				return (
					<>
						<Button
							display={
								showExplanation
									? questionInFocus?.confidence === 'OneAnswerPartSure' &&
									  questionInFocus?.correctness === 'Correct'
										? 'none'
										: ''
									: 'none'
							}
							onClick={() => {
								setTryAgain(true);
								setSelectedAnswers([]);
							}}
							variant={'ampOutline'}
							w="130px">
							<Text>{i18n('tryAgain')}</Text>
						</Button>
						<Button
							display={showExplanation ? '' : 'none'}
							onClick={() => {
								setRevealAnswer(true);
							}}
							variant={'ampOutline'}
							w="220px">
							<Text>{i18n('revealCorrectAns')}</Text>
						</Button>
					</>
				);
			}
		}
	};

	return (
		<main id="learning-assignment">
			<Container
				id={'learning-assignment'}
				margin="0"
				padding="0"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<TestProgressBarMenu
					questionData={questionData}
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={setIsMenuOpen}
					currentRoundQuestionListData={currentRoundQuestionListData}
					currentQuestion={questionInFocus}
					inReview={true}
					questionIndex={questionIndex}
				/>
				<ExplanationTitle
					answer={`${questionInFocus?.confidence}${questionInFocus?.correctness}`}
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
							boxShadow="xl"
							w="100%"
							h={isSmallerThan1000 ? '' : '745px'}
							overflow="hidden"
							borderRadius={24}
							p={'72px'}>
							<Question
								questionInFocus={questionInFocus}
								review={true}
								numberOfQInReview={numberOfQInReview}
								questionIndex={questionIndex + 1}
							/>
						</Box>
						<Box
							style={{
								backgroundColor: 'white',
								margin: '6px',
								minHeight: '745px',
							}}
							boxShadow="xl"
							h={isSmallerThan1000 ? '' : '100%'}
							display={'flex'}
							flexDirection="column"
							w="100%"
							overflow="hidden"
							borderRadius={24}
							p={'72px'}>
							{tryAgain ? (
								<MultipleChoiceAnswers
									questionInFocus={questionInFocus}
									selectedAnswers={selectedAnswers}
									setSelectedAnswers={setSelectedAnswers}
									clearSelection={clearSelection}
									setClearSelection={setClearSelection}
									setIDKResponse={setIDKResponse}
									IDKResponse={IDKResponse}
								/>
							) : (
								<MultipleChoiceOverLay
									questionInFocus={questionInFocus}
									selectedAnswers={selectedAnswers}
									setSelectedAnswers={setSelectedAnswers}
									clearSelection={clearSelection}
									setClearSelection={setClearSelection}
									currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
									inReview={true}
									revealAnswer={revealAnswer}
								/>
							)}
							<HStack
								justifyContent={'space-between'}
								display={'flex'}
								marginTop={'12px'}>
								<Button
									display={showExplanation ? 'none' : ''}
									onClick={onOpen}
									variant={'ampSolid'}
									w="220px">
									<Text>{i18n('explainBtnText')}</Text>
								</Button>
								{reviewButtonsConditionRender()}
							</HStack>
						</Box>
					</HStack>
					<ProgressMenu
						isMenuOpen={isMenuOpen}
						currentRoundQuestionListData={currentRoundQuestionListData}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
					/>
				</HStack>
				<Collapse in={showExplanation} animateOpacity>
					<VStack
						p="12px"
						rounded="md"
						shadow="md"
						display={'flex'}
						justifyContent={'center'}
						w="100%">
						{showExplanation && !tryAgain && (
							<WhatYouNeedToKnowComponent questionInFocus={questionInFocus} />
						)}
						<Box
							style={{
								backgroundColor: 'white',
								marginTop: '24px',
								marginBottom: '24px',
							}}
							boxShadow="xl"
							w="100%"
							overflow="hidden"
							borderRadius={24}
							p={8}>
							<HStack padding={'0px 150px'} justifyContent={'space-between'}>
								<Button
									leftIcon={<ArrowLeftIcon />}
									variant={'ampOutline'}
									onClick={decrementQuestion}
									isDisabled={questionIndex === 0}>
									{i18n('prevQ')}
								</Button>
								<VStack>
									<Text marginBottom={'-10px'}>
										{i18n('reviewing')} {questionIndex + 1} {i18n('of')}{' '}
										{numberOfQInReview}
									</Text>
									{Boolean(Number(numberOfQInReview) === questionIndex + 1) &&
										numberOfQInReview &&
										numberOfQInReview <
											currentRoundQuestionListData?.questionList?.length &&
										!viewCorrect && (
											<Button
												onClick={() => {
													setViewCorrect((view) => {
														return !view;
													});
												}}
												variant={'ghost'}
												color={'ampPrimary'}>
												<Text color="ampSecondary.500">
													{i18n('reviewCorrectAns')}
												</Text>
											</Button>
										)}
								</VStack>
								{Number(numberOfQInReview) === questionIndex + 1 ? (
									<Button
										rightIcon={<ArrowRightIcon />}
										variant={'ampSolid'}
										onClick={handelKeepGoing}>
										{i18n('keepGoing')}
									</Button>
								) : (
									<Button
										rightIcon={<ArrowRightIcon />}
										variant={'ampSolid'}
										onClick={handleNextQuestionInReview}>
										{i18n('nextQ')}
									</Button>
								)}
							</HStack>
						</Box>
					</VStack>
				</Collapse>
			</Container>
			<Modal size={'5xl'} isOpen={isOpen} onClose={closeExplainModal}>
				<ModalOverlay />
				<ModalContent w="80vw" borderRadius={24}>
					<ModalCloseButton />
					<WhatYouNeedToKnowComponent
						questionInFocus={questionInFocus}
						onClick={closeExplainModal}
						isModal={true}
					/>
				</ModalContent>
			</Modal>
		</main>
	);
};

export default AssignmentReviewView;
