import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocusAnswer,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import { Checkbox } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import { useEffect, useState } from 'react';
import { BadgeVariantValues } from './AnswerFeedbackBadge';

export type Correctness = 'incorrect' | 'correct';
type Props = {
	roundFeedbackData: CurrentRoundAnswerOverLayData;
	answer: QuestionInFocusAnswer;
	setBadge: (badge: BadgeVariantValues | undefined) => void;
	setConfidence: (status: string) => void;
	setCorrectness: (correctness: Correctness | null) => void;
};

export default function AnswerFeedback({
	roundFeedbackData,
	answer,
	setBadge,
	setConfidence,
	setCorrectness,
}: Props) {
	const [match, setMatch] = useState<SelectedAnswer | null>(null);
	const [checkbox, setCheckbox] = useState('multiSelect');

	function isEveryAnswerCorrect(roundData: CurrentRoundAnswerOverLayData) {
		const correctAnswerIds = roundData.correctAnswerIds;
		if (!correctAnswerIds)
			throw Error('No correct answer ids, are you in review?');
		return correctAnswerIds.every((id: number) =>
			roundData.answerList.map((a) => a.answerId).includes(id),
		);
	}
	// TODO: optimize this so it's not being called on every render
	const checkSelectedAnswer = (selectedAnswer: SelectedAnswer | null) => {
		if (!selectedAnswer)
			return {
				checkbox: 'multiSelect',
				badge: undefined,
				status: '',
				correctness: null,
			};
		const isCorrect = isEveryAnswerCorrect(roundFeedbackData);
		let badgeVariant: BadgeVariantValues | undefined = undefined;
		let statusText = '';
		let correctnessText: Correctness | null = null;
		if (isCorrect && selectedAnswer.confidence === 100) {
			badgeVariant = 'ampDarkSuccess';
			statusText = 'sure';
			correctnessText = 'correct';
			return {
				status: statusText,
				checkbox: 'multiSelectSureCorrect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		} else if (isCorrect && selectedAnswer.confidence === 50) {
			badgeVariant = 'ampDarkSuccessOutline';
			statusText = 'unsure';
			correctnessText = 'correct';
			return {
				status: statusText,
				checkbox: 'multiSelectUnsureCorrect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		} else if (!isCorrect && selectedAnswer.confidence === 100) {
			badgeVariant = 'ampDarkError';
			statusText = 'sure';
			correctnessText = 'incorrect';
			return {
				status: statusText,
				checkbox: 'multiSelectSureIncorrect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		} else if (!isCorrect && selectedAnswer.confidence === 50) {
			badgeVariant = 'ampDarkErrorOutline';
			statusText = 'unsure';
			correctnessText = 'incorrect';
			return {
				status: statusText,
				checkbox: 'multiSelectUnsureIncorrect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		} else {
			console.log('idk');
			return {
				status: statusText,
				checkbox: 'multiSelect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		}
	};

	useEffect(() => {
		const m = roundFeedbackData.answerList.find((selectedAnswer) => {
			return Number(selectedAnswer.answerId) === answer.id;
		});
		if (!m) return;

		setMatch(m);
	}, [roundFeedbackData, answer]);

	useEffect(() => {
		const {
			checkbox: c,
			badge: b,
			status: s,
			correctness: cr,
		} = checkSelectedAnswer(match);
		setCheckbox(c);
		setBadge(b);
		setConfidence(s);
		setCorrectness(cr);
	}, [match]);

	return (
		<Checkbox
			marginBottom={25}
			variant={checkbox}
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
