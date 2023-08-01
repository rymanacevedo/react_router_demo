import React, { useEffect, useState } from 'react';
import { Badge, Checkbox, SlideFade, useUpdateEffect } from '@chakra-ui/react';
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
	const [text, setText] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);
	const [variant, setVariant] = useState('');
	const isIndeterminate = status === 'indeterminate';
	const isChecked = status === 'checked';

	const renderSelectedAnswer = (a: SelectedAnswer) => {
		if (a.id === answer.id) {
			if (a.confidence === Confidence.PartSure) {
				setStatus('indeterminate');
				setText('I am unsure');
				setVariant('ampSecondary');
				setIsEnabled(true);
			}

			if (a.confidence === Confidence.Sure) {
				setIsEnabled(true);
				setText('I am sure');
				setVariant('ampPrimary');
				setStatus('checked');
			}
			if (a.confidence === Confidence.NotSure) {
				setStatus('checked');
			}
		} else {
			setIsEnabled(false);
			setText('');
			setVariant('');
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
			value={answer?.id}
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
			<SlideFade in={isEnabled}>
				<Badge variant={variant}>{text}</Badge>
			</SlideFade>
			<RichContentComponent
				style={{
					position: 'relative',
					top: 5,
					bottom: 0,
					left: 0,
					right: 0,
					transform: `${
						isEnabled ? 'translateY(0px)' : 'translateY(-16.7812px)'
					}`,
					transition: 'transform 0.3s ease-in-out',
				}}
				content={answer.answerRc}
			/>
		</Checkbox>
	);
}
