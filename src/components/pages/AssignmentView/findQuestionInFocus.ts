export const findQuestionInFocus = (
	questionListDataPeram: { learningUnits: any },
	currentRoundQuestionListDataPeram: { questionList: any },
) => {
	//this function takes the questions and answers lists from each source and combines relevent data then produces the question that should be in focus
	const learningUnits = questionListDataPeram?.learningUnits;
	const questionList = currentRoundQuestionListDataPeram?.questionList.map(
		(question: {
			publishedQuestionId: any;
			answerList: any;
			name: string | undefined;
			questionRc: string | any;
			questionType: string | undefined;
			explanationRc: string | any;
			hasModalIntroduction: boolean | undefined;
			introductionRc: string | any;
		}) => {
			let updatedQuestion = question;
			learningUnits.forEach(
				(learningUnit: {
					questions: {
						publishedQuestionId: any;
						id: any;
						answers: any;
						name: string;
						questionRc: string;
						questionType: string;
						explanationRc: string;
						hasModalIntroduction: boolean | undefined;
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
							hasModalIntroduction,
							introductionRc,
						} = matchedQuestion[0];
						updatedQuestion = {
							...question,
							name: name,
							questionRc: questionRc,
							questionType: questionType,
							explanationRc: explanationRc,
							hasModalIntroduction: hasModalIntroduction,
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

	const firstUnansweredQuestion = questionList.find(
		(question: { answered: boolean }) => {
			return question.answered === false;
		},
	);

	return firstUnansweredQuestion || questionList[0];
};
