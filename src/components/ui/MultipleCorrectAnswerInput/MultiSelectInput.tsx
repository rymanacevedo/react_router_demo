import { Checkbox } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import { ChangeEvent, useEffect, useState } from 'react';
import { Answer } from '../../../lib/validator';

const MultiSelectInput = ({
	questionText,
	questionAnswerId,
	toggleAnswer,
	selectedAnswers,
	isDisabled,
}: {
	questionText: string;
	questionAnswerId: number | string;
	toggleAnswer: (answer: Answer) => void;
	selectedAnswers?: Answer[];
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
			marginBottom={10}
			size="xxl"
			borderColor="#1e1f20"
			variant="multiSelect"
			value={questionAnswerId}
			isChecked={Boolean(isChecked)}
			disabled={isDisabled}
			onChange={handleOnChange}>
			<RichContentComponent content={questionText} />
		</Checkbox>
	);
};

export default MultiSelectInput;
