type QInFocusDataType = {
	correctAnswerIds: string;
	answerList: {
		selected: boolean;
		id: number;
		selectedOptionId: number | null;
		self: string;
	}[];
};

export const findRoundAnswersData = (
	QInFocusData: QInFocusDataType,
	correctAnsIds?: boolean,
) => {
	const correctAnswerIds: number[] = [];
	const answersChosen = QInFocusData.answerList
		.map(
			(answer: {
				[x: string]: any;
				selected: boolean;
				id: number;
				selectedOptionId: number | null;
				self: string;
			}) => {
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
			},
		)
		.filter((item: any) => item !== null);
	if (!correctAnsIds) {
		return answersChosen.map((item: any) => {
			if (answersChosen.length === 1) {
				return { ...item, confidence: 100 };
			} else {
				return { ...item, confidence: 50 };
			}
		});
	} else {
		return correctAnswerIds;
	}
};
