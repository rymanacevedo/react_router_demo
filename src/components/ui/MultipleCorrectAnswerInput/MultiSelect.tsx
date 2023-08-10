import { Stack } from '@chakra-ui/react';
import MultiSelectInput from './MultiSelectInput';
import { Answer, QuestionInFocus } from '../../../lib/validator';

type MultipleCorrectAnswersProps = {
	questionInFocus: QuestionInFocus;
	selectedAnswers?: Answer[];
	setSelectedAnswers?: (
		value: ((prevState: Answer[]) => Answer[]) | Answer[],
	) => void;
	setIDKResponse: (value: boolean) => void;
	IDKResponse?: boolean;
};

const MultiSelect = ({
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
}: MultipleCorrectAnswersProps) => {
	const toggleAnswer = (answer: Answer) => {
		if (answer.answerId && setSelectedAnswers) {
			setSelectedAnswers((prevState: Answer[]) => {
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
		<Stack minHeight={350} h="100%" marginTop={8}>
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
		</Stack>
	);
};

export default MultiSelect;
