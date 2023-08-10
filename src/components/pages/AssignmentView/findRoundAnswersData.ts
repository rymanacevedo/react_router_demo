import { Answer, QuestionInFocus } from '../../../lib/validator';
import { Confidence } from './AssignmentTypes';

export const findSelectedAnswers = (questionInFocus: QuestionInFocus) => {
	const chosenAnswers: Answer[] = questionInFocus.answerList
		.filter((answer) => answer.selected)
		.map((answer) => ({
			answerId: answer.id,
			selectedOptionId: answer.selectedOptionId,
			self: answer.self,
		}));

	const selectedAnswers: Answer[] = chosenAnswers.map((item) => {
		let confidenceValue = 0;
		if (questionInFocus.confidence === Confidence.Sure) {
			confidenceValue = 100;
		} else if (questionInFocus.confidence === Confidence.PartSure) {
			confidenceValue = 50;
		}
		return { ...item, confidence: confidenceValue };
	});

	return selectedAnswers;
};

export const findRoundAnswersData = (questionInFocus: QuestionInFocus) => {
	const correctAnswerIds: number[] = [];
	questionInFocus.answerList.forEach((answer) => {
		if (answer.isCorrect) {
			correctAnswerIds.push(answer.id);
		}
	});
	return correctAnswerIds;
};
