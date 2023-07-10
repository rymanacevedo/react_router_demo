import { RadioGroup, Stack } from '@chakra-ui/react';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';
import RadioInput from './RadioInput';

type Props = {
	questionInFocus: QuestionInFocus;
};
export default function MultipleChoice({ questionInFocus }: Props) {
	return (
		<RadioGroup>
			<Stack marginTop={8}>
				{questionInFocus.answerList.map((answer, index) => {
					return <RadioInput value={index} answerRc={answer.answerRc} />;
				})}
			</Stack>
		</RadioGroup>
	);
}
