import { FormControl, Input } from '@chakra-ui/react';
import { QuestionInFocus } from '../../../lib/validator';
import { SelectedAnswer } from '../RefactoredAnswerInputs/MultipleChoiceInput';

type Props = {
	assignmentUid: string;
	answerUpdated: boolean;
	flaggedQuestions: Set<string | undefined>;
	questionInFocus: QuestionInFocus | null;
	selectedAnswer: SelectedAnswer;
	secondsSpent: number;
	questionId: string;
};

export default function HiddenFormInputs({
	assignmentUid,
	answerUpdated,
	flaggedQuestions,
	questionInFocus,
	selectedAnswer,
	secondsSpent,
	questionId,
}: Props) {
	const inputs = [
		{
			id: 'timedAssessmentKey',
			name: 'timedAssessmentKey',
			value: assignmentUid,
		},
		{
			id: 'answerUpdated',
			name: 'answerUpdated',
			value: answerUpdated.toString(),
		},
		{
			id: 'flagged',
			name: 'flagged',
			value: flaggedQuestions.has(
				questionInFocus?.publishedQuestionAuthoringKey,
			)
				? flaggedQuestions
						.has(questionInFocus?.publishedQuestionAuthoringKey)
						.toString()
				: 'false',
		},
		{
			id: 'questionType',
			name: 'questionType',
			value: questionInFocus?.questionType || '',
		},
		{
			id: 'questionId',
			name: 'questionId',
			value: questionId,
		},
		{
			id: 'confidence',
			name: 'confidence',
			value: selectedAnswer.confidence.toString(),
		},
		{
			id: 'secondsSpent',
			name: 'secondsSpent',
			value: secondsSpent,
		},
	];

	return (
		<>
			{inputs.map((input) => (
				<FormControl hidden={true} key={input.id}>
					<Input
						readOnly={true}
						id={input.id}
						name={input.name}
						value={input.value}
					/>
				</FormControl>
			))}
		</>
	);
}
