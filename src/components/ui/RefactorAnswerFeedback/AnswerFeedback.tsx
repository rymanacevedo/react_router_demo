import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocusAnswer,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import { Checkbox } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import { useCallback, useEffect, useState } from 'react';

type Props = {
	selectedAnswers: SelectedAnswer[];
	roundFeedbackData: CurrentRoundAnswerOverLayData;
	answer: QuestionInFocusAnswer;
};

export default function AnswerFeedback({
	selectedAnswers,
	roundFeedbackData,
	answer,
}: Props) {
	const [match, setMatch] = useState<SelectedAnswer | null>(null);

	useEffect(() => {
		const m = selectedAnswers.find((selectedAnswer) => {
			return Number(selectedAnswer.answerId) === answer.id;
		});
		if (!m) return;

		setMatch(m);
	}, [selectedAnswers, roundFeedbackData, answer]);

	function isEveryAnswerCorrect(
		answers: SelectedAnswer[],
		roundData: CurrentRoundAnswerOverLayData,
	) {
		const correctAnswerIds = roundData.correctAnswerIds;
		if (!correctAnswerIds)
			throw Error('No correct answer ids, are you in review?');
		return correctAnswerIds.every((id: number) =>
			answers.map((a) => a.answerId).includes(id),
		);
	}
	const checkSelectedAnswer = useCallback(
		(selectedAnswer: SelectedAnswer | null) => {
			if (!selectedAnswer) return 'multiSelect';
			const isCorrect = isEveryAnswerCorrect(
				selectedAnswers,
				roundFeedbackData,
			);
			if (isCorrect && selectedAnswer.confidence === 100) {
				console.log('success and sure');
				return 'multiSelectSureCorrect';
			} else if (isCorrect && selectedAnswer.confidence === 50) {
				console.log('unsure and sure');
				return 'multiSelectUnsureCorrect';
			} else if (!isCorrect && selectedAnswer.confidence === 100) {
				console.log('incorrect and sure');
				return 'multiSelectSureIncorrect';
			} else if (!isCorrect && selectedAnswer.confidence === 50) {
				console.log('incorrect and unsure');
				return 'multiSelectUnsureIncorrect';
			} else {
				console.log('idk');
				return 'multiSelect';
			}
		},
		[selectedAnswers, roundFeedbackData],
	);

	return (
		<Checkbox
			marginBottom={25}
			variant={checkSelectedAnswer(match)}
			value={answer.id}
			isChecked={match !== null}>
			<RichContentComponent
				style={{
					color: roundFeedbackData.correctAnswerIds ? '#6D758D' : 'inherit',
				}}
				content={answer.answerRc}
			/>
		</Checkbox>
	);
}
