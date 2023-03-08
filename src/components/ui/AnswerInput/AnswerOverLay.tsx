import { useEffect, useState } from 'react';
import { Badge, Checkbox, Slide, SlideFade, Text } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import CustomOverLayIcon from './CustomOverLayIcon';
import { SelectedAnswers } from '../../pages/AssignmentView/AssignmentViewTypes';
import {
	CheckIcon,
	Cross1Icon,
	MinusCircledIcon,
	QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';

const AnswerOverLay = ({
	questionText,
	questionAnswerId,
	selectedAnswers,
	IDK,
	currentRoundAnswerOverLayData,
	wasCorrectAnswerChosen,
}: {
	questionText: string;
	questionAnswerId: number | string;
	selectedAnswers?: any[];
	IDK?: boolean;
	currentRoundAnswerOverLayData?: any;
	wasCorrectAnswerChosen?: boolean;
}) => {
	const [status, setStatus] = useState('unchecked');
	const [text, setText] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);
	const [variant, setVariant] = useState('');
	const [correctStatus, setCorrectStatus] = useState('');
	const isIndeterminate = status === 'indeterminate';
	const isChecked = status === 'checked';
	const choseIDK = IDK && selectedAnswers?.length === 0;

	function checkSelectedAnswers(
		selectedAnswersArg: SelectedAnswers[],
		questionAnswerIdArg: string | number,
	) {
		const match = selectedAnswersArg.find(
			(answer) => Number(answer.answerId) === Number(questionAnswerIdArg),
		);
		if (match) {
			if (
				match.confidence === 50 &&
				wasCorrectAnswerChosen &&
				selectedAnswers?.length === 1
			) {
				setStatus('checked');
				setText('unsure');
				setVariant('ampDarkSuccessOutline');
				setIsEnabled(true);
			} else if (match.confidence === 50 && wasCorrectAnswerChosen) {
				setStatus('checked');
				setText('unsure');
				setVariant('ampWarningOutline');
				setIsEnabled(true);
			} else if (match.confidence === 50 && !wasCorrectAnswerChosen) {
				setStatus('checked');
				setText('unsure');
				setVariant('ampDarkErrorOutline');
				setIsEnabled(true);
			} else if (match.confidence === 100 && !wasCorrectAnswerChosen) {
				setStatus('checked');
				setText('sure');
				setVariant('ampDarkError');
				setIsEnabled(true);
			} else if (match.confidence === 100) {
				setStatus('checked');
				setText('sure');
				setVariant('ampDarkSuccess');
				setIsEnabled(true);
			}
		} else if (choseIDK) {
			setIsEnabled(true);
			// eslint-disable-next-line
			setText('I don\'t know yet');
			setVariant('ampNeutralFilled');
			setStatus('checked');
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
	}, [selectedAnswers, wasCorrectAnswerChosen]);
	useEffect(() => {
		if (currentRoundAnswerOverLayData?.correctAnswerIds && selectedAnswers) {
			if (selectedAnswers?.length === 1 && wasCorrectAnswerChosen) {
				setCorrectStatus('correct');
			} else if (selectedAnswers?.length === 1 && !wasCorrectAnswerChosen) {
				setCorrectStatus('incorrect');
			} else if (selectedAnswers?.length > 1 && wasCorrectAnswerChosen) {
				setCorrectStatus('partially correct');
			} else if (selectedAnswers?.length > 1 && !wasCorrectAnswerChosen) {
				setCorrectStatus('incorrect');
			}
		}
	}, [currentRoundAnswerOverLayData, wasCorrectAnswerChosen]);

	const badgeIcon = () => {
		switch (variant) {
			case 'ampDarkSuccessOutline': {
				return <CheckIcon />;
				break;
			}
			case 'ampNeutralFilled': {
				return <QuestionMarkCircledIcon />;
				break;
			}
			case 'ampDarkSuccess': {
				return <CheckIcon />;
				break;
			}
			case 'ampWarningOutline': {
				return <MinusCircledIcon />;
				break;
			}
			case 'ampDarkErrorOutline': {
				return <Cross1Icon />;
				break;
			}
			case 'ampDarkError': {
				return <Cross1Icon />;
				break;
			}
		}
	};

	return (
		<>
			<Checkbox
				className={'label-hover-effect'}
				w="100%"
				variant={'answer'}
				colorScheme={'transparent'}
				value={questionAnswerId}
				size={'4rem'}
				icon={
					<CustomOverLayIcon
						variant={variant}
						isIndeterminate={isIndeterminate}
						isChecked={isChecked}
					/>
				}
				isChecked={isChecked}
				isIndeterminate={isIndeterminate}>
				<SlideFade in={isEnabled}>
					{choseIDK ? (
						<div style={{left: '13px', position: 'relative'}}>
							You answered{' '}
							<Badge variant={variant}>
								<span style={{ display: 'flex' }}>
									{badgeIcon()} <Text paddingLeft={'5px'}>{text}</Text>
								</span>
							</Badge>
						</div>
					) : (
						<div style={{left: '15px', position: 'relative'}}>
							You were <Badge variant={variant}>{text}</Badge> and{' '}
							<Badge variant={variant}>
								<span style={{ display: 'flex' }}>
									{badgeIcon()} <Text paddingLeft={'5px'}>{correctStatus}</Text>
								</span>
							</Badge>
						</div>
					)}
				</SlideFade>
				<Slide
					in={isEnabled}
					direction="top"
					style={{
						position: 'relative',
						top: `${!isEnabled ? '25px' : ''}`,
						fontSize: 25,
						display: 'flex',
						left: '15px'
					}}>
					<RichContentComponent
						style={{
							color: currentRoundAnswerOverLayData?.correctAnswerIds
								? '#6D758D'
								: 'inherit',
						}}
						content={questionText}
					/>
				</Slide>
			</Checkbox>
		</>
	);
};

export default AnswerOverLay;
