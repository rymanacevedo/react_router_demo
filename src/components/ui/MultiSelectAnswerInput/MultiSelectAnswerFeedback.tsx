import { useEffect, useState } from 'react';
import { Badge, Checkbox, Flex, SlideFade, Text } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import MultiChoiceOverLayIcon from './MultiSelectOverLayIcon';
import {
	CurrentRoundAnswerOverLayData,
	SelectedAnswers,
} from '../../pages/AssignmentView/AssignmentTypes';
import {
	CheckIcon,
	Cross1Icon,
	MinusCircledIcon,
	QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';

const MultiChoiceAnswerFeedback = ({
	questionText,
	questionAnswerId,
	selectedAnswers,
	IDK,
	currentRoundAnswerOverLayData,
	wasCorrectAnswerChosen,
	inReview,
	revealAnswer,
}: {
	questionText: string;
	questionAnswerId: number | string;
	selectedAnswers?: any[];
	IDK?: boolean;
	currentRoundAnswerOverLayData?: CurrentRoundAnswerOverLayData;
	wasCorrectAnswerChosen?: boolean;
	inReview?: boolean;
	revealAnswer?: boolean;
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
	const revealCorrectAnswer = () => {
		const correctAnswer = currentRoundAnswerOverLayData?.correctAnswerIds?.[0];

		if (!correctAnswer) {
			console.error('Correct answer not found, possible local storage issue.');
		}

		if (correctAnswer === questionAnswerId) {
			setStatus('checked');
			setText('');
			setVariant('ampDarkSuccess');
			setIsEnabled(true);
		}
	};

	useEffect(() => {
		if (revealAnswer) {
			revealCorrectAnswer();
		}
	}, [revealAnswer]);

	const badgeIcon = () => {
		switch (variant) {
			case 'ampDarkSuccessOutline': {
				return <CheckIcon />;
			}
			case 'ampNeutralFilled': {
				return <QuestionMarkCircledIcon />;
			}
			case 'ampDarkSuccess': {
				return <CheckIcon />;
			}
			case 'ampWarningOutline': {
				return <MinusCircledIcon />;
			}
			case 'ampDarkErrorOutline': {
				return <Cross1Icon />;
			}
			case 'ampDarkError': {
				return <Cross1Icon />;
			}
		}
	};

	const revealAnswerDisplayCondition = revealAnswer && text === '';

	return (
		<Checkbox
			style={{
				display: 'flex',
				marginBottom: '0.5rem',
			}}
			className={inReview ? '' : 'label-hover-effect'}
			variant={'answer'}
			colorScheme={'transparent'}
			value={questionAnswerId}
			size={'4rem'}
			icon={
				<MultiChoiceOverLayIcon
					variant={variant}
					isIndeterminate={isIndeterminate}
					isChecked={isChecked}
				/>
			}
			isChecked={isChecked}
			isIndeterminate={isIndeterminate}>
			<SlideFade in={isEnabled}>
				{choseIDK ? (
					<Flex>
						<Text>You answered &nbsp;</Text>
						<Badge variant={variant}>
							<span style={{ display: 'flex', alignItems: 'center' }}>
								{badgeIcon()} <Text paddingLeft={'5px'}>{text}</Text>
							</span>
						</Badge>
					</Flex>
				) : (
					<Flex>
						<span hidden={revealAnswerDisplayCondition}>
							You were{' '}
							<Badge hidden={revealAnswerDisplayCondition} variant={variant}>
								{text}
							</Badge>{' '}
							and&nbsp;
						</span>
						<Badge hidden={revealAnswerDisplayCondition} variant={variant}>
							<span style={{ display: 'flex', alignItems: 'center' }}>
								{badgeIcon()} <Text paddingLeft={'5px'}>{correctStatus}</Text>
							</span>
						</Badge>
					</Flex>
				)}
			</SlideFade>
			<RichContentComponent
				style={{
					color: currentRoundAnswerOverLayData?.correctAnswerIds
						? '#6D758D'
						: 'inherit',
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
				content={questionText}
			/>
		</Checkbox>
	);
};

export default MultiChoiceAnswerFeedback;
