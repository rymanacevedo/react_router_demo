import { Checkbox } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import { SelectedAnswer } from '../../pages/AssignmentView/AssignmentTypes';
import { ChangeEvent, useEffect, useState } from 'react';

const MultiCorrectAnswerInput = ({
	questionText,
	questionAnswerId,
	toggleAnswer,
	selectedAnswers,
	isDisabled,
}: {
	questionText: string;
	questionAnswerId: number | string;
	toggleAnswer: (answerObject: SelectedAnswer) => void;
	selectedAnswers?: Array<SelectedAnswer>;
	isDisabled?: boolean;
}) => {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		setIsChecked(
			Boolean(
				selectedAnswers?.find(
					(answer) => Number(answer.answerId) === Number(questionAnswerId),
				),
			),
		);
	}, [selectedAnswers, questionAnswerId]);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		toggleAnswer({
			answerId: Number(e.target.value),
			selectedOptionId: 0,
			self: null,
		});
	};
	return (
		<Checkbox
			style={{
				display: 'flex',
				marginBottom: '12px',
				cursor: 'pointer',
			}}
			iconSize="1rem"
			className={'multiselect-label-hover-effect'}
			variant={'multiCorrectAnswer'}
			value={questionAnswerId}
			isChecked={Boolean(isChecked)}
			disabled={isDisabled}
			onChange={handleOnChange}>
			{' '}
			<RichContentComponent
				style={{
					position: 'relative',
					top: 5,
					bottom: 0,
					left: 0,
					right: 0,
					transform: 'translateY(-5.7812px)',
					transition: 'transform 0.3s ease-in-out',
				}}
				content={questionText}
			/>
		</Checkbox>
	);
};

export default MultiCorrectAnswerInput;
