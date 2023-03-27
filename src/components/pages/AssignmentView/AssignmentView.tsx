import { useEffect, useRef, useState } from 'react';
import {
	Box,
	Button,
	Container,
	Fade,
	Heading,
	HStack,
	Modal,
	ModalOverlay,
	Popover,
	PopoverAnchor,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import MultipleChoiceAnswers from '../../ui/MultipleChoiceAnswers';
import MultipleChoiceOverLay from '../../ui/MultipleChoiceOverLay';
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

const AssignmentView = () => {
	const { t: i18n } = useTranslation();
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
		publishedQuestionId: '',
		answerList: [{ answerRc: '', id: '' }],
	});
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
	const [showoverLay, setShowOverLay] = useState(false);
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

	const clearSelectionButtonFunc = () => {
		setSelectedAnswers([]);
		setClearSelection(true);
	};

	const getNextTask = () => {
		clearSelectionButtonFunc();
		setShowOverLay(false);
		fetchModuleQuestionsData();
	};

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			questionSecondsRef.current = questionSecondsRef.current + 1;
		}, 1000);

		return () => clearInterval(intervalRef.current);
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
								},
							],
					  };

				setLocalQuestionHistory(updatedLocalQuestionHistory);
				setCurrentRoundAnswerOverLayData(overLayData);
				setShowOverLay(true);
			}
		};
		if (currentRoundQuestionListData?.id && questionInFocus?.id && answerData) {
			putCurrentRoundRes();
		}
	}, [answerData]);

	const continueBtnFunc = () => {
		if (showoverLay) {
			getNextTask();
		} else {
			submitAnswer();
		}
	};

	const onClose = () => {
		Cookies.set('instructional_overlay', window.btoa('instructional_overlay'), {
			path: '/',
		});
		setIsInstructionalOverlayOpen(false);
	};

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
				<TestProgressBarMenu
					questionData={questionData}
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={setIsMenuOpen}
					currentRoundQuestionListData={currentRoundQuestionListData}
					currentQuestion={questionInFocus}
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
						<Popover
							closeOnBlur={false}
							closeOnEsc={false}
							isLazy={true}
							offset={[-150, 0]}
							arrowPadding={220}
							isOpen={isInstructionalOverlayOpen}
							onClose={onClose}
							defaultIsOpen={isInstructionalOverlayOpen}
							placement={isSmallerThan1000 ? 'auto' : 'left'}
							initialFocusRef={initRef}
							arrowSize={20}>
							<PopoverAnchor>
								<Box
									style={{
										backgroundColor: 'white',
										margin: '6px',
										minHeight: '745px',
									}}
									boxShadow="2xl"
									h={isSmallerThan1000 ? '' : '100%'}
									display={'flex'}
									flexDirection="column"
									justifyContent={'space-between'}
									w="100%"
									maxWidth={726}
									overflow="hidden"
									borderRadius={24}
									p={'72px'}>
									{!showoverLay ? (
										<Fade in={!showoverLay}>
											{' '}
											<MultipleChoiceAnswers
												questionInFocus={questionInFocus}
												selectedAnswers={selectedAnswers}
												setSelectedAnswers={setSelectedAnswers}
												clearSelection={clearSelection}
												setClearSelection={setClearSelection}
											/>
										</Fade>
									) : (
										<Fade in={showoverLay}>
											{' '}
											<MultipleChoiceOverLay
												questionInFocus={questionInFocus}
												selectedAnswers={selectedAnswers}
												setSelectedAnswers={setSelectedAnswers}
												clearSelection={clearSelection}
												setClearSelection={setClearSelection}
												currentRoundAnswerOverLayData={
													currentRoundAnswerOverLayData
												}
											/>
										</Fade>
									)}
									<HStack
										justifyContent={'space-between'}
										display={'flex'}
										marginTop={'12px'}>
										<Button
											onClick={continueBtnFunc}
											variant={'ampSolid'}
											w="150px">
											<Text>
												{i18n(
													showoverLay ? 'continueBtnText' : 'submitBtnText',
												)}
											</Text>
										</Button>
										<Button
											_hover={{ backgroundColor: 'white' }}
											height="12px"
											variant="ghost"
											onClick={() => {
												clearSelectionButtonFunc();
											}}>
											{!showoverLay && (
												<Text fontSize={'14px'} color={'ampSecondary.500'}>
													{i18n('clearSelection')}
												</Text>
											)}
										</Button>
									</HStack>
								</Box>
							</PopoverAnchor>
							{/* TODO: a hack, is to wrap a box around instead of added zindex to the theme file https://chakra-ui.com/docs/styled-system/theme#z-index-values*/}
							<Box style={{ zIndex: 1401 }}>
								<PopoverContent
									p={isSmallerThan1000 ? 12 : 10}
									h={isSmallerThan1000 ? 'auto' : 485}
									w={560}>
									<PopoverArrow style={{ borderRadius: '2px' }} />
									<Heading as="h2" size="lg" mb={3}>
										Ways to answer
									</Heading>
									<PopoverBody style={{ padding: 0 }}>
										<Stack direction={['column', 'row']}>
											<Box>
												<Heading
													style={{ fontWeight: 'normal' }}
													mt={4}
													mb={4}
													as="h3"
													size="md">
													Click <strong>once</strong> if you are{' '}
													<strong>unsure</strong>
												</Heading>
												<img
													style={{ marginTop: '24px', marginBottom: '24px' }}
													src={`${process.env.PUBLIC_URL}/images/unsure.gif`}
													alt="unsure gif"
												/>
											</Box>
											<Box>
												<Heading
													style={{ fontWeight: 'normal' }}
													mt={4}
													mb={4}
													as="h3"
													size="md">
													Click <strong>twice</strong> if you are{' '}
													<strong>sure</strong>
												</Heading>
												<img
													style={{ marginTop: '24px', marginBottom: '24px' }}
													src={`${process.env.PUBLIC_URL}/images/sure.gif`}
													alt="sure gif"
												/>
											</Box>
										</Stack>
										<Text>
											Choosing unsure will give you the opportunity to try this
											question again later after learning more. You can submit
											up to two choices if you are unsure.
										</Text>
										<Text mt={5}>
											You can click three times to unselect your answer.
										</Text>
										<Button mt={4} onClick={onClose} ref={initRef}>
											Continue
										</Button>
									</PopoverBody>
								</PopoverContent>
							</Box>
						</Popover>
					</HStack>
					<ProgressMenu
						isMenuOpen={isMenuOpen}
						currentRoundQuestionListData={currentRoundQuestionListData}
					/>
				</HStack>
			</Container>
		</main>
	);
};

export default AssignmentView;
