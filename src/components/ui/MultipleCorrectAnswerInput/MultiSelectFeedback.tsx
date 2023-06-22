import { Box } from '@chakra-ui/react';

import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import AnswerFeedback from '../RefactorAnswerFeedback/AnswerFeedback';

const MultiSelectFeedback = ({
	questionInFocus,
	selectedAnswers,
	currentRoundAnswerOverLayData,
}: // inReview,
// revealAnswer,
{
	questionInFocus: QuestionInFocus;
	selectedAnswers: SelectedAnswer[];
	currentRoundAnswerOverLayData: CurrentRoundAnswerOverLayData;
	// inReview?: boolean;
	// revealAnswer?: boolean;
}) => {
	// useEffect(() => {
	// 	if (currentRoundAnswerOverLayData?.correctAnswerIds && selectedAnswers) {
	// 		const correctAnswerIds = currentRoundAnswerOverLayData?.correctAnswerIds;
	// 		const selectedAnswerIds = selectedAnswers.map(
	// 			(answer) => answer.answerId,
	// 		);
	// 		const allCorrectAnswersChosen = correctAnswerIds.every((id: number) =>
	// 			selectedAnswerIds.includes(id),
	// 		);
	// 		setWasCorrectAnswerChosen(
	// 			allCorrectAnswersChosen &&
	// 				correctAnswerIds.length === selectedAnswerIds.length,
	// 		);
	//
	// 		const partialCorrectAnswerChosen =
	// 			correctAnswerIds.some((id: number) => selectedAnswerIds.includes(id)) &&
	// 			!allCorrectAnswersChosen;
	// 		setWasPartialCorrectAnswerChosen(partialCorrectAnswerChosen);
	// 	}
	// }, [currentRoundAnswerOverLayData, revealAnswer]);
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
						selectedAnswers={selectedAnswers}
						roundFeedbackData={currentRoundAnswerOverLayData}
						answer={answer}
					/>
				);
			})}
		</Box>
	);
};

export default MultiSelectFeedback;
