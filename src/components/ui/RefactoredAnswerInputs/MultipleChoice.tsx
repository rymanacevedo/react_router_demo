import { Box } from '@chakra-ui/react';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';
import MultipleChoiceInput from './MultipleChoiceInput';

type Props = {
	questionInFocus: QuestionInFocus | null;
};
export default function MultipleChoice({ questionInFocus }: Props) {
	return (
		<Box
			marginTop="34px"
			display="flex"
			flexDirection={'column'}
			minHeight={350}
			h="100%">
			{questionInFocus?.answerList.map((answer, index) => {
				return <MultipleChoiceInput key={index} answerRc={answer.answerRc} />;
			})}
		</Box>
	);
}
