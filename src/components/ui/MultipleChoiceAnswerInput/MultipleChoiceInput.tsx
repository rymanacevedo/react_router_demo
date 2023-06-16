import { ChangeEvent, useEffect, useState } from 'react';
import { Badge, Checkbox, SlideFade } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import CustomIcon from './MultiChoiceIcon';
import { SelectedAnswer } from '../../pages/AssignmentView/AssignmentTypes';

const MultipleChoiceInput = ({
	questionText,
	questionAnswerId,
	addAnswer,
	selectedAnswers,
	IDK,
	clearSelection,
	setClearSelection,
	isDisabled,
	setIDKResponse,
}: {
	questionText: string;
	questionAnswerId: number | string;
	addAnswer: (answerObject: any) => void;
	selectedAnswers?: SelectedAnswer[];
	IDK?: boolean;
	clearSelection?: boolean;
	setClearSelection?: (arg: boolean) => void;
	isDisabled?: boolean;
	setIDKResponse: (arg: boolean) => void;
}) => {
	const [status, setStatus] = useState('unchecked');
	const [text, setText] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);
	const [variant, setVariant] = useState('');
	const [answerObject, setAnswerObject] = useState({
		answerId: 0,
		confidence: 0,
		selectedOptionId: 0,
		self: null,
	});
	const isIndeterminate = status === 'indeterminate';
	const isChecked = status === 'checked';

	useEffect(() => {
		addAnswer(answerObject);
	}, [answerObject]);

	function checkSelectedAnswers(
		selectedAnswersArg: SelectedAnswer[],
		questionAnswerIdArg: string | number,
	) {
		const match = selectedAnswersArg.find(
			(answer) => Number(answer.answerId) === Number(questionAnswerIdArg),
		);

		if (IDK) {
			if (Boolean(selectedAnswersArg.length)) {
				setIsEnabled(false);
				setText('');
				setStatus('unchecked');
				setIDKResponse(false);
			} else if (clearSelection) {
				setIsEnabled(false);
				setText('');
				setStatus('unchecked');
				setIDKResponse(false);
				if (setClearSelection) {
					setClearSelection(false);
				}
			}
		} else if (match) {
			if (match.confidence === 50) {
				setStatus('indeterminate');
				setText('I am unsure');
				setVariant('ampSecondary');
				setIsEnabled(true);
			}
		} else {
			setIsEnabled(false);
			setText('');
			setStatus('unchecked');
		}
	}
	useEffect(() => {
		if (selectedAnswers) {
			checkSelectedAnswers(selectedAnswers, questionAnswerId);
		}
	}, [selectedAnswers]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const checkStatus = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (IDK) {
			switch (status) {
				case 'unchecked':
					setStatus('checked');
					setText('');
					setIsEnabled(false);
					setVariant('ampSecondary');
					setAnswerObject({
						...answerObject,
						answerId: 0,
						confidence: 0,
					});
					setIDKResponse(true);
					break;
				case 'checked':
					setIsEnabled(false);
					setText('');
					setStatus('unchecked');
					setAnswerObject({
						...answerObject,
						answerId: 0,
						confidence: 0,
					});
					setIDKResponse(false);
			}
		} else {
			switch (status) {
				case 'unchecked':
					setStatus('indeterminate');
					setText('I am unsure');
					setIsEnabled(true);
					setVariant('ampSecondary');
					setAnswerObject({
						...answerObject,
						answerId: Number(target.value),
						confidence: 50,
					});
					break;
				case 'indeterminate':
					setStatus('checked');
					setText('I am sure');
					setVariant('ampPrimary');
					setAnswerObject({
						...answerObject,
						answerId: Number(target.value),
						confidence: 100,
					});
					break;
				case 'checked':
					setIsEnabled(false);
					setText('');
					setStatus('unchecked');
					setAnswerObject({
						...answerObject,
						answerId: Number(target.value),
						confidence: 0,
					});
			}
		}
	};
	return (
		<Checkbox
			style={{
				display: 'flex',
				marginBottom: '25px',
				cursor: 'pointer',
			}}
			className={'label-hover-effect'}
			variant={'multiChoiceAnswer'}
			colorScheme={'transparent'}
			value={questionAnswerId}
			size={'4rem'}
			icon={
				<CustomIcon isIndeterminate={isIndeterminate} isChecked={isChecked} />
			}
			isChecked={isChecked}
			disabled={isDisabled}
			isIndeterminate={isIndeterminate}
			onChange={(e) => checkStatus(e)}>
			<SlideFade in={isEnabled} unmountOnExit>
				<Badge variant={variant}>{text}</Badge>
			</SlideFade>
			<RichContentComponent content={questionText} />
		</Checkbox>
	);
};

export default MultipleChoiceInput;
