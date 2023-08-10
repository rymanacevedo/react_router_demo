import { Stack } from '@chakra-ui/react';
import AnswerFeedback, {
	Confidence,
	Correctness,
} from '../RefactorAnswerFeedback/AnswerFeedback';
import AnswerFeedbackBadge, {
	BadgeVariantValues,
} from '../RefactorAnswerFeedback/AnswerFeedbackBadge';
import { useState } from 'react';
import {
	Answer,
	AnswerData,
	QuestionInFocus,
	RoundData,
} from '../../../lib/validator';

const MultiSelectFeedback = ({
	questionInFocus,
	answerData,
	roundData,
	selectedAnswers,
	validator,
}: {
	questionInFocus: QuestionInFocus;
	answerData: AnswerData;
	roundData?: RoundData;
	selectedAnswers: Answer[];
	validator: (answerData: AnswerData, selectedAnswer?: Answer) => boolean;
}) => {
	const [variant, setVariant] = useState<BadgeVariantValues | undefined>(
		undefined,
	);
	const [confidence, setConfidence] = useState<Confidence | null>(null);
	const [correctness, setCorrectness] = useState<Correctness | null>(null);
	return (
		<>
			<Stack minHeight={350} h="100%" marginTop={8}>
				{questionInFocus.answerList.map((answer) => {
					return (
						<AnswerFeedback
							key={answer.id}
							answerData={answerData}
							answer={answer}
							setBadge={setVariant}
							setConfidence={setConfidence}
							setCorrectness={setCorrectness}
							selectedAnswers={selectedAnswers}
							validator={validator}
						/>
					);
				})}
			</Stack>
			{!!roundData ? (
				<AnswerFeedbackBadge
					confidence={confidence}
					variant={variant}
					correctness={correctness}
				/>
			) : null}
		</>
	);
};

export default MultiSelectFeedback;
