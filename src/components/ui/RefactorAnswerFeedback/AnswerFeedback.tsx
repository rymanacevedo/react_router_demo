import { Checkbox } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import { useEffect, useState } from 'react';
import { BadgeVariantValues } from './AnswerFeedbackBadge';
import {
	Answer,
	AnswerData,
	QuestionInFocusAnswer,
} from '../../../lib/validator';

export type Correctness = 'incorrect' | 'correct' | "I don't know yet";
export type Confidence = 'idk' | 'sure' | 'unsure';
type Props = {
	answerData: AnswerData;
	selectedAnswers: Answer[];
	answer: QuestionInFocusAnswer;
	setBadge: (badge: BadgeVariantValues | undefined) => void;
	setConfidence: (status: Confidence | null) => void;
	setCorrectness: (correctness: Correctness | null) => void;
	validator: (answerData: AnswerData, selectedAnswer?: Answer) => boolean;
};

export default function AnswerFeedback({
	answerData,
	selectedAnswers,
	answer,
	setBadge,
	setConfidence,
	setCorrectness,
	validator,
}: Props) {
	const [match, setMatch] = useState<Answer | null>(null);
	const [checkbox, setCheckbox] = useState('multiSelect');
	// TODO: optimize this so it's not being called on every render
	const checkSelectedAnswer = (selectedAnswer: Answer | null) => {
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
		const isCorrect = validator(answerData, selectedAnswer);
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
		let matcher;
		if (answerData && answerData.answerList.length) {
			matcher = answerData.answerList.find((selectedAnswer) => {
				return Number(selectedAnswer.answerId) === answer.id;
			});
		} else {
			matcher = selectedAnswers.find((selectedAnswer) => {
				return Number(selectedAnswer.answerId) === answer.id;
			});
		}
		if (!matcher) return setMatch(null);
		setMatch(matcher);
	}, [answerData]);

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
			marginBottom={10}
			borderColor={'#1e1f20'}
			variant={checkbox}
			size="xxl"
			value={answer.id}
			isChecked={
				match !== null &&
				match.answerId === answer.id &&
				checkbox !== 'multiSelect'
			}>
			<RichContentComponent
				style={{
					color: answerData.correctAnswerIds ? '#6D758D' : 'inherit',
				}}
				content={answer.answerRc}
			/>
		</Checkbox>
	);
}
