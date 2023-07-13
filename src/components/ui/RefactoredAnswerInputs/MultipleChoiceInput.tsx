import React, { useEffect, useState } from 'react';
import { Badge, Checkbox, SlideFade } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import CustomIcon from '../MultipleChoiceAnswerInput/MultiChoiceIcon';
import { QuestionInFocusAnswer } from '../../pages/AssignmentView/AssignmentTypes';

type MultipleChoiceInputProps = {
	answer: QuestionInFocusAnswer;
	selectedAnswer: number | null;
	setSelectedAnswer: (value: number | null) => void;
	setAnswerUpdated: (value: boolean) => void;
};

export default function MultipleChoiceInput({
	answer,
	selectedAnswer,
	setSelectedAnswer,
	setAnswerUpdated,
}: MultipleChoiceInputProps) {
	const [firstRender, setFirstRender] = useState(() => true);
	const [status, setStatus] = useState('unchecked');
	const [text, setText] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);
	const [variant, setVariant] = useState('');
	const isIndeterminate = status === 'indeterminate';
	const isChecked = status === 'checked';

	const renderSelectedAnswer = (a: number | null) => {
		if (a === answer.id) {
			setIsEnabled(true);
			setText('I am sure');
			setVariant('ampPrimary');
			setStatus('checked');

			//     TODO: check if 50% confidence is selected
			//     if (answer.confidence === 50) {
			//     setStatus('indeterminate');
			//     setText('I am unsure');
			//     setVariant('ampSecondary');
			//     setIsEnabled(true);
		} else {
			setIsEnabled(false);
			setText('');
			setVariant('');
			setStatus('unchecked');
		}
	};

	useEffect(() => {
		// strict mode makes me do this :(
		if (!firstRender) {
			setAnswerUpdated(true);
		}

		if (firstRender) {
			setFirstRender(false);
		}
		renderSelectedAnswer(selectedAnswer);
	}, [selectedAnswer]);

	const checkStatus = (a: QuestionInFocusAnswer) => {
		// TODO: IDK
		// if (IDK) {
		//     switch (status) {
		//         case 'unchecked':
		//             setStatus('checked');
		//             setText('');
		//             setIsEnabled(false);
		//             setVariant('ampSecondary');
		//             setAnswerObject({
		//                 ...answerObject,
		//                 answerId: 0,
		//                 confidence: 0,
		//             });
		//             setIDKResponse(true);
		//             break;
		//         case 'checked':
		//             setIsEnabled(false);
		//             setText('');
		//             setStatus('unchecked');
		//             setAnswerObject({
		//                 ...answerObject,
		//                 answerId: 0,
		//                 confidence: 0,
		//             });
		//             setIDKResponse(false);
		//     }
		// } else

		switch (status) {
			case 'unchecked':
				setStatus('checked');
				setSelectedAnswer(a.id);
				break;
			// TODO: check if 50% confidence is selected
			// case 'indeterminate':
			// setStatus('checked');
			// setSelectedAnswer(a.id);
			// 	break;
			case 'checked':
				setStatus('unchecked');
				setSelectedAnswer(null);
				break;
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
			icon={<CustomIcon />}
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
