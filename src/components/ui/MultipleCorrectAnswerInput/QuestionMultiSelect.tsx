import MultiSelect from './MultiSelect';
import MultiSelectFeedback from './MultiSelectFeedback';
import {
	Answer,
	AnswerData,
	QuestionInFocus,
	RoundData,
} from '../../../lib/validator';

type Props = {
	showFeedback: boolean;
	questionInFocus: QuestionInFocus;
	selectedAnswers: Answer[];
	setSelectedAnswers?: (
		value: ((prevState: Answer[]) => Answer[]) | Answer[],
	) => void;
	setIDKResponse: (value: ((prevState: boolean) => boolean) | boolean) => void;
	answerData: AnswerData;
	roundData?: RoundData;
	validator: (answerData: AnswerData, selectedAnswer?: Answer) => boolean;
};
export default function QuestionMultiSelect({
	showFeedback,
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
	setIDKResponse,
	answerData,
	roundData,
	validator,
}: Props) {
	return (
		<>
			{!showFeedback ? (
				<MultiSelect
					questionInFocus={questionInFocus}
					selectedAnswers={selectedAnswers}
					setSelectedAnswers={setSelectedAnswers}
					setIDKResponse={setIDKResponse}
				/>
			) : (
				<MultiSelectFeedback
					questionInFocus={questionInFocus}
					roundData={roundData}
					selectedAnswers={selectedAnswers}
					answerData={answerData}
					validator={validator}
				/>
			)}
		</>
	);
}
