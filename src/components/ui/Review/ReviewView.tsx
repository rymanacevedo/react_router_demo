import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	HStack,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import Question from '../Question';
import ProgressMenu from '../ProgressMenu';
import {
	Item,
	QuestionInFocus,
	SelectedAnswer,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
import TestProgressBarMenu from '../TestProgressBarMenu';
import {
	json,
	LoaderFunction,
	useLoaderData,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { useQuizContext } from '../../../hooks/useQuizContext';
import FireProgressToast from '../ProgressToast';
import { useProgressMenuContext } from '../../../hooks/useProgressMenuContext';
import MultipleChoiceOverLay from '../../ui/MultipleChoiceAnswerInput/MultipleChoiceFeedBack';
import WhatYouNeedToKnowComponent from '../WhatYouNeedToKnowComponent';
import { useTranslation } from 'react-i18next';
import { transformQuestion } from '../../../utils/logic';
import { getAnswerHistory } from '../../../services/learning';
import { requireUser } from '../../../utils/user';
import { badRequest, getSubAccount } from '../../../services/utils';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import AmpBox from '../../standard/container/AmpBox';

export const reviewViewLoader: LoaderFunction = async ({ params }) => {
	const assignmentKey = params.assignmentKey!;
	const user = requireUser();
	const { subAccount } = getSubAccount(user);

	const { data } = await getAnswerHistory(user, subAccount, assignmentKey);
	const items = data.items;
	if (!items.answerHistory) {
		return badRequest({
			fields: {},
			errors: {
				fieldErrors: {
					assignmentKey: ['Bad assignment key'],
				},
			},
		});
	}

	return json({
		data: data.items,
		assignmentKey,
	});
};

const ReviewView = () => {
	const { data, assignmentKey } = useLoaderData() as {
		data: Item[];
		assignmentKey: string;
	};
	const { t: i18n } = useTranslation();
	const location = useLocation();
	const { transformedQuestion, questionIndex, reviewQuestions } =
		location.state;
	const navigate = useNavigate();
	const { handleMenuOpen } = useProgressMenuContext();
	const { selectedCourseKey } = useQuizContext();
	const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
	const [textPrompt] = useState<string>('');
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
	const [clearSelection, setClearSelection] = useState(false);
	const [displayedQuestion, setDisplayedQuestion] =
		useState<TransformedQuestion>(reviewQuestions[questionIndex]);
	const [currentQuestionIndex, setCurrentQuestionIndex] =
		useState<number>(questionIndex);
	const [answerHistory] = useState<Item[]>(data);
	const renameAnswerAttribute = (object: TransformedQuestion) => {
		if ('answers' in object) {
			object.answerList = object.answers;
		}
		return object;
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
		const correctAnswers = getCorrectAnswers(transformedQuestion);
		setSelectedAnswers(correctAnswers);
	}, [assignmentKey, transformedQuestion]);

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
					transformedQuestion: transformQuestion(nextQuestion, answerHistory),
					reviewQuestions,
				},
			});
		}
	};

	const handleClickBack = () => {
		const previousQuestionIndex = currentQuestionIndex - 1;
		if (previousQuestionIndex >= 0) {
			const previousQuestion = reviewQuestions[previousQuestionIndex];
			const previousQuestionId = previousQuestion.id;
			setDisplayedQuestion(previousQuestion);
			setCurrentQuestionIndex(previousQuestionIndex);
			navigate(`/learning/review/${assignmentKey}/${previousQuestionId}`, {
				state: {
					questionIndex: previousQuestionIndex,
					transformedQuestion: transformQuestion(
						previousQuestion,
						answerHistory,
					),
					reviewQuestions,
				},
			});
		}
	};

	return (
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
				questionData={undefined}
				currentRoundQuestionListData={undefined}
				currentQuestion={undefined}
				currentRoundAnswerOverLayData={undefined}
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
					<AmpBox>
						<Question
							review={true}
							questionIndex={currentQuestionIndex + 1}
							numberOfQInReview={reviewQuestions.length}
							questionInFocus={displayedQuestion}
						/>
					</AmpBox>
					<AmpBox>
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
							currentRoundAnswerOverLayData={undefined}
							inReview={true}
							revealAnswer={false}
						/>
					</AmpBox>
				</Stack>
				<ProgressMenu
					textPrompt={textPrompt}
					currentRoundQuestionListData={undefined}
					currentRoundAnswerOverLayData={undefined}
				/>
			</HStack>
			<VStack
				marginLeft={'13px'}
				p="12px"
				rounded="md"
				shadow="md"
				display={'flex'}
				justifyContent={'center'}
				w="100%">
				<WhatYouNeedToKnowComponent
					isInReviewView={true}
					courseKey={selectedCourseKey}
					assignmentKey={assignmentKey}
					questionInFocus={
						renameAnswerAttribute(
							transformedQuestion,
						) as unknown as QuestionInFocus
					}
				/>
				<Box
					height={'101px'}
					style={{ marginTop: '24px' }}
					width="1496px"
					backgroundColor="white"
					boxShadow="md"
					borderRadius={24}
					px={12}
					py="30px"
					display="flex"
					justifyContent="space-between">
					<Button
						leftIcon={<ArrowLeftIcon />}
						onClick={handleClickBack}
						isDisabled={currentQuestionIndex === 0}>
						{i18n('previousBtn')}
					</Button>
					<Text
						fontWeight="semibold"
						fontSize="md"
						color={'#7E8A9B'}
						marginTop={'10px'}>
						{i18n('reviewing')} {questionIndex + 1} {i18n('of')}{' '}
						{reviewQuestions.length}
					</Text>
					<Button
						rightIcon={<ArrowRightIcon />}
						onClick={handleClickNext}
						isDisabled={currentQuestionIndex + 1 === reviewQuestions.length}>
						{i18n('nextBtn')}
					</Button>
				</Box>
			</VStack>
		</Container>
	);
};

export default ReviewView;
