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
import { useParams } from 'react-router-dom';
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
import { ArrowRightIcon } from '@radix-ui/react-icons';
import ExplanationTitle from '../../ui/ExplanationTitle';
import MultipleChoiceAnswers from '../../ui/MultipleChoiceAnswers';
import { findDateData } from '../../../utils/logic';

// when page load put the round objects in local storage question list already merged
// then run find question infocus baised off of the local storage version
// when the next question button is clicked clear the question infocus
// update local storage objects that this question was viewed 
// update findQuestionInfocus to account for review, and if in review use new functionality
// new logic then sets next question infocus that has not been reviewed 
// then have next and back slide up the question array untill all have been viewed.

const AssignmentView = () => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showExplanation, setShowExplanation] = useState(false);
	const [questionInFocus, setQuestionInFocus] = useState<QuestionInFocus>({
		id: '',
		questionRc: '',
		publishedQuestionId: '',
		confidence: '',
		correctness: '',
		explanationRc: '',
		answerList: [{ answerRc: '', id: '' }],
	});
	const [tryAgain, setTryAgain] = useState(false);

	// eslint-disable-next-line
	const [localQuestionHistory, setLocalQuestionHistory] = useLocalStorage(
		'questionHistory',
		null,
	);

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
	const [questionIndex, setQuestionIndex] = useState(0);
	const { assignmentKey } = useParams();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { fetchModuleQuestions } = useModuleContentService();
	const { getCurrentRound, putCurrentRound } = useCurrentRoundService();
	const questionSecondsRef = useRef(0);

	const fetchModuleQuestionsData = async () => {
		try {
			let [currentRoundQuestionsResponse, moduleQuestionsResponse] = [
				await getCurrentRound(assignmentKey),
				await fetchModuleQuestions(assignmentKey),
			];

			if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
				const savedData = localQuestionHistory?.roundQuestionsHistory?.find(
					(questionHistory: { answeredQuestionId: number }) => {
						return (
							questionHistory.answeredQuestionId ===
							findQuestionInFocus(
								moduleQuestionsResponse,
								currentRoundQuestionsResponse,
								true,
								questionIndex,
							).id
						);
					},
				);
				setSelectedAnswers(savedData.answersChosen);
				setCurrentRoundAnswerOverLayData((roundAnswerOverLayData) => {
					return {
						...roundAnswerOverLayData,
						correctAnswerIds: [...savedData.correctAnswerIds],
					};
				});
				setQuestionData(moduleQuestionsResponse);
				setCurrentRoundQuestionListData(currentRoundQuestionsResponse);
				setQuestionInFocus(
					findQuestionInFocus(
						moduleQuestionsResponse,
						currentRoundQuestionsResponse,
						true,
						questionIndex,
					),
				);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchModuleQuestionsData();
	}, [questionIndex]);

	useEffect(() => {
		if (assignmentKey) {
			fetchModuleQuestionsData();
		}
	}, [assignmentKey]);
	const closeExplainModal = () => {
		onClose();
		setShowExplanation(true);
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
		questionSecondsRef.current = 0;
	};
	useEffect(() => {
		const putCurrentRoundRes = async () => {
			const overLayData = await putCurrentRound(
				currentRoundQuestionListData?.id,
				questionInFocus.id,
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
				/>
				<ExplanationTitle
					answer={`${questionInFocus.confidence}${questionInFocus.correctness}`}
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
								currentRoundQuestionListData={currentRoundQuestionListData}
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
								{tryAgain ? (
									<Button onClick={submitAnswer} variant={'ampSolid'} w="150px">
										<Text>{i18n('submitBtnText')}</Text>
									</Button>
								) : (
									!answerSubmitted && (
										<Button
											display={
												showExplanation
													? questionInFocus.confidence ===
															'OneAnswerPartSure' &&
													  questionInFocus.correctness === 'Correct'
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
									)
								)}
								{!tryAgain && (
									<Button
										display={showExplanation ? '' : 'none'}
										onClick={() => {}}
										variant={'ampOutline'}
										w="220px">
										<Text>{i18n('revealCorrectAns')}</Text>
									</Button>
								)}
							</HStack>
						</Box>
					</HStack>
					<ProgressMenu
						isMenuOpen={isMenuOpen}
						currentRoundQuestionListData={currentRoundQuestionListData}
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
								<Button variant={'ampOutline'} onClick={decrementQuestion}>
									Previous
								</Button>
								<Text>
									Reviewing {questionIndex + 1} of{' '}
									{currentRoundQuestionListData?.questionList?.length}
								</Text>
								<Button
									rightIcon={<ArrowRightIcon />}
									variant={'ampSolid'}
									onClick={() => {
										setShowExplanation(false);
										setAnswerSubmitted(false);
										setTryAgain(false);
										incrementQuestion();
										fetchModuleQuestionsData();
									}}>
									Next Question{' '}
								</Button>
							</HStack>
						</Box>
					</VStack>
				</Collapse>
			</Container>
			<Modal
				size={'5xl'}
				isOpen={isOpen}
				onClose={closeExplainModal}>
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

export default AssignmentView;
