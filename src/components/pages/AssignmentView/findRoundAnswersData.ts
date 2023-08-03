import { QuestionInFocus } from '../../../lib/validator';
import { SelectedAnswer } from './AssignmentTypes';

export const findSelectedAnswers = (questionInFocus: QuestionInFocus) => {
	const chosenAnswers: SelectedAnswer[] = questionInFocus.answerList
		.filter((answer) => answer.selected)
		.map((answer) => ({
			answerId: answer.id,
			selectedOptionId: answer.selectedOptionId,
			self: answer.self,
		}));

	const selectedAnswers: SelectedAnswer[] = chosenAnswers.map((item) => {
		const confidenceValue =
			chosenAnswers.length === 1 && questionInFocus.confidence === 'Sure'
				? 100
				: 50;
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
