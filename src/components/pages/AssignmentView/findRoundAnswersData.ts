import { QuestionInFocus } from '../../../lib/validator';

export const findRoundAnswersData = (
	QInFocusData: QuestionInFocus,
	correctAnsIds?: boolean,
) => {
	const correctAnswerIds: number[] = [];
	const answersChosen = QInFocusData.answerList
		.map((answer) => {
			if (answer.isCorrect) {
				correctAnswerIds.push(answer.id);
			}
			if (answer.selected) {
				return {
					answerId: answer.id,
					selectedOptionId: answer.selectedOptionId
						? answer.selectedOptionId
						: 0,
					self: answer.self,
				};
			} else {
				return null;
			}
		})
		.filter((item: any) => item !== null);
	if (!correctAnsIds) {
		return answersChosen.map((item: any) => {
			if (answersChosen.length === 1 && QInFocusData.confidence === 'Sure') {
				return { ...item, confidence: 100 };
			} else {
				return { ...item, confidence: 50 };
			}
		});
	} else {
		return correctAnswerIds;
	}
};
