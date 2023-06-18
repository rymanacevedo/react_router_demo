/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { Badge, Checkbox, Flex, SlideFade, Text } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import {
	CurrentRoundAnswerOverLayData,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import {
	CheckIcon,
	Cross1Icon,
	MinusCircledIcon,
	QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';
import { FeedbackContext } from '../../../hooks/useFeedbackContext';

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
	const isIndeterminate = status === 'indeterminate';
	const isChecked = status === 'checked';
	const choseIDK = IDK && selectedAnswers?.length === 0;

	const { updateFeedback: updateFeedbackContext, updateCorrectStatus } =
		useContext(FeedbackContext);

	function checkSelectedAnswers(
		selectedAnswersArg: SelectedAnswer[],
		questionAnswerIdArg: string | number,
	) {
		const match = selectedAnswersArg.find(
			(answer) => Number(answer.answerId) === Number(questionAnswerIdArg),
		);
		console.log(selectedAnswers?.length);
		if (match) {
			if (
				match.confidence === 50 &&
				wasCorrectAnswerChosen &&
				selectedAnswers?.length === 1 &&
				!wasPartialCorrectAnswerChosen
			) {
				// if one answer is it and it was chosen
				console.log(1);
				setStatus('checked');
				setText('unsure');
				setVariant('ampDarkSuccessOutline');
				updateFeedbackContext('ampDarkSuccessOutline', 'unsure');
				setMultiSelectVariant('multiSelectUnsureCorrect');
				setIsEnabled(true);
			} else if (match.confidence === 50 && wasCorrectAnswerChosen) {
				console.log(2);
				setStatus('checked');
				setText('unsure');
				setVariant('ampWarningOutline');
				updateFeedbackContext('ampWarningOutline', 'unsure');
				setMultiSelectVariant('multiSelectPartialCorrect');
				setIsEnabled(true);
			} else if (match.confidence === 50 && !wasCorrectAnswerChosen) {
				console.log(3);
				setStatus('checked');
				setText('unsure');
				setVariant('ampDarkErrorOutline');
				updateFeedbackContext('ampDarkErrorOutline', 'unsure');
				setMultiSelectVariant('multiSelectUnsureIncorrect');
				setIsEnabled(true);
			} else if (match.confidence === 100 && !wasCorrectAnswerChosen) {
				console.log(4);
				setStatus('checked');
				setText('sure');
				setVariant('ampDarkError');
				updateFeedbackContext('ampDarkError', 'sure');
				setMultiSelectVariant('multiSelectSureIncorrect');
				setIsEnabled(true);
			} else if (match.confidence === 100) {
				console.log(5);
				setStatus('checked');
				setText('sure');
				setVariant('ampDarkSuccess');
				setMultiSelectVariant('multiSelectSureCorrect');
				updateFeedbackContext('ampDarkSuccess', 'sure');
				setIsEnabled(true);
			}
		} else if (choseIDK) {
			setIsEnabled(true);
			// eslint-disable-next-line
			setText("I don't know yet");
			setVariant('ampNeutralFilled');
			setStatus('checked');
			updateFeedbackContext('NA', 'NA');
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
				updateCorrectStatus('correct');
				setCorrectStatus('correct');
			} else if (
				selectedAnswers?.length > 1 &&
				wasCorrectAnswerChosen &&
				wasPartialCorrectAnswerChosen
			) {
				updateCorrectStatus('partially correct');
				setCorrectStatus('partially correct');
			} else if (
				selectedAnswers?.length > 1 &&
				wasCorrectAnswerChosen &&
				!wasPartialCorrectAnswerChosen
			) {
				updateCorrectStatus('correct');
				setCorrectStatus('correct');
			} else if (selectedAnswers?.length === 1 && !wasCorrectAnswerChosen) {
				setCorrectStatus('incorrect');
				updateCorrectStatus('incorrect');
			} else if (selectedAnswers?.length > 1 && wasCorrectAnswerChosen) {
				setCorrectStatus('partially correct');
				updateCorrectStatus('partially correct');
			} else if (selectedAnswers?.length > 1 && !wasCorrectAnswerChosen) {
				setCorrectStatus('incorrect');
				updateCorrectStatus('incorrect');
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
				// icon={
				// 	<MultiChoiceOverLayIcon
				// 		variant={variant}
				// 		isIndeterminate={isIndeterminate}
				// 		isChecked={isChecked}
				// 	/>
				// }
				borderColor={'#1e1f20'}
				isChecked={isChecked}>
				<SlideFade in={isEnabled}>
					{choseIDK ? (
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
								<span
									style={{
										display: 'flex',
										alignItems: 'center',
									}}>
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
		</>
	);
};

export default MultiChoiceAnswerFeedback;
