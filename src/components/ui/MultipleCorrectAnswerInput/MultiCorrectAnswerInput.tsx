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
	toggleAnswer: (answer: SelectedAnswer) => void;
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
			className={'multiselect-label-hover-effect'}
			variant={'multiCorrectAnswer'}
			value={questionAnswerId}
			isChecked={Boolean(isChecked)}
			disabled={isDisabled}
			onChange={handleOnChange}>
			<RichContentComponent content={questionText} />
		</Checkbox>
	);
};

export default MultiCorrectAnswerInput;
