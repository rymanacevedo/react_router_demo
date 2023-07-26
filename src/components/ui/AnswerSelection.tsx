import { Box } from '@chakra-ui/react';
import MultipleChoice from './RefactoredAnswerInputs/MultipleChoice';
import { SelectedAnswer } from './RefactoredAnswerInputs/MultipleChoiceInput';
import { QuestionInFocus } from '../../lib/validator';

type Props = {
	questionInFocus: QuestionInFocus | null;
	selectedAnswer: SelectedAnswer;
	setSelectedAnswer: (value: SelectedAnswer) => void;
	setAnswerUpdated: (value: boolean) => void;
	hasConfidenceEnabled: boolean;
	handleAnsweredQuestions: (action?: string) => void;
	// roundData: RoundData;
};

export default function AnswerSelection({
	questionInFocus,
	selectedAnswer,
	setSelectedAnswer,
	setAnswerUpdated,
	hasConfidenceEnabled,
	handleAnsweredQuestions,
}: Props) {
	return (
		<Box>
			{questionInFocus?.questionType === 'MultipleChoice' && (
				<MultipleChoice
					questionInFocus={questionInFocus}
					selectedAnswer={selectedAnswer}
					setSelectedAnswer={setSelectedAnswer}
					setAnswerUpdated={setAnswerUpdated}
					hasConfidenceEnabled={hasConfidenceEnabled}
					handleAnsweredQuestions={handleAnsweredQuestions}
				/>
			)}
		</Box>
	);
}
