/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, HStack, Stack } from '@chakra-ui/react';
import Question from '../Question';
import ProgressMenu from '../ProgressMenu';

import {
	Correctness,
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	ModuleData,
	QuestionInFocus,
	SelectedAnswer,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
// import AnswerArea from '../AnswerArea'; //TODO: this will be added back in VE-215
import { useEffect, useState } from 'react';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';
import TestProgressBarMenu from '../TestProgressBarMenu';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import { findQuestionInFocus } from '../../pages/AssignmentView/findQuestionInFocus';
import { LoaderFunction, useNavigate, useParams } from 'react-router-dom';
// import LoadingAssignmentView from '../loading/LoadingAssignmentView'; //TODO: this will bethis will be added back in VE-215
import { useQuizContext } from '../../../hooks/useQuizContext';
import FireProgressToast from '../ProgressToast';
import ModuleOutro from '../../pages/ModuleOutro';
import { useProgressMenuContext } from '../../../hooks/useProgressMenuContext';
import { useLocation } from 'react-router-dom';
// import AnswerArea from '../AnswerArea';
import MultipleChoiceOverLay from '../../ui/MultipleChoiceAnswerInput/MultipleChoiceFeedBack';
import { findRoundAnswersData } from '../../pages/AssignmentView/findRoundAnswersData';
import AnswerArea from '../AnswerArea';

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
	const location = useLocation();
	const { transformedQuestion, questionIndex, reviewQuestions } =
		location.state;
	console.log(questionIndex + 1);
	console.log(reviewQuestions.length);
	const { assignmentKey } = useParams();
	const { handleMenuOpen } = useProgressMenuContext();
	const navigate = useNavigate();
	const {
		moduleLearningUnitsData,
		// updateModuleLearningUnitsData,
	} = useQuizContext();
	const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
	const [textPrompt] = useState<string>('');
	const { getCurrentRound, getCurrentRoundSkipReview } =
		useCurrentRoundService();
	const { fetchModuleQuestions } = useModuleContentService();
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
	const [clearSelection, setClearSelection] = useState(false);
	const [questionInFocus, setQuestionInFocus] = useState<QuestionInFocus>({
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

	const [currentRoundQuestionListData, setCurrentRoundQuestionListData] =
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

	const [outro] = useState(false);

	const renameAnswerAttribute = (object: TransformedQuestion) => {
		if ('answers' in object) {
			object.answerList = object.answers;
			delete object.answers;
		}
		return object;
	};

	const fetchModuleQuestionsData = async () => {
		try {
			let currentRoundQuestionsResponse = await getCurrentRound(assignmentKey);
			let moduleQuestionsResponse = {} as ModuleData;
			if (moduleLearningUnitsData.assignmentKey === assignmentKey) {
				moduleQuestionsResponse = moduleLearningUnitsData.data as ModuleData;
			} else {
				let res = await fetchModuleQuestions(assignmentKey);
				console.log(res);
				moduleQuestionsResponse = res;
				setQuestionData(moduleQuestionsResponse);
				// updateModuleLearningUnitsData(res, assignmentKey);
			}

			let revSkipRes = {} as CurrentRoundQuestionListData;
			console.log(moduleQuestionsResponse);
			if (moduleQuestionsResponse) {
				if (
					currentRoundQuestionsResponse?.totalQuestionCount ===
					currentRoundQuestionsResponse?.masteredQuestionCount
				) {
					// setOutro(true);
				} else if (
					currentRoundQuestionsResponse.questionList.every(
						(question: QuestionInFocus) =>
							question.correctness === Correctness.Correct,
					)
				) {
					revSkipRes = await getCurrentRoundSkipReview(assignmentKey);
					alert(revSkipRes);
					setQuestionData(moduleQuestionsResponse);
					setCurrentRoundQuestionListData(revSkipRes);
					setQuestionInFocus(
						findQuestionInFocus(
							moduleQuestionsResponse,
							currentRoundQuestionsResponse,
							true,
							true,
						),
					);
				} else if (currentRoundQuestionsResponse.roundPhase === 'QUIZ') {
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
					navigate(`/learning/assignmentReview/${assignmentKey}`);
				}
			}

			// const foundQuestionInFocus = findQuestionInFocus(
			// 	moduleQuestionsResponse,
			// 	currentRoundQuestionsResponse,
			// 	true,
			// 	true,
			// )[questionIndex];

			// setSelectedAnswers(findRoundAnswersData(foundQuestionInFocus));
		} catch (error) {
			console.error(error);
		}
	};

	const handleReturnHome = () => {
		navigate('/learning');
	};

	useEffect(() => {
		if (assignmentKey) {
			fetchModuleQuestionsData();
		}
	}, [assignmentKey]);

	const expandProgressMenu = () => {
		handleMenuOpen();
		setIsToastOpen(false);
	};

	// const continueBtnFunc = () => {
	// 	console.log('continue');
	// };

	// const clearSelectionButtonFunc = () => {
	// 	console.log('clear');
	// };

	console.log(transformedQuestion);

	return (
		<>
			{!outro ? (
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
						isReview={true}
						answerHistory={transformedQuestion.answerHistory}
						showType={true}
						questionData={questionData}
						currentRoundQuestionListData={currentRoundQuestionListData}
						currentQuestion={questionInFocus}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
					/>
					<HStack justify="center" align="space-between">
						<Stack
							maxW="1496"
							w="100%"
							p="12px"
							pr="0px"
							alignItems="stretch"
							direction={['column', 'column', 'row', 'row', 'row', 'row']}>
							<Box
								backgroundColor="white"
								boxShadow="md"
								borderRadius={24}
								px="72px"
								py="44px"
								w={{ base: '100%', md: '50%' }}>
								<Question
									review={true}
									questionIndex={questionIndex + 1}
									numberOfQInReview={reviewQuestions.length}
									questionInFocus={transformedQuestion}
								/>
							</Box>
							{/* TODO: this will be added back in next ticket (VE-215) */}
							<Box
								backgroundColor="white"
								boxShadow="md"
								borderRadius={24}
								px="72px"
								py="44px"
								w={{ base: '100%', md: '50%' }}>
								<MultipleChoiceOverLay
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
									revealAnswer={true}
								/>
							</Box>
						</Stack>
						<ProgressMenu
							textPrompt={textPrompt}
							currentRoundQuestionListData={currentRoundQuestionListData}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						/>
					</HStack>
				</Container>
			) : (
				<ModuleOutro moduleData={questionData} action={handleReturnHome} />
			)}
		</>
	);
};

export default ReviewView;
