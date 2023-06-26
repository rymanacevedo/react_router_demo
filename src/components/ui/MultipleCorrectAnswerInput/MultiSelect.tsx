import { Box } from '@chakra-ui/react';
import {
	QuestionInFocus,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultiSelectInput from './MultiSelectInput';

type MultipleCorrectAnswersProps = {
	questionInFocus: QuestionInFocus;
	selectedAnswers?: SelectedAnswer[];
	setSelectedAnswers: (
		value:
			| ((prevState: SelectedAnswer[]) => SelectedAnswer[])
			| SelectedAnswer[],
	) => void;
	setIDKResponse: (value: boolean) => void;
	IDKResponse?: boolean;
};

const MultiSelect = ({
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
}: MultipleCorrectAnswersProps) => {
	const toggleAnswer = (answer: SelectedAnswer) => {
		if (answer.answerId) {
			setSelectedAnswers((prevState: SelectedAnswer[]) => {
				const updatedSelectedAnswers = [...(prevState || [])];
				const index = updatedSelectedAnswers.findIndex(
					(a) => a.answerId === answer.answerId,
				);
				if (index === -1) {
					updatedSelectedAnswers.push(answer);
				} else {
					updatedSelectedAnswers.splice(index, 1);
				}
				return updatedSelectedAnswers;
			});
		}
	};

	return (
		<Box
			marginTop="34px"
			display="flex"
			justifyContent="space-around"
			flexDirection={'column'}
			minHeight={350}
			h="100%">
			{questionInFocus.answerList.map((answer) => {
				return (
					<MultiSelectInput
						key={answer.id}
						questionText={answer.answerRc}
						questionAnswerId={answer.id}
						toggleAnswer={toggleAnswer}
						selectedAnswers={selectedAnswers}
					/>
				);
			})}
		</Box>
	);
};

export default MultiSelect;
