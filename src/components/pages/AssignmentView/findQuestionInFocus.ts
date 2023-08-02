import { Confidence, Correctness } from './AssignmentTypes';
import {
	LearningUnit,
	LearningUnitQuestion,
	ModuleData,
	QuestionInFocus,
	RoundData,
} from '../../../lib/validator';

/**
 * Finds the question in focus
 * @param moduleData
 * @param roundData
 * @param inReview
 * @param viewCorrect
 * @param questionIndex
 */
export const findQuestionInFocus = (
	moduleData: ModuleData,
	roundData: RoundData,
	inReview: boolean,
	viewCorrect: boolean,
	questionIndex?: number,
): QuestionInFocus => {
	const learningUnits = moduleData?.learningUnits;
	const questionList: QuestionInFocus[] = roundData?.questionList.map(
		(question: QuestionInFocus) => {
			let updatedQuestion = question;
			learningUnits.forEach((learningUnit: LearningUnit) => {
				//matched questions
				const matchedQuestion: LearningUnitQuestion =
					learningUnit?.questions.filter((q: LearningUnitQuestion) => {
						return q.id === question?.publishedQuestionId;
					})[0];
				if (matchedQuestion) {
					let updatedAnswerList = question?.answerList;
					const {
						name,
						questionRc,
						questionType,
						explanationRc,
						hasModuleIntroduction,
						introductionRc,
					} = matchedQuestion;
					updatedQuestion = {
						...question,
						moreInformationRc: learningUnit?.moreInformationRc,
						name,
						questionRc,
						questionType,
						explanationRc,
						hasModuleIntroduction,
						introductionRc,
						answerList: [
							...updatedAnswerList.map((answer) => {
								let updatedAnswerObj = answer;
								matchedQuestion.answers.forEach((learningUnitAnswer) => {
									//matched answers
									if (answer.publishedAnswerId === learningUnitAnswer.id) {
										updatedAnswerObj = {
											...answer,
											answerRc: learningUnitAnswer.answerRc,
											optionRc: learningUnitAnswer.optionRc,
											isCorrect: learningUnitAnswer.isCorrect,
										};
									}
								});
								return updatedAnswerObj;
							}),
						],
					} as QuestionInFocus;
				}
			});
			return updatedQuestion;
		},
	);
	if (inReview && questionIndex !== undefined) {
		return questionList.filter((q: QuestionInFocus) => {
			if (viewCorrect) {
				return (
					q.confidence === Confidence.Sure &&
					q.correctness === Correctness.Correct
				);
			} else {
				return !(
					q.confidence === Confidence.Sure &&
					q.correctness === Correctness.Correct
				);
			}
		})[questionIndex];
	} else if (questionIndex !== undefined && questionList[questionIndex]) {
		return questionList[questionIndex];
	} else {
		const firstUnansweredQuestion = questionList.find(
			(question) => question.confidence === Confidence.NA,
		);
		return firstUnansweredQuestion || questionList[0];
	}
};
