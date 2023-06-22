import { useEffect, useState } from 'react';
import { Badge, Checkbox, Flex, SlideFade, Text } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import {
	CheckIcon,
	Cross1Icon,
	MinusCircledIcon,
	QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { useFeedback } from '../../../hooks/useFeedbackContext';

const MultiChoiceAnswerFeedback = ({
	questionInFocus,
	questionText,
	questionAnswerId,
	selectedAnswers,
	IDK,
	currentRoundAnswerOverLayData,
	wasCorrectAnswerChosen,
	wasPartialCorrectAnswerChosen,
	inReview,
	revealAnswer,
}: {
	questionInFocus?: QuestionInFocus;
	questionText: string;
	questionAnswerId: number | string;
	selectedAnswers?: any[];
	IDK?: boolean;
	currentRoundAnswerOverLayData?: CurrentRoundAnswerOverLayData;
	wasCorrectAnswerChosen?: boolean;
	wasPartialCorrectAnswerChosen?: boolean;
	inReview?: boolean;
	revealAnswer?: boolean;
}) => {
	const [status, setStatus] = useState('unchecked');
	const [text, setText] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);
	const [variant, setVariant] = useState('');
	const [correctStatus, setCorrectStatus] = useState('');
	const [multiSelectVariant, setMultiSelectVariant] = useState('');
	const isChecked = status === 'checked';
	// correction asnwer
	const choseIDK = IDK && selectedAnswers?.length === 0;

	const { setFeedbackVariant, setFeedbackText, setFeedbackStatus } =
		useFeedback();

	function checkSelectedAnswers(
		selectedAnswersArg: SelectedAnswer[],
		questionAnswerIdArg: string | number,
	) {
		const match = selectedAnswersArg.find(
			(answer) => Number(answer.answerId) === Number(questionAnswerIdArg),
		);
		if (match) {
			if (
				// unsure and correct
				match.confidence === 50 &&
				wasCorrectAnswerChosen &&
				selectedAnswers?.length === 1
			) {
				setStatus('checked');
				setText('unsure');
				setVariant('ampDarkSuccessOutline');
				setFeedbackVariant('ampDarkSuccessOutline');
				setFeedbackText('unsure');
				setMultiSelectVariant('multiSelectUnsureCorrect');
				setIsEnabled(true);
			} else if (
				//  unsure and correct and there are more than one selected answers
				match.confidence === 50 &&
				wasCorrectAnswerChosen &&
				(selectedAnswers?.length ?? 0) > 1
			) {
				setStatus('checked');
				setText('unsure');
				setVariant('ampDarkSuccessOutline');
				setFeedbackVariant('ampDarkSuccessOutline');
				setFeedbackText('unsure');
				setMultiSelectVariant('multiSelectUnsureCorrect');
				setIsEnabled(true);
			}
			// unsure and incorrect
			else if (match.confidence === 50 && !wasCorrectAnswerChosen) {
				setStatus('checked');
				setText('unsure');
				setVariant('ampDarkErrorOutline');
				setFeedbackVariant('ampDarkErrorOutline');
				setFeedbackText('unsure');
				setMultiSelectVariant('multiSelectUnsureIncorrect');
				setIsEnabled(true);
			} else if (match.confidence === 100 && !wasCorrectAnswerChosen) {
				setStatus('checked');
				setText('sure');
				setVariant('ampDarkError');
				setFeedbackVariant('ampDarkError');
				setFeedbackText('sure');
				setMultiSelectVariant('multiSelectSureIncorrect');
				setIsEnabled(true);
			} else if (match.confidence === 100 && wasCorrectAnswerChosen) {
				setStatus('checked');
				setText('sure');
				setVariant('ampDarkSuccess');
				setMultiSelectVariant('multiSelectSureCorrect');
				setFeedbackVariant('ampDarkSuccess');
				setFeedbackText('sure');
				setIsEnabled(true);
			}
		} else if (choseIDK) {
			setIsEnabled(true);
			setText("I don't know yet");
			setVariant('ampNeutralFilled');
			setStatus('checked');
			setFeedbackVariant('NA');
			setFeedbackText('NA');
		} else {
			setMultiSelectVariant('multiSelect');
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
			if (
				selectedAnswers?.length === 1 &&
				wasCorrectAnswerChosen &&
				!wasPartialCorrectAnswerChosen
			) {
				setStatus('correct');
				setCorrectStatus('correct');
			} else if (
				selectedAnswers?.length > 1 &&
				wasCorrectAnswerChosen &&
				wasPartialCorrectAnswerChosen
			) {
				setFeedbackStatus('partially correct');
				setCorrectStatus('partially correct');
			} else if (
				selectedAnswers?.length > 1 &&
				wasCorrectAnswerChosen &&
				!wasPartialCorrectAnswerChosen
			) {
				setFeedbackStatus('correct');
				setCorrectStatus('correct');
			} else if (selectedAnswers?.length === 1 && !wasCorrectAnswerChosen) {
				setCorrectStatus('incorrect');
				setFeedbackStatus('incorrect');
			} else if (selectedAnswers?.length > 1 && wasCorrectAnswerChosen) {
				setCorrectStatus('partially correct');
				setFeedbackStatus('partially correct');
			} else if (selectedAnswers?.length > 1 && !wasCorrectAnswerChosen) {
				setCorrectStatus('incorrect');
				setFeedbackStatus('incorrect');
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

	const revealAnswerDisplayCondition =
		(revealAnswer && text === '') ||
		questionInFocus?.questionType === 'MultipleCorrect';

	return (
		<>
			{!choseIDK ? (
				<Checkbox
					style={{
						display: 'flex',
						marginBottom: '25px',
						cursor: 'pointer',
					}}
					className={inReview ? '' : 'label-hover-effect'}
					variant={multiSelectVariant}
					colorScheme={'transparent'}
					value={questionAnswerId}
					size={'4rem'}
					borderColor={'#1e1f20'}
					isChecked={isChecked}>
					<SlideFade in={isEnabled}>
						<Flex>
							<span hidden={revealAnswerDisplayCondition}>
								You were{' '}
								<Badge hidden={revealAnswerDisplayCondition} variant={variant}>
									{text}
								</Badge>{' '}
								and&nbsp;
							</span>
							<Badge hidden={revealAnswerDisplayCondition} variant={variant}>
								<span
									style={{
										display: 'flex',
										alignItems: 'center',
									}}>
									{badgeIcon()} <Text paddingLeft={'5px'}>{correctStatus}</Text>
								</span>
							</Badge>
						</Flex>
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
			) : (
				<>
					<SlideFade in={isEnabled}>
						<Flex>
							<Text fontWeight={600} fontSize={20}>
								You answered &nbsp;
							</Text>
							<Badge variant={variant}>
								<span
									style={{
										display: 'flex',
										alignItems: 'center',
									}}>
									{badgeIcon()} <Text paddingLeft={'5px'}>{text}</Text>
								</span>
							</Badge>
						</Flex>
					</SlideFade>
					<RichContentComponent
						style={{
							color: currentRoundAnswerOverLayData?.correctAnswerIds
								? '#6D758D'
								: 'inherit',
						}}
						content={questionText}
					/>
				</>
			)}
		</>
	);
};

export default MultiChoiceAnswerFeedback;
