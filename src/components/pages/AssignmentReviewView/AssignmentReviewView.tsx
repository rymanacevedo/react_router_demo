import { useEffect, useRef, useState } from 'react';
import {
	Box,
	Button,
	Collapse,
	Container,
	Divider,
	Fade,
	HStack,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	ResponsiveValue,
	Stack,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';
import { useTranslation } from 'react-i18next';
import { json, useLoaderData, useNavigate } from 'react-router-dom';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import MultipleChoiceOverLay from '../../ui/MultipleChoiceAnswerInput/MultipleChoiceFeedBack';
import {
	AnswerData,
	Confidence,
	Correctness,
	CurrentRoundAnswerOverLayData,
	SelectedAnswer,
} from '../AssignmentView/AssignmentTypes';
import { findQuestionInFocus } from '../AssignmentView/findQuestionInFocus';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import WhatYouNeedToKnowComponent from '../../ui/WhatYouNeedToKnowComponent';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import ExplanationTitle from '../../ui/ExplanationTitle';
import MultipleChoiceAnswers from '../../ui/MultipleChoiceAnswerInput/MultipleChoiceAnswers';
import { findDateData } from '../../../utils/logic';
import LoadingAssignmentView from '../../ui/loading/LoadingAssignmentView';
import { useQuizContext } from '../../../hooks/useQuizContext';
import FireProgressToast from '../../ui/ProgressToast';
import { useProgressMenuContext } from '../../../hooks/useProgressMenuContext';
import { findRoundAnswersData } from '../AssignmentView/findRoundAnswersData';
import { LoaderFunction } from 'react-router';
import { ModuleData, QuestionInFocus, RoundData } from '../../../lib/validator';
import AmpBox from '../../standard/container/AmpBox';
import useEffectOnce from '../../../hooks/useEffectOnce';

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

export const assignmentReviewLoader: LoaderFunction = ({ params }) => {
	return json(params);
};

const AssignmentReviewView = () => {
	const { handleMenuOpen } = useProgressMenuContext();
	const { selectedCourseKey } = useQuizContext();
	const { assignmentKey } = useLoaderData() as any;
	const {
		message,
		handleMessage,
		moduleLearningUnitsData,
		updateModuleLearningUnitsData,
	} = useQuizContext();
	const { t: i18n } = useTranslation();
	const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
	const [textPrompt, setTextPrompt] = useState<string>('');
	const [showExplanation, setShowExplanation] = useState(false);
	const [questionInFocus, setQuestionInFocus] = useState<QuestionInFocus>({
		answered: false,
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
		confidence: null,
		correctness: null,
		answerList: [
			{
				answerRc: '',
				displayOrder: 0,
				id: 0,
				isCorrect: false,
				optionRc: null,
				publishedAnswerId: '',
				publishedAnswerUri: '',
				publishedOptionId: null,
				publishedOptionUri: null,
				publishedQuestionUri: 'string',
				questionId: 0,
				questionVersionId: 0,
				selected: false,
				selectedOptionId: null,
				selectedOptionUri: null,
				self: '',
				uid: '',
				versionId: 0,
			},
		],
	});
	const [tryAgain, setTryAgain] = useState(false);
	const [revealAnswer, setRevealAnswer] = useState(false);

	const [currentRoundQuestionListData, setCurrentRoundQuestionListData] =
		useState<RoundData>();
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
	const [currentRoundAnswerOverLayData, setCurrentRoundAnswerOverLayData] =
		useState<CurrentRoundAnswerOverLayData>(initState);
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
	const [lastRevQData, setLastRevQData] = useState({
		roundId: 0,
		questionId: 0,
		payload: {
			answerDate: null,
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
		},
	});
	const [storedTime, setStoredtime] = useState(0);
	const [, setLocalQuestionReviewHistory] = useLocalStorage(
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

	const putReviewInfo = async (lastRevQDataArg?: {
		roundId?: number;
		questionId?: number;
		payload?: any;
	}) => {
		if (lastRevQDataArg?.roundId) {
			await putCurrentRound(
				lastRevQDataArg?.roundId,
				lastRevQDataArg?.questionId,
				lastRevQDataArg?.payload,
			);
		} else {
			await putCurrentRound(
				currentRoundQuestionListData?.id,
				questionInFocus?.id,
				{
					...answerData,
					answerDate: null,
					answerList: null,
					questionSeconds: questionSecondsHistory,
					reviewSeconds:
						Number(questionSecondsRef.current) + Number(storedTime),
				},
			);
		}
	};

	const fetchModuleQuestionsData = async (firstRender?: boolean) => {
		try {
			let currentRoundQuestionsResponse = await getCurrentRound(assignmentKey);
			let moduleQuestionsResponse: ModuleData;
			if (moduleLearningUnitsData.assignmentKey === assignmentKey) {
				moduleQuestionsResponse = moduleLearningUnitsData.data as ModuleData;
			} else {
				let res = await fetchModuleQuestions(assignmentKey);
				moduleQuestionsResponse = res;
				updateModuleLearningUnitsData(res, assignmentKey as string);
			}

			if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
				if (firstRender) {
					setQuestionIndex(
						Number(
							currentRoundQuestionsResponse?.questionList
								.filter((q: QuestionInFocus) => {
									return !(
										q.confidence === Confidence.Sure &&
										q.correctness === Correctness.Correct
									);
								})
								.findIndex((question: QuestionInFocus) => {
									return (
										Number(question.reviewSeconds) === 0 &&
										!(
											question.confidence === Confidence.Sure &&
											question.correctness === Correctness.Correct
										)
									);
								}),
						),
					);
				}
				let foundQuestionInFocus: QuestionInFocus = findQuestionInFocus(
					moduleQuestionsResponse,
					currentRoundQuestionsResponse,
					true,
					viewCorrect,
					questionIndex,
				);
				setQuestionSecondsHistory(foundQuestionInFocus?.quizSeconds);

				setSelectedAnswers(findRoundAnswersData(foundQuestionInFocus));
				setCurrentRoundAnswerOverLayData((prevState) => {
					return {
						...prevState,
						correctAnswerIds: findRoundAnswersData(foundQuestionInFocus, true),
					};
				});
				setQuestionData(moduleQuestionsResponse);
				setCurrentRoundQuestionListData(currentRoundQuestionsResponse);
				setQuestionInFocus(foundQuestionInFocus);

				if (
					message.TWO_FAST_REVIEWS_IN_LU.filter((item) => {
						return (
							item.questionId === foundQuestionInFocus?.publishedQuestionId
						);
					})[0]?.fastReviewsOnQuestion >= 1
				) {
					setIsToastOpen(true);
					setTextPrompt('TWO_FAST_REVIEWS_IN_LU');
					handleMessage(
						'TWO_FAST_REVIEWS_IN_LU',
						true,
						Number(questionInFocus?.publishedQuestionId),
					);
				}

				if (questionInFocus?.id) {
					const myObjectString = localStorage.getItem(
						`questionReviewHistory${assignmentKey}${questionInFocus?.id}`,
					);
					const myObject = JSON.parse(String(myObjectString));
					if (myObject?.localStorageQuestionReviewSeconds) {
						setStoredtime(myObject.localStorageQuestionReviewSecond);
					}
				}
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
		// Register a listener for the beforeunload event
		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			// Remove the listener
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [setLocalQuestionReviewHistory]);

	const numberOfQInReview = currentRoundQuestionListData?.questionList?.filter(
		(q: QuestionInFocus) => {
			if (viewCorrect) {
				return (
					q.confidence === Confidence.Sure &&
					q.correctness === Correctness.Correct
				);
			} else {
				return !(
					q.confidence === Confidence.Sure &&
					q.correctness === Correctness.Correct
				);
			}
		},
	)?.length;

	useEffect(() => {
		fetchModuleQuestionsData();
	}, [questionIndex, viewCorrect]);

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

	useEffectOnce(() => {
		startTimer();

		// Clean up function to add the stored value when the component unmounts if user is not done with review
		return () => {
			if (proceedDownDesiredPathRef.current) {
				handleBeforeUnload();
			}
		};
	});

	useEffect(() => {
		if (
			message.TWO_FAST_REVIEWS_IN_LU.filter((item) => {
				return item.questionId === questionInFocus?.publishedQuestionId;
			})[0]?.fastReviewsOnQuestion >= 1
		) {
			setIsToastOpen(true);
			setTextPrompt('TWO_FAST_REVIEWS_IN_LU');
			handleMessage(
				'TWO_FAST_REVIEWS_IN_LU',
				true,
				Number(questionInFocus?.publishedQuestionId),
			);
		}
	}, [questionInFocus]);

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

		if (message.FIVE_CONSEC_SC > 0) {
			handleMessage('FIVE_CONSEC_SC', true);
			handleMessage('FULL_ROUND_OF_SC', true);
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
		if (questionSecondsRef.current <= 7) {
			handleMessage(
				'TWO_FAST_REVIEWS_IN_LU',
				false,
				Number(questionInFocus?.publishedQuestionId),
			);
		}

		if (questionSecondsRef.current <= 7 && message.FIVE_FAST_REVIEWS < 5) {
			handleMessage('FIVE_FAST_REVIEWS', false);
		} else {
			handleMessage('FIVE_FAST_REVIEWS', true);
		}
		if (questionSecondsRef.current >= 12) {
			handleMessage('TEN_LONG_REVIEWS', false);
		}

		if (isToastOpen) {
			setIsToastOpen(false);
		}

		setRevealAnswer(false);
		setShowExplanation(viewCorrect);
		setAnswerSubmitted(false);
		setTryAgain(false);
		incrementQuestion();
		await fetchModuleQuestionsData();
		await putReviewInfo();
		stopTimer();
		startTimer();
	};
	const handleReviewCorrect = () => {
		setLastRevQData({
			roundId: Number(currentRoundQuestionListData?.id),
			questionId: Number(questionInFocus?.id),
			payload: {
				...answerData,
				answerDate: null,
				// @ts-ignore
				answerList: null,
				questionSeconds: questionSecondsHistory,
				reviewSeconds: Number(questionSecondsRef.current) + Number(storedTime),
			},
		});
		setViewCorrect((view) => {
			return !view;
		});
	};
	const handleKeepGoing = async (lastRevQDataArg?: { roundId: number }) => {
		proceedDownDesiredPathRef.current = false;
		if (questionSecondsRef.current <= 7) {
			handleMessage(
				'TWO_FAST_REVIEWS_IN_LU',
				false,
				Number(questionInFocus?.publishedQuestionId),
			);
		}
		setAnswerData((answerDataArg: any) => {
			return {
				...answerDataArg,
				questionSeconds: questionSecondsHistory,
				reviewSeconds: questionSecondsRef.current,
			};
		});
		if (lastRevQDataArg?.roundId) {
			await putReviewInfo(lastRevQDataArg);
		} else {
			await putReviewInfo();
		}

		localStorage.removeItem(
			`questionReviewHistory${assignmentKey}${questionInFocus?.id}`,
		);
		navigate(`/learning/assignment/${assignmentKey}`);
	};

	const handleProgress = async () => {
		if (viewCorrect) {
			await handleKeepGoing(lastRevQData);
		} else {
			await handleKeepGoing();
		}
	};

	const expandProgressMenu = () => {
		setIsToastOpen(false);
		handleMenuOpen();
	};

	useEffect(() => {
		if (message.FIVE_FAST_REVIEWS === 5) {
			setIsToastOpen(true);
			setTextPrompt('FIVE_FAST_REVIEWS');
			handleMessage('FIVE_FAST_REVIEWS', true);
		}
	}, [message.FIVE_FAST_REVIEWS]);

	useEffect(() => {
		if (message.TEN_LONG_REVIEWS === 10) {
			setIsToastOpen(true);
			setTextPrompt('TEN_LONG_REVIEWS');
			handleMessage('TEN_LONG_REVIEWS', true);
		}
	}, [message.TEN_LONG_REVIEWS]);

	const showTryAgainButton = (): ResponsiveValue<string> | undefined => {
		if (showExplanation && questionInFocus) {
			if (
				questionInFocus.confidence === Confidence.OneAnswerPartSure &&
				questionInFocus.correctness === Correctness.Correct
			) {
				return 'none';
			} else {
				return '';
			}
		}
		return 'none';
	};

	const reviewButtonsConditionRender = () => {
		if (revealAnswer || questionInFocus?.correctness === 'Correct') {
			return;
		}

		if (tryAgain) {
			if (!answerSubmitted && showExplanation) {
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
		} else if (!tryAgain) {
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
							display={showTryAgainButton()}
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
			{currentRoundQuestionListData ? (
				<Container
					id={'learning-assignment'}
					margin="0"
					padding="0"
					maxWidth={'100vw'}
					overflowY={'hidden'}
					overflowX={'hidden'}
					bgColor="ampNeutral.200">
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
						inReview={true}
						questionIndex={questionIndex}
						viewCorrect={viewCorrect}
					/>
					<ExplanationTitle
						answer={`${questionInFocus?.confidence}${questionInFocus?.correctness}`}
					/>
					<HStack
						justify="center"
						align="space-between"
						bgColor="ampNeutral.200">
						<Stack
							maxW="1496px"
							w="100%"
							p={3}
							pr={0}
							alignItems="stretch"
							direction={['column', 'column', 'row', 'row', 'row', 'row']}
							spacing={6}
							mr={6}>
							<AmpBox>
								<Question
									questionInFocus={questionInFocus}
									review={true}
									numberOfQInReview={numberOfQInReview}
									questionIndex={questionIndex + 1}
								/>
							</AmpBox>
							<AmpBox>
								{tryAgain ? (
									<Fade in={true}>
										<MultipleChoiceAnswers
											questionInFocus={questionInFocus}
											selectedAnswers={selectedAnswers}
											setSelectedAnswers={setSelectedAnswers}
											clearSelection={clearSelection}
											setClearSelection={setClearSelection}
											setIDKResponse={setIDKResponse}
											IDKResponse={IDKResponse}
										/>
									</Fade>
								) : (
									<Fade in={true}>
										<MultipleChoiceOverLay
											questionInFocus={questionInFocus}
											selectedAnswers={selectedAnswers}
											setSelectedAnswers={setSelectedAnswers}
											clearSelection={clearSelection}
											setClearSelection={setClearSelection}
											currentRoundAnswerOverLayData={
												currentRoundAnswerOverLayData
											}
											inReview={true}
											revealAnswer={revealAnswer}
										/>
									</Fade>
								)}
								<Divider marginTop="43px" />
								<HStack
									justifyContent={'space-between'}
									display={'flex'}
									marginTop={3}>
									<Button
										display={showExplanation ? 'none' : ''}
										onClick={onOpen}
										variant={'ampSolid'}
										w="220px">
										<Text>{i18n('explainBtnText')}</Text>
									</Button>
									{reviewButtonsConditionRender()}
								</HStack>
							</AmpBox>
						</Stack>
						<ProgressMenu
							textPrompt={textPrompt}
							currentRoundQuestionListData={currentRoundQuestionListData}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						/>
					</HStack>
					<HStack justify="center" align="space-between">
						<Stack
							maxW="1496px"
							w="100%"
							p={3}
							pr="0px"
							mr={6}
							alignItems="stretch">
							<Box
								as={Collapse}
								width="100%"
								in={showExplanation}
								animateOpacity>
								<VStack rounded="md" spacing={6} maxW="1496px" w="100%" pb={3}>
									{showExplanation && !tryAgain && (
										<WhatYouNeedToKnowComponent
											assignmentKey={assignmentKey}
											courseKey={selectedCourseKey}
											questionInFocus={questionInFocus}
										/>
									)}
									<Box
										bgColor="ampWhite"
										overflow="hidden"
										borderRadius={24}
										p={8}
										w="100%"
										boxShadow="md">
										<HStack
											padding={'0px 150px'}
											justifyContent={'space-between'}>
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
												{Boolean(
													Number(numberOfQInReview) === questionIndex + 1,
												) &&
													numberOfQInReview &&
													numberOfQInReview <
														currentRoundQuestionListData?.questionList
															?.length &&
													!viewCorrect && (
														<Button
															onClick={handleReviewCorrect}
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
													onClick={handleProgress}>
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
							</Box>
						</Stack>
					</HStack>
				</Container>
			) : (
				<LoadingAssignmentView />
			)}
			<Modal size={'5xl'} isOpen={isOpen} onClose={closeExplainModal}>
				<ModalOverlay />
				<ModalContent w="80vw" borderRadius={24}>
					<ModalCloseButton />
					<WhatYouNeedToKnowComponent
						assignmentKey={assignmentKey}
						courseKey={selectedCourseKey}
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
