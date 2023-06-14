import { QuestionInFocus } from '../pages/AssignmentView/AssignmentTypes';
import { Box } from '@chakra-ui/react';
import MultipleChoice from './RefactoredAnswerInputs/MultipleChoice';

type Props = {
	questionInFocus: QuestionInFocus | null;
	// selectedAnswers: SelectedAnswer[];
	// setSelectedAnswers: (
	// 	value:
	// 		| ((prevState: SelectedAnswer[]) => SelectedAnswer[])
	// 		| SelectedAnswer[],
	// ) => void;
	// roundData: RoundData;
};

export default function AnswerSelection({
	questionInFocus,
}: // selectedAnswers,
// setSelectedAnswers,
// roundData,
Props) {
	return (
		<Box>
			{questionInFocus?.questionType === 'MultipleChoice' && (
				<MultipleChoice questionInFocus={questionInFocus} />
			)}
		</Box>
	);
}
