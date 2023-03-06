import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	HStack,
	Text,
	useMediaQuery,
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
	ApiRes,
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	QuestionInFocus,
	SelectedAnswers,
} from '../AssignmentView/AssignmentTypes';
import { findQuestionInFocus } from '../AssignmentView/findQuestionInFocus';
import useAnswerHistoryService from '../../../services/useAnswerHistoryService';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';

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
	// eslint-disable-next-line
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

	const fetchModuleQuestionsData = async () => {
		try {
			let [currentRoundQuestionsResponse, moduleQuestionsResponse] = [
				await getCurrentRound(assignmentKey),
				await fetchModuleQuestions(assignmentKey),
			];

			if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
				setQuestionData(moduleQuestionsResponse);
				setCurrentRoundQuestionListData(currentRoundQuestionsResponse);
				setQuestionInFocus(
					findQuestionInFocus(
						moduleQuestionsResponse,
						currentRoundQuestionsResponse,
					),
				);
			}
		} catch (error) {
			console.error(error);
		}
	};

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
					questionData={questionData}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					currentRoundQuestionListData={currentRoundQuestionListData}
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
							<MultipleChoiceOverLay
								questionInFocus={questionInFocus}
								selectedAnswers={selectedAnswers}
								setSelectedAnswers={setSelectedAnswers}
								clearSelection={clearSelection}
								setClearSelection={setClearSelection}
								currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
							/>

							<HStack
								justifyContent={'space-between'}
								display={'flex'}
								marginTop={'12px'}>
								<Button onClick={() => {}} variant={'ampSolid'} w="150px">
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
