import { ChangeEvent, useEffect, useState } from 'react';
import { Badge, Checkbox, Slide, SlideFade } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import CustomIcon from './CustomIcon';
import { AnswerObject } from '../../pages/AssignmentView';

const AnswerInput = ({
	questionText,
	questionAnswerId,
	addAnswer,
	selectedAnswers,
	IDK,
	clearSelection,
	setClearSelection,
}: {
	questionText: string;
	questionAnswerId: number | string;
	addAnswer: (answerObject: any) => void;
	selectedAnswers?: AnswerObject[];
	IDK?: boolean;
	clearSelection?: boolean;
	setClearSelection?: (arg: boolean) => void;
}) => {
	const [status, setStatus] = useState('unchecked');
	const [text, setText] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);
	const [variant, setVariant] = useState('');
	const [answerObject, setAnswerObject] = useState({
		answerId: '',
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
		selectedAnswersArg: AnswerObject[],
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
			} else if (clearSelection) {
				setIsEnabled(false);
				setText('');
				setStatus('unchecked');
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
						answerId: '',
						confidence: 0,
					});
					break;
				case 'checked':
					setIsEnabled(false);
					setText('');
					setStatus('unchecked');
					setAnswerObject({
						...answerObject,
						answerId: '',
						confidence: 0,
					});
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
						answerId: target.value,
						confidence: 50,
					});
					break;
				case 'indeterminate':
					setStatus('checked');
					setText('I am sure');
					setVariant('ampPrimary');
					setAnswerObject({
						...answerObject,
						answerId: target.value,
						confidence: 100,
					});
					break;
				case 'checked':
					setIsEnabled(false);
					setText('');
					setStatus('unchecked');
					setAnswerObject({
						...answerObject,
						answerId: target.value,
						confidence: 0,
					});
			}
		}
	};
	return (
		<>
			<Checkbox
				className={'label-hover-effect'}
				variant={'answer'}
				colorScheme={'transparent'}
				value={questionAnswerId}
				size={'4rem'}
				icon={
					<CustomIcon isIndeterminate={isIndeterminate} isChecked={isChecked} />
				}
				isChecked={isChecked}
				isIndeterminate={isIndeterminate}
				onChange={(e) => checkStatus(e)}>
				<SlideFade in={isEnabled}>
					<Badge variant={variant}>{text}</Badge>
				</SlideFade>
				<Slide
					in={isEnabled}
					direction="top"
					style={{
						position: 'relative',
						top: `${!isEnabled ? '10px' : ''}`,
					}}>
					<RichContentComponent content={questionText} />
				</Slide>
			</Checkbox>
		</>
	);
};

export default AnswerInput;