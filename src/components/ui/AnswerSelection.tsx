import { QuestionInFocus } from '../pages/AssignmentView/AssignmentTypes';
import { Box } from '@chakra-ui/react';
import MultipleChoice from './RefactoredAnswerInputs/MultipleChoice';

type Props = {
	questionInFocus: QuestionInFocus | null;
	selectedAnswer: number | null;
	setSelectedAnswer: (value: number | null) => void;
	// roundData: RoundData;
};

export default function AnswerSelection({
	questionInFocus,
	selectedAnswer,
	setSelectedAnswer,
}: // roundData,
Props) {
	return (
		<Box>
			{questionInFocus?.questionType === 'MultipleChoice' && (
				<MultipleChoice
					questionInFocus={questionInFocus}
					selectedAnswer={selectedAnswer}
					setSelectedAnswer={setSelectedAnswer}
				/>
			)}
		</Box>
	);
}
