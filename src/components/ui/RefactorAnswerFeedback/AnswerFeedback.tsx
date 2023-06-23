import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocusAnswer,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import { Checkbox } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import { useEffect, useState } from 'react';
import { BadgeVariantValues } from './AnswerFeedbackBadge';

export type Correctness = 'incorrect' | 'correct' | "I don't know yet";
export type Confidence = 'idk' | 'sure' | 'unsure';
type Props = {
	roundFeedbackData: CurrentRoundAnswerOverLayData;
	answer: QuestionInFocusAnswer;
	setBadge: (badge: BadgeVariantValues | undefined) => void;
	setConfidence: (status: Confidence | null) => void;
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

		if (roundData.answerList.length === 1) {
			return correctAnswerIds.some((id: number) =>
				roundData.answerList.map((a) => a.answerId).includes(id),
			);
		}

		return correctAnswerIds.every((id: number) =>
			roundData.answerList.map((a) => a.answerId).includes(id),
		);
	}
	// TODO: optimize this so it's not being called on every render
	const checkSelectedAnswer = (selectedAnswer: SelectedAnswer | null) => {
		let badgeVariant: BadgeVariantValues | undefined = undefined;
		let confidence: Confidence | null = null;
		let correctnessText: Correctness | null = null;
		if (!selectedAnswer) {
			confidence = 'idk';
			correctnessText = "I don't know yet";
			badgeVariant = 'ampNeutralFilled';
			return {
				status: confidence,
				checkbox: 'multiSelect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		}
		const isCorrect = isEveryAnswerCorrect(roundFeedbackData);
		if (isCorrect && selectedAnswer.confidence === 100) {
			badgeVariant = 'ampDarkSuccess';
			confidence = 'sure';
			correctnessText = 'correct';
			return {
				status: confidence,
				checkbox: 'multiSelectSureCorrect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		} else if (isCorrect && selectedAnswer.confidence === 50) {
			badgeVariant = 'ampDarkSuccessOutline';
			confidence = 'unsure';
			correctnessText = 'correct';
			return {
				status: confidence,
				checkbox: 'multiSelectUnsureCorrect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		} else if (!isCorrect && selectedAnswer.confidence === 100) {
			badgeVariant = 'ampDarkError';
			confidence = 'sure';
			correctnessText = 'incorrect';
			return {
				status: confidence,
				checkbox: 'multiSelectSureIncorrect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		} else if (!isCorrect && selectedAnswer.confidence === 50) {
			badgeVariant = 'ampDarkErrorOutline';
			confidence = 'unsure';
			correctnessText = 'incorrect';
			return {
				status: confidence,
				checkbox: 'multiSelectUnsureIncorrect',
				badge: badgeVariant,
				correctness: correctnessText,
			};
		}
		return {
			status: confidence,
			checkbox: 'multiSelect',
			badge: badgeVariant,
			correctness: correctnessText,
		};
	};

	useEffect(() => {
		const m = roundFeedbackData.answerList.find((selectedAnswer) => {
			return Number(selectedAnswer.answerId) === answer.id;
		});
		if (!m) return setMatch(null);
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
			isChecked={match !== null && match.answerId === answer.id}>
			<RichContentComponent
				style={{
					color: roundFeedbackData.correctAnswerIds ? '#6D758D' : 'inherit',
				}}
				content={answer.answerRc}
			/>
		</Checkbox>
	);
}
