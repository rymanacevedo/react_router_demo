import { Box, Button, Divider, Fade, HStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswers,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultipleCorrectAnswers from './MultipleCorrectAnswers';
import MultipleChoiceOverLay from './MultipleChoiceFeedback';

export type MultipleCorrectProps = {
	questionInFocus: QuestionInFocus;
	selectedAnswers: SelectedAnswers[];
	updateSelectedAnswersState: (
		value:
			| ((prevState: SelectedAnswers[]) => SelectedAnswers[])
			| SelectedAnswers[],
	) => void;
	clearSelection: boolean;
	clearSelectionState: (
		value: ((prevState: boolean) => boolean) | boolean,
	) => void;
	currentRoundAnswerOverLayData: CurrentRoundAnswerOverLayData;
	onClick: () => void;
	setIDKResponse: (value: ((prevState: boolean) => boolean) | boolean) => void;
	smallerThan1000: boolean;
	showOverlay: boolean;
	setTotalAnswerConfidence: (value: string) => void;
};

const MultipleCorrect = ({
	questionInFocus,
	selectedAnswers,
	updateSelectedAnswersState,
	clearSelection,
	clearSelectionState,
	currentRoundAnswerOverLayData,
	onClick,
	setIDKResponse,
	smallerThan1000,
	showOverlay,
	setTotalAnswerConfidence,
}: MultipleCorrectProps) => {
	const { t: i18n } = useTranslation();

	const [submitted, setSubmitted] = useState(false);

	const handleSubmission = (confidence: string) => {
		if (confidence === 'IDK') {
			setTotalAnswerConfidence('NotSure');
			setSubmitted(true);
		} else if (confidence === 'UNSURE') {
			const selectedAnswersWithConfidence = selectedAnswers.map((answer) => {
				return {
					...answer,
					confidence: 50,
				};
			});
			updateSelectedAnswersState(selectedAnswersWithConfidence);
			setTotalAnswerConfidence('PartSure');
			setSubmitted(true);
		} else if (confidence === 'SURE') {
			const selectedAnswersWithConfidence = selectedAnswers.map((answer) => {
				return {
					...answer,
					confidence: 100,
				};
			});

			updateSelectedAnswersState(selectedAnswersWithConfidence);
			setTotalAnswerConfidence('Sure');
			setSubmitted(true);
		}
	};

	useEffect(() => {
		if (submitted) {
			onClick();
		}
	}, [submitted]);

	return (
		<Box
			style={{
				marginTop: smallerThan1000 ? '10px' : '0px',
			}}
			alignItems="stretch"
			flex={1}
			backgroundColor="white"
			boxShadow="md"
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			borderRadius={24}
			p={'72px'}>
			{!showOverlay ? (
				//Matching
				//MultipleChoice
				//MultipleCorrect
				<Fade in={!showOverlay}>
					<MultipleCorrectAnswers
						questionInFocus={questionInFocus}
						selectedAnswers={selectedAnswers}
						setSelectedAnswers={updateSelectedAnswersState}
						setIDKResponse={setIDKResponse}
					/>
				</Fade>
			) : (
				<Fade in={showOverlay}>
					{' '}
					<MultipleChoiceOverLay
						questionInFocus={questionInFocus}
						selectedAnswers={selectedAnswers}
						setSelectedAnswers={updateSelectedAnswersState}
						clearSelection={clearSelection}
						setClearSelection={clearSelectionState}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
					/>
				</Fade>
			)}
			<Divider marginTop="43px" />
			<HStack
				justifyContent={'space-between'}
				display={'flex'}
				marginTop={'12px'}>
				<Button
					onClick={() => handleSubmission('IDK')}
					variant={'ampOutline'}
					w="150px"
					isDisabled={Boolean(selectedAnswers.length)}>
					<Text>{i18n('iDontKnow')}</Text>
				</Button>
				<Button
					onClick={() => handleSubmission('UNSURE')}
					variant={'ampSolid'}
					w="150px"
					bg="ampSecondary.500"
					isDisabled={Boolean(!selectedAnswers.length)}>
					<Text>{i18n('iAmUnsure')}</Text>
				</Button>
				<Button
					onClick={() => handleSubmission('SURE')}
					variant={'ampSolid'}
					w="150px"
					isDisabled={Boolean(!selectedAnswers.length)}>
					<Text>{i18n('iAmSure')}</Text>
				</Button>
			</HStack>
		</Box>
	);
};

export default MultipleCorrect;
