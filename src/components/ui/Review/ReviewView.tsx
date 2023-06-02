/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	HStack,
	Stack,
	VStack,
} from '@chakra-ui/react';
import Question from '../Question';
import ProgressMenu from '../ProgressMenu';
import {
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	ModuleData,
	QuestionInFocus,
	SelectedAnswer,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
import TestProgressBarMenu from '../TestProgressBarMenu';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import { LoaderFunction, useParams } from 'react-router-dom';
import { useQuizContext } from '../../../hooks/useQuizContext';
import FireProgressToast from '../ProgressToast';
import { useProgressMenuContext } from '../../../hooks/useProgressMenuContext';
import { useLocation, useNavigate } from 'react-router-dom';
import MultipleChoiceOverLay from '../../ui/MultipleChoiceAnswerInput/MultipleChoiceFeedBack';
import WhatYouNeedToKnowComponent from '../WhatYouNeedToKnowComponent';
import { useTranslation } from 'react-i18next';

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
export const reviewViewLoader: LoaderFunction = async () => {
	return null;
};

const ReviewView = () => {
	const { t: i18n } = useTranslation();
	const location = useLocation();
	const { transformedQuestion, questionIndex, reviewQuestions } =
		location.state;
	console.log(reviewQuestions);
	// console.log(currentQuestionIndex);
	const navigate = useNavigate();
	const { assignmentKey } = useParams();
	const { handleMenuOpen } = useProgressMenuContext();
	const { moduleLearningUnitsData } = useQuizContext();
	const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
	const [textPrompt] = useState<string>('');
	const { fetchModuleQuestions } = useModuleContentService();
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
	const [clearSelection, setClearSelection] = useState(false);
	const [displayedQuestion, setDisplayedQuestion] =
		useState<TransformedQuestion>(reviewQuestions[questionIndex]);
	const [currentQuestionIndex, setCurrentQuestionIndex] =
		useState<number>(questionIndex);
	const [questionInFocus] = useState<QuestionInFocus>({
		answerList: [],
		answered: false,
		confidence: null,
		correctness: null,
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
	});

	const [currentRoundQuestionListData] =
		useState<CurrentRoundQuestionListData>();

	const [currentRoundAnswerOverLayData] =
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
		outroLink: '',
		outroRc: null,
		ownerAccountUid: '',
		publishedVersionId: null,
		self: '',
		timeAllotted: null,
		timedAssessment: false,
		uid: '',
		versionId: 0,
	});

	const renameAnswerAttribute = (object: TransformedQuestion) => {
		if ('answers' in object) {
			object.answerList = object.answers;
		}
		return object;
	};

	const fetchModuleQuestionsData = async () => {
		try {
			let moduleQuestionsResponse = {} as ModuleData;
			if (moduleLearningUnitsData.assignmentKey === assignmentKey) {
				moduleQuestionsResponse = moduleLearningUnitsData.data as ModuleData;
			} else {
				let res = await fetchModuleQuestions(assignmentKey);
				moduleQuestionsResponse = res;
				setQuestionData(moduleQuestionsResponse);
			}
			setQuestionData(moduleQuestionsResponse);
		} catch (error) {
			console.error(error);
		}
	};

	const getCorrectAnswers = (question: TransformedQuestion) => {
		const correctAnswers = question.answers.filter(
			(answer) => answer.isCorrect,
		);

		return correctAnswers.map((answer) => ({
			answerId: answer.id,
			selectedOptionId: 0,
			self: answer.self,
			confidence: 100,
		}));
	};

	useEffect(() => {
		if (assignmentKey) {
			fetchModuleQuestionsData();
		}
		const correctAnswers = getCorrectAnswers(transformedQuestion);
		setSelectedAnswers(correctAnswers);
	}, [assignmentKey]);

	const expandProgressMenu = () => {
		handleMenuOpen();
		setIsToastOpen(false);
	};

	const handleClickNext = () => {
		const nextQuestionIndex = currentQuestionIndex + 1;
		if (nextQuestionIndex < reviewQuestions.length) {
			const nextQuestion = reviewQuestions[nextQuestionIndex];
			const nextQuestionId = nextQuestion.id;
			setDisplayedQuestion(nextQuestion);
			setCurrentQuestionIndex(nextQuestionIndex);
			navigate(`/learning/review/${assignmentKey}/${nextQuestionId}`, {
				state: {
					questionIndex: nextQuestionIndex,
					transformedQuestion: nextQuestion,
					reviewQuestions,
				},
			});
		}
	};

	const handleClickBack = () => {
		// decrement the questionIndex
		// set the state of the question
		const previousQuestionIndex = currentQuestionIndex - 1;
		if (previousQuestionIndex >= 0) {
			const previousQuestion = reviewQuestions[previousQuestionIndex];
			const previousQuestionId = previousQuestion.id;
			// Update any other necessary state
			setDisplayedQuestion(previousQuestion);
			setCurrentQuestionIndex(previousQuestionIndex);
			navigate(`/learning/review/${assignmentKey}/${previousQuestionId}`, {
				state: {
					questionIndex: previousQuestionIndex,
					transformedQuestion: previousQuestion,
					reviewQuestions,
				},
			});
		}
	};

	console.log('transformedQuestion: ', transformedQuestion.answerHistory);
	console.log('displayedQuestion: ', displayedQuestion.answerHistory);

	return (
		<>
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
					isInReviewView={true}
					answerHistory={transformedQuestion.answerHistory}
					showType={true}
					questionData={questionData}
					currentRoundQuestionListData={currentRoundQuestionListData}
					currentQuestion={questionInFocus}
					currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
				/>
				<HStack justify="center" align="space-between" marginTop="4px">
					<Stack
						maxW="1496"
						w="100%"
						p="12px"
						pr="0px"
						alignItems="stretch"
						direction={['column', 'column', 'row', 'row', 'row', 'row']}
						spacing={19}>
						<Box
							id="questionBox"
							backgroundColor="white"
							boxShadow="md"
							borderRadius={24}
							px="72px"
							py="44px"
							w={{ base: '100%', md: '50%' }}>
							<Question
								review={true}
								questionIndex={currentQuestionIndex + 1}
								numberOfQInReview={reviewQuestions.length}
								questionInFocus={displayedQuestion}
							/>
						</Box>
						<Box
							id="answerBox"
							backgroundColor="white"
							boxShadow="md"
							borderRadius={24}
							px="72px"
							py="44px"
							w={{ base: '100%', md: '50%' }}>
							<MultipleChoiceOverLay
								isInReviewView={true}
								questionInFocus={
									renameAnswerAttribute(
										transformedQuestion,
									) as unknown as QuestionInFocus
								}
								selectedAnswers={selectedAnswers}
								setSelectedAnswers={setSelectedAnswers}
								clearSelection={clearSelection}
								setClearSelection={setClearSelection}
								currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
								inReview={true}
								revealAnswer={false}
							/>
						</Box>
					</Stack>
					<ProgressMenu
						textPrompt={textPrompt}
						currentRoundQuestionListData={currentRoundQuestionListData}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
					/>
				</HStack>
				<VStack
					p="12px"
					rounded="md"
					shadow="md"
					display={'flex'}
					justifyContent={'center'}
					w="100%">
					<WhatYouNeedToKnowComponent
						questionInFocus={
							renameAnswerAttribute(
								transformedQuestion,
							) as unknown as QuestionInFocus
						}
					/>
					<Box
						width="1496px"
						backgroundColor="white"
						boxShadow="md"
						borderRadius={24}
						px="72px"
						py="44px"
						display="flex"
						justifyContent="space-between">
						<Button
							onClick={handleClickBack}
							isDisabled={currentQuestionIndex === 0}>
							{i18n('previousBtn')}
						</Button>
						<Button
							onClick={handleClickNext}
							isDisabled={currentQuestionIndex + 1 === reviewQuestions.length}>
							{i18n('nextBtn')}
						</Button>
					</Box>
				</VStack>
			</Container>
		</>
	);
};

export default ReviewView;
