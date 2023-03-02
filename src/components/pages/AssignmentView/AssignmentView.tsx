import { useEffect, useState, useRef } from 'react';
import {
	Box,
	Button,
	Container,
	HStack,
	Text,
	useMediaQuery,
	Fade,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import MultipleChoiceAnswers from '../../ui/MultipleChoiceAnswers';
import MultipleChoiceOverLay from '../../ui/MultipleChoiceOverLay';
import {
	AnswerData,
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	QuestionInFocus,
	SelectedAnswers,
} from './AssignmentViewTypes';
import { findQuestionInFocus } from './findQuestionInFocus';
import useAnswerHistoryService from '../../../services/useAnswerHistoryService';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';

type ApiRes = {
	items: Item[];
};

type Item = {
	publishedQuestionUri: string;
	answerHistory: AnswerHistory[];
};

type AnswerHistory = {
	roundNumber: number;
	confidence: string;
	correctness: string;
};

const AssignmentView = () => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isOpen, setIsOpen] = useState(false);
	const [questionInFocus, setQuestionInFocus] = useState<QuestionInFocus>({
		id: '',
		questionRc: '',
		publishedQuestionId: '',
		answerList: [{ answerRc: '', id: '' }],
	});

	const [ansHistory, setAnsHistory] = useState<ApiRes | any>();

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
	const { getAnswerHistory } = useAnswerHistoryService();
	const navigate = useNavigate();
	const location = useLocation();
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
						),
					);
				} else {
					navigate('/app/learning/assignmentReview');
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const submitAnswer = () => {
		setAnswerData((answerDataArg: any) => {
			const findDateData = () => {
				const now = new Date();
				const offset = now.getTimezoneOffset() * -1;
				const offsetHours = Math.floor(offset / 60);
				const offsetMinutes = offset % 60;
				const offsetString = ` ${offset >= 0 ? '+' : '-'}${Math.abs(offsetHours)
					.toString()
					.padStart(2, '0')}${offsetMinutes.toString().padStart(2, '0')}`;
				const year = now.getFullYear();
				const month = (now.getMonth() + 1).toString().padStart(2, '0');
				const day = now.getDate().toString().padStart(2, '0');
				const hours = now.getHours().toString().padStart(2, '0');
				const minutes = now.getMinutes().toString().padStart(2, '0');
				const seconds = now.getSeconds().toString().padStart(2, '0');

				const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetString}`;
				return dateString;
			};

			return {
				...answerDataArg,
				answerDate: findDateData(),
				questionSeconds: questionSecondsRef.current,
				answerList: [...selectedAnswers],
			};
		});
		questionSecondsRef.current = 0;
	};

	const progressPercent = currentRoundQuestionListData
		? currentRoundQuestionListData?.totalQuestionCount /
		  currentRoundQuestionListData?.masteredQuestionCount
		: 0;

	const estimatedTimeRemaining = () => {
		const time = location?.state?.estimatedTimeToComplete;
		let hour = 0;
		let min = 0;

		if (time == null || time <= 0) {
			return '';
		}

		if (time >= 3600) {
			// over an hour
			hour = time / 3600;
			min = Math.ceil((time % 3600) / 60);

			return `About ${hour} hr ${min} mins remaining.`;
		} else {
			// under one hour
			min = Math.ceil(time / 60);

			return `About ${min} mins remaining.`;
		}
	};

	const seenCount = () => {
		return (
			currentRoundQuestionListData?.notSureCount +
			currentRoundQuestionListData?.uninformedCount +
			currentRoundQuestionListData?.informedCount +
			currentRoundQuestionListData?.misinformedCount
		);
	};

	const getNextTask = () => {
		setSelectedAnswers([]);
		setClearSelection(true);
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
		const getAnsHist = async () => {
			const resp = await getAnswerHistory(assignmentKey);
			setAnsHistory(resp);
		};

		if (questionData) {
			getAnsHist();
		}
	}, [questionData]);

	useEffect(() => {
		const putCurrentRoundRes = async () => {
			const overLayData = await putCurrentRound(
				currentRoundQuestionListData?.id,
				questionInFocus.id,
				answerData,
			);
			setCurrentRoundAnswerOverLayData(overLayData);
			setShowOverLay(true);
		};
		if (currentRoundQuestionListData?.id && questionInFocus?.id && answerData) {
			putCurrentRoundRes();
		}
	}, [answerData]);

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
					assignmentType={questionData.kind}
					title={questionData.name}
					timeRemaining={estimatedTimeRemaining()}
					progress={progressPercent}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					roundNumber={currentRoundQuestionListData?.roundNumber}
					roundPhase={currentRoundQuestionListData?.roundPhase}
					totalQuestionCount={currentRoundQuestionListData?.totalQuestionCount}
					masteredQuestionCount={
						currentRoundQuestionListData?.masteredQuestionCount
					}
					unseenCount={currentRoundQuestionListData?.unseenCount}
					misinformedCount={currentRoundQuestionListData?.misinformedCount}
					seenCount={seenCount()}
					answerHistory={ansHistory}
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
							maxW="xl"
							w="100%"
							maxWidth={726}
							h={isSmallerThan1000 ? '' : '745px'}
							overflow="hidden"
							borderRadius={24}
							p={'72px'}>
							<Question questionInFocus={questionInFocus} />
						</Box>
						<Box
							style={{
								backgroundColor: 'white',
								margin: '6px',
								minHeight: '745px',
							}}
							boxShadow="2xl"
							maxW="xl"
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
									onClick={() => {
										showoverLay ? getNextTask() : submitAnswer();
									}}
									variant={'ampSolid'}
									w="150px">
									<Text>
										{i18n(showoverLay ? 'continueBtnText' : 'submitBtnText')}
									</Text>
								</Button>
								<Button
									_hover={{ backgroundColor: 'white' }}
									height="12px"
									variant="ghost"
									onClick={() => {
										setSelectedAnswers([]);
										setClearSelection(true);
									}}>
									{!showoverLay && (
										<Text fontSize={'14px'} color={'ampSecondary.500'}>
											{i18n('clearSelection')}
										</Text>
									)}
								</Button>
							</HStack>
						</Box>
					</HStack>
					<ProgressMenu isOpen={isOpen} />
				</HStack>
			</Container>
		</main>
	);
};

export default AssignmentView;
