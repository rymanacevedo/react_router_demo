import { Confidence, Correctness, QuestionInFocus } from './AssignmentTypes';

export const findQuestionInFocus = (
	questionListDataPeram: { learningUnits: any },
	currentRoundQuestionListDataPeram: { questionList: any },
	inReview: boolean,
	viewCorrect: boolean,
) => {
	//this function takes the questions and answers lists from each source and combines relevent data then produces the question that should be in focus
	const learningUnits = questionListDataPeram?.learningUnits;
	const questionList = currentRoundQuestionListDataPeram?.questionList.map(
		(question: {
			publishedQuestionId: any;
			answerList: any;
			name: string | undefined;
			questionRc: string | any;
			moreInformationRc: string;
			questionType: string | undefined;
			explanationRc: string | any;
			hasModuleIntroduction: boolean;
			introductionRc: string | any;
		}) => {
			let updatedQuestion = question;
			learningUnits.forEach(
				(learningUnit: {
					moreInformationRc: string;
					questions: {
						moreInformationRc: string;
						publishedQuestionId: any;
						id: any;
						answers: any;
						name: string;
						questionRc: string;
						questionType: string;
						explanationRc: string;
						hasModuleIntroduction: boolean;
						introductionRc: string;
					}[];
				}) => {
					//matched questions
					let matchedQuestion = learningUnit?.questions.filter(
						(unitQuestion) => {
							return unitQuestion.id === question?.publishedQuestionId;
						},
					);
					if (matchedQuestion.length) {
						let updatedAnswerList = question?.answerList;
						const {
							name,
							questionRc,
							questionType,
							explanationRc,
							hasModuleIntroduction,
							introductionRc,
						} = matchedQuestion[0];
						updatedQuestion = {
							...question,
							moreInformationRc: learningUnit?.moreInformationRc,
							name: name,
							questionRc: questionRc,
							questionType: questionType,
							explanationRc: explanationRc,
							hasModuleIntroduction: hasModuleIntroduction,
							introductionRc: introductionRc,
							answerList: [
								...updatedAnswerList.map(
									(answer: {
										publishedAnswerId: any;
										answerRc: string | any;
										optionRc: string | any;
									}) => {
										let updatedAnswerObj = answer;
										matchedQuestion[0].answers.forEach(
											(learningUnitAnswer: {
												id: any;
												answerRc: any;
												optionRc: any;
											}) => {
												//matched answers
												if (
													answer.publishedAnswerId === learningUnitAnswer.id
												) {
													updatedAnswerObj = {
														...answer,
														answerRc: learningUnitAnswer.answerRc,
														optionRc: learningUnitAnswer.optionRc,
													};
												}
											},
										);
										return updatedAnswerObj;
									},
								),
							],
						};
					}
				},
			);
			return updatedQuestion;
		},
	);
	if (inReview) {
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
		});
	} else {
		const firstUnansweredQuestion = questionList.find(
			(question: { answered: boolean }) => {
				return !question.answered;
			},
		);

		return firstUnansweredQuestion || questionList[0];
	}
};
