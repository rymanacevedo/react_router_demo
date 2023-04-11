import { useEffect, useState } from 'react';
import {
	Badge,
	Checkbox,
	Flex,
	Slide,
	SlideFade,
	Text,
} from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';
import CustomOverLayIcon from './CustomOverLayIcon';
import { SelectedAnswers } from '../../pages/AssignmentView/AssignmentTypes';
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
	inReview,
	revealAnswer,
}: {
	questionText: string;
	questionAnswerId: number | string;
	selectedAnswers?: any[];
	IDK?: boolean;
	currentRoundAnswerOverLayData?: any;
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
		const correctAnswer = currentRoundAnswerOverLayData?.correctAnswerIds[0];
		if (correctAnswer === questionAnswerId) {
			setStatus('checked');
			setText('');
			setVariant('ampDarkSuccess');
			setIsEnabled(true);
		}
	};

	const calculateTranslateY = () => {
		if (IDK) {
			return '0%';
		}
		if (isChecked) {
			return '0%';
		}
		if (isIndeterminate) {
			return '0%';
		}
		return '50%';
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
		<>
			<Checkbox
				className={inReview ? '' : 'label-hover-effect'}
				style={{ cursor: inReview ? 'auto' : '' }}
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
								and{' '}
							</span>
							<Badge hidden={revealAnswerDisplayCondition} variant={variant}>
								<span style={{ display: 'flex', alignItems: 'center' }}>
									{badgeIcon()} <Text paddingLeft={'5px'}>{correctStatus}</Text>
								</span>
							</Badge>
						</Flex>
					)}
				</SlideFade>
				<Slide
					in={isEnabled}
					direction="top"
					style={{
						position: 'relative',
						translateY: calculateTranslateY(),
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
