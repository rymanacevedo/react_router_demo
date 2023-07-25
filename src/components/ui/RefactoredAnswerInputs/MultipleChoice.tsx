import { Stack } from '@chakra-ui/react';
import {
	QuestionInFocus,
	QuestionInFocusAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultipleChoiceInput, { SelectedAnswer } from './MultipleChoiceInput';

type Props = {
	questionInFocus: QuestionInFocus | null;
	selectedAnswer: SelectedAnswer;
	setSelectedAnswer: (value: SelectedAnswer) => void;
	setAnswerUpdated: (value: boolean) => void;
	hasConfidenceEnabled: boolean;
	handleAnsweredQuestions: (action?: string) => void;
};
export default function MultipleChoice({
	questionInFocus,
	selectedAnswer,
	setSelectedAnswer,
	setAnswerUpdated,
	hasConfidenceEnabled,
	handleAnsweredQuestions,
}: Props) {
	// @ts-ignore
	const IDK: QuestionInFocusAnswer = {
		id: 1,
		answerRc: "<p>I don't know</p>",
	};
	return (
		<Stack minHeight={350} h="100%" marginTop={8}>
			{questionInFocus?.answerList.map((answer) => {
				return (
					<MultipleChoiceInput
						key={answer.id}
						answer={answer}
						selectedAnswer={selectedAnswer}
						setSelectedAnswer={setSelectedAnswer}
						setAnswerUpdated={setAnswerUpdated}
						hasConfidenceEnabled={hasConfidenceEnabled}
						handleAnsweredQuestions={handleAnsweredQuestions}
					/>
				);
			})}
			{hasConfidenceEnabled && (
				// IDK
				<MultipleChoiceInput
					answer={IDK}
					selectedAnswer={selectedAnswer}
					setSelectedAnswer={setSelectedAnswer}
					setAnswerUpdated={setAnswerUpdated}
					hasConfidenceEnabled={hasConfidenceEnabled}
					handleAnsweredQuestions={handleAnsweredQuestions}
				/>
			)}
		</Stack>
	);
}
