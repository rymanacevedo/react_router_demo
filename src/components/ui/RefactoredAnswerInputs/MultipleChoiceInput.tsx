import React, { useEffect, useState } from 'react';
import { Checkbox, useUpdateEffect } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import CustomIcon from '../MultipleChoiceAnswerInput/MultiChoiceIcon';
import { Confidence } from '../../pages/AssignmentView/AssignmentTypes';
import { QuestionInFocusAnswer } from '../../../lib/validator';

export type SelectedAnswer = {
	id: number | null;
	confidence: Confidence;
};

type MultipleChoiceInputProps = {
	answer: QuestionInFocusAnswer;
	selectedAnswer: SelectedAnswer;
	setSelectedAnswer: (value: SelectedAnswer) => void;
	setAnswerUpdated: (value: boolean) => void;
	hasConfidenceEnabled: boolean;
	handleAnsweredQuestions: (action?: string) => void;
};

export default function MultipleChoiceInput({
	answer,
	selectedAnswer,
	setSelectedAnswer,
	setAnswerUpdated,
	hasConfidenceEnabled,
	handleAnsweredQuestions,
}: MultipleChoiceInputProps) {
	const [status, setStatus] = useState('unchecked');
	const isIndeterminate = status === 'indeterminate';
	const isChecked = status === 'checked';

	const renderSelectedAnswer = (a: SelectedAnswer) => {
		if (a.id === answer.id) {
			if (a.confidence === Confidence.PartSure) {
				setStatus('indeterminate');
			} else if (
				a.confidence === Confidence.Sure ||
				a.confidence === Confidence.NotSure
			) {
				setStatus('checked');
			} else {
				setStatus('unchecked'); // Assuming you want to set to 'unchecked' if none of the above conditions are met.
			}
		} else {
			setStatus('unchecked');
		}
	};

	useEffect(() => {
		renderSelectedAnswer(selectedAnswer);
	}, [selectedAnswer]);

	useUpdateEffect(() => {
		setAnswerUpdated(true);
	}, [selectedAnswer]);

	const checkStatus = (a: QuestionInFocusAnswer) => {
		if (hasConfidenceEnabled) {
			// IDK
			if (a.id === 1) {
				switch (status) {
					case 'unchecked':
						setStatus('checked');
						setSelectedAnswer({ id: a.id, confidence: Confidence.NotSure });
						handleAnsweredQuestions();
						break;
					case 'checked':
						setStatus('unchecked');
						setSelectedAnswer({ id: null, confidence: Confidence.NA });
						handleAnsweredQuestions('delete');
						break;
				}
			} else {
				switch (status) {
					case 'unchecked':
						setStatus('indeterminate');
						setSelectedAnswer({ id: a.id, confidence: Confidence.PartSure });
						handleAnsweredQuestions();
						break;
					case 'indeterminate':
						setStatus('checked');
						setSelectedAnswer({ id: a.id, confidence: Confidence.Sure });
						handleAnsweredQuestions();
						break;
					case 'checked':
						setStatus('unchecked');
						setSelectedAnswer({ id: null, confidence: Confidence.NA });
						handleAnsweredQuestions('delete');
						break;
				}
			}
		} else {
			switch (status) {
				case 'unchecked':
					setStatus('checked');
					setSelectedAnswer({ id: a.id, confidence: Confidence.Sure });
					handleAnsweredQuestions();
					break;
				case 'checked':
					setStatus('unchecked');
					setSelectedAnswer({ id: null, confidence: Confidence.NA });
					handleAnsweredQuestions('delete');
					break;
			}
		}
	};
	return (
		<Checkbox
			name="answerChoice"
			value={answer.id}
			className="label-hover-effect"
			variant="multiChoiceAnswer"
			colorScheme="transparent"
			size="xxl"
			icon={
				<CustomIcon isChecked={isChecked} isIndeterminate={isIndeterminate} />
			}
			isChecked={isChecked}
			isIndeterminate={isIndeterminate}
			onChange={() => checkStatus(answer)}>
			<RichContentComponent content={answer.answerRc} />
		</Checkbox>
	);
}
