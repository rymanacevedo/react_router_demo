import { Stack } from '@chakra-ui/react';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';
import MultipleChoiceInput, { SelectedAnswer } from './MultipleChoiceInput';

type Props = {
	questionInFocus: QuestionInFocus;
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
	return (
		<Stack minHeight={350} h="100%" marginTop={8}>
			{questionInFocus.answerList.map((answer) => {
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
		</Stack>
	);
}
