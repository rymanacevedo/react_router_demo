import { Stack } from '@chakra-ui/react';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';
import MultipleChoiceInput from './MultipleChoiceInput';

type Props = {
	questionInFocus: QuestionInFocus;
	selectedAnswer: number | null;
	setSelectedAnswer: (value: number | null) => void;
	setAnswerUpdated: (value: boolean) => void;
};
export default function MultipleChoice({
	questionInFocus,
	selectedAnswer,
	setSelectedAnswer,
	setAnswerUpdated,
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
					/>
				);
			})}
		</Stack>
	);
}
