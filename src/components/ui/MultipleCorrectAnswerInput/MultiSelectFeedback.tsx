import { Box } from '@chakra-ui/react';

import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
} from '../../pages/AssignmentView/AssignmentTypes';
import AnswerFeedback, {
	Correctness,
} from '../RefactorAnswerFeedback/AnswerFeedback';
import AnswerFeedbackBadge, {
	BadgeVariantValues,
} from '../RefactorAnswerFeedback/AnswerFeedbackBadge';
import { useState } from 'react';

const MultiSelectFeedback = ({
	questionInFocus,
	roundFeedbackData,
}: // inReview,
// revealAnswer,
{
	questionInFocus: QuestionInFocus;
	roundFeedbackData: CurrentRoundAnswerOverLayData;
	// inReview?: boolean;
	// revealAnswer?: boolean;
}) => {
	const [variant, setVariant] = useState<BadgeVariantValues | undefined>(
		undefined,
	);
	const [confidence, setConfidence] = useState('');
	const [correctness, setCorrectness] = useState<Correctness | null>(null);
	return (
		<Box
			marginTop="34px"
			display="flex"
			flexDirection={'column'}
			justifyContent="space-between"
			minHeight={350}
			h="100%">
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
			<AnswerFeedbackBadge
				confidence={confidence}
				variant={variant}
				correctness={correctness}
			/>
		</Box>
	);
};

export default MultiSelectFeedback;
