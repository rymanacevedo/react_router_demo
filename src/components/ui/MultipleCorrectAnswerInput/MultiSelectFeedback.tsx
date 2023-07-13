import { Stack } from '@chakra-ui/react';

import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
} from '../../pages/AssignmentView/AssignmentTypes';
import AnswerFeedback, {
	Confidence,
	Correctness,
} from '../RefactorAnswerFeedback/AnswerFeedback';
import AnswerFeedbackBadge, {
	BadgeVariantValues,
} from '../RefactorAnswerFeedback/AnswerFeedbackBadge';
import { useState } from 'react';

const MultiSelectFeedback = ({
	questionInFocus,
	roundFeedbackData,
}: {
	questionInFocus: QuestionInFocus;
	roundFeedbackData: CurrentRoundAnswerOverLayData;
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
							roundFeedbackData={roundFeedbackData}
							answer={answer}
							setBadge={setVariant}
							setConfidence={setConfidence}
							setCorrectness={setCorrectness}
						/>
					);
				})}
			</Stack>
			<AnswerFeedbackBadge
				confidence={confidence}
				variant={variant}
				correctness={correctness}
			/>
		</>
	);
};

export default MultiSelectFeedback;
