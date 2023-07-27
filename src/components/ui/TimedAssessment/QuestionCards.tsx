import { Outlet, useNavigate } from 'react-router';
import { Box, Button, Divider, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PracticeTestCard, { CardValues } from '../PracticeTestCard';
import { useLocation, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { SelectedAnswer } from '../RefactoredAnswerInputs/MultipleChoiceInput';
import { OutletContext } from '../../../routes/TimedAssessment';
import { Confidence } from '../../pages/AssignmentView/AssignmentTypes';
import { QuestionInFocus } from '../../../lib/validator';
import { findQuestionInFocus } from '../../pages/AssignmentView/findQuestionInFocus';

export default function QuestionCards() {
	const context = useOutletContext<OutletContext>();
	const location = useLocation();
	const navigate = useNavigate();
	const showButton = !location.pathname.includes('submission');
	const {
		questionInFocus,
		setQuestionInFocus,
		setQuestionTrigger,
		roundData,
		moduleInfoAndQuestions,
		assignmentUid,
	} = context;
	const flaggedQuestionIds: string[] = roundData.questionList
		.filter((question) => question.flagged)
		.map((question) => question.publishedQuestionAuthoringKey);
	const answeredQuestionIds: string[] = roundData.questionList
		.filter(
			(question) =>
				question.confidence && question.confidence !== Confidence.NA,
		)
		.map((question) => question.publishedQuestionAuthoringKey);

	const [flaggedQuestions, setFlaggedQuestions] = useState(
		flaggedQuestionIds.length > 0
			? new Set<string>(flaggedQuestionIds)
			: new Set<string>(),
	);

	const foundAnswer = questionInFocus?.answerList.find(
		(answer) => answer.selected,
	);

	const initialSelectedAnswer = foundAnswer
		? { id: foundAnswer.id, confidence: questionInFocus?.confidence }
		: questionInFocus?.confidence === Confidence.NotSure
		? { id: 1, confidence: Confidence.NotSure }
		: null;

	const initialAnsweredQuestions =
		answeredQuestionIds.length > 0
			? new Set(answeredQuestionIds)
			: initialSelectedAnswer
			? new Set([questionInFocus?.publishedQuestionAuthoringKey])
			: new Set();
	const [answeredQuestions, setAnsweredQuestions] = useState(
		initialAnsweredQuestions,
	);
	const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>({
		id: initialSelectedAnswer !== null ? initialSelectedAnswer.id : null,
		confidence: questionInFocus?.confidence ?? Confidence.NA,
	});

	const handleGoToSubmitPage = () => {
		setQuestionTrigger(null);
	};

	const handleNavigation = (question: QuestionInFocus) => {
		setQuestionInFocus(
			findQuestionInFocus(
				moduleInfoAndQuestions,
				roundData,
				false,
				false,
				question.displayOrder - 1,
			),
		);
		const answerInFocus = question.answerList.find((answer) => answer.selected);

		const selectedAnswerObj = answerInFocus
			? { id: answerInFocus.id, confidence: question.confidence! }
			: question.confidence === Confidence.NotSure
			? { id: 1, confidence: Confidence.NotSure }
			: { id: null, confidence: Confidence.NA };

		setSelectedAnswer(selectedAnswerObj);
		navigate(
			`/learning/timedAssessment/${assignmentUid}/${question.id.toString()}`,
		);
	};

	const { t: i18n } = useTranslation();
	return (
		<>
			<Box
				backgroundColor="ampNeutral.200"
				boxShadow="md"
				borderRadius={24}
				maxWidth={480}
				maxHeight={274}
				px={6}
				py={6}
				w={{ base: '100%', md: '50%' }}>
				<Heading mb={4} as="h2" fontSize="xl">
					{i18n('practiceTestNavigation')}
				</Heading>
				<Divider marginTop={1} marginBottom={1} />
				{roundData.questionList.map((question: QuestionInFocus) => {
					const values: CardValues = ['unselected'];
					if (
						question.publishedQuestionAuthoringKey ===
						questionInFocus?.publishedQuestionAuthoringKey
					) {
						values.push('selected');
					}
					if (answeredQuestions.has(question.publishedQuestionAuthoringKey)) {
						values.push('answered');
					}
					if (flaggedQuestions.has(question.publishedQuestionAuthoringKey)) {
						values.push('flagged');
					}

					return (
						<PracticeTestCard
							key={question.publishedQuestionAuthoringKey}
							size="sm"
							variant="multiPartCard"
							values={values}
							text={question.displayOrder.toString()}
							onClick={() => {
								if (!(question.id === questionInFocus?.id)) {
									setQuestionTrigger(question);
								}
							}}
						/>
					);
				})}
				{showButton ? (
					<Button
						onClick={handleGoToSubmitPage}
						display="block"
						mr="auto"
						ml="auto">
						{i18n('finishPracticeTest')}
					</Button>
				) : null}
			</Box>
			<Outlet
				context={{
					...context,
					flaggedQuestions,
					setFlaggedQuestions,
					selectedAnswer,
					setSelectedAnswer,
					setAnsweredQuestions,
					handleNavigation,
				}}
			/>
		</>
	);
}
