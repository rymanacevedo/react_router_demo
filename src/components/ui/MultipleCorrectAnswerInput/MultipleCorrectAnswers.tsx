import { Box, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
	QuestionInFocus,
	SelectedAnswers,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultiCorrectAnswerInput from './MultiCorrectAnswerInput';

type MultipleCorrectAnswersProps = {
	questionInFocus: QuestionInFocus;
	selectedAnswers?: SelectedAnswers[];
	setSelectedAnswers: (
		value:
			| ((prevState: SelectedAnswers[]) => SelectedAnswers[])
			| SelectedAnswers[],
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

	const toggleAnswer = (answerObject: SelectedAnswers) => {
		if (answerObject.answerId) {
			setSelectedAnswers((prevState: SelectedAnswers[]) => {
				const updatedSelectedAnswers = [...(prevState || [])];
				const index = updatedSelectedAnswers.findIndex(
					(answer) => answer.answerId === answerObject.answerId,
				);
				if (index === -1) {
					updatedSelectedAnswers.push(answerObject);
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
					{questionInFocus?.answerList
						?.slice(0, 10)
						.map((answer: { answerRc: string; id: string | number }) => {
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
