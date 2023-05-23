import { Checkbox } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import { SelectedAnswer } from '../../pages/AssignmentView/AssignmentTypes';
import { ChangeEvent, useEffect, useState } from 'react';

const MultiSelectInput = ({
	questionText,
	questionAnswerId,
	toggleAnswer,
	selectedAnswers,
	isDisabled,
}: {
	questionText: string;
	questionAnswerId: number | string;
	toggleAnswer: (answer: SelectedAnswer) => void;
	selectedAnswers?: SelectedAnswer[];
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
			borderColor={'#1e1f20'}
			variant={'multiSelect'}
			value={questionAnswerId}
			isChecked={Boolean(isChecked)}
			disabled={isDisabled}
			onChange={handleOnChange}>
			<RichContentComponent content={questionText} />
		</Checkbox>
	);
};

export default MultiSelectInput;
