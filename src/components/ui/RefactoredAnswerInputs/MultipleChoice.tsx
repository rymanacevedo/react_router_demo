import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';
import RichContentComponent from '../RichContentComponent';
import CustomIcon from '../MultipleChoiceAnswerInput/MultiChoiceIcon';

type Props = {
	questionInFocus: QuestionInFocus;
	// setSelectedAnswer: (value: number | null) => void;
};
export default function MultipleChoice({
	questionInFocus,
}: // setSelectedAnswer,
Props) {
	return (
		<CheckboxGroup>
			<Stack minHeight={350} h="100%" marginTop={8}>
				{questionInFocus.answerList.map((answer) => {
					return (
						<Checkbox
							size="xxl"
							className="label-hover-effect"
							icon={<CustomIcon isIndeterminate={false} isChecked={true} />}
							variant="multiChoiceAnswer"
							colorScheme="transparent"
							value={answer.id.toString()}>
							<RichContentComponent content={answer.answerRc} />
						</Checkbox>
					);
				})}
			</Stack>
		</CheckboxGroup>
	);
}
