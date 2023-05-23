import { Box, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
	QuestionInFocus,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultiCorrectAnswerInput from './MultiCorrectAnswerInput';

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

const MultipleCorrectAnswers = ({
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
}: MultipleCorrectAnswersProps) => {
	const { t: i18n } = useTranslation();

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
		<Box>
			<Heading as="h3">{i18n('selectAllthatApply')}</Heading>
			<Box
				marginTop="34px"
				display="flex"
				flexDirection={'column'}
				justifyContent="space-between"
				minHeight={350}
				h="100%">
				<>
					{questionInFocus?.answerList?.slice(0, 10).map((answer) => {
						return (
							<MultiCorrectAnswerInput
								key={answer.id}
								questionText={answer.answerRc}
								questionAnswerId={answer.id}
								toggleAnswer={toggleAnswer}
								selectedAnswers={selectedAnswers}
							/>
						);
					})}
				</>
			</Box>
		</Box>
	);
};

export default MultipleCorrectAnswers;
