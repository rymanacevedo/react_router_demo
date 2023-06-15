import { Box, Button, Divider, Fade, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultiSelect from './MultiSelect';
import MultipleChoiceOverLay from './MultiSelectFeedback';

export type MultipleCorrectProps = {
	questionInFocus: QuestionInFocus;
	selectedAnswers: SelectedAnswer[];
	updateSelectedAnswersState: (
		value:
			| ((prevState: SelectedAnswer[]) => SelectedAnswer[])
			| SelectedAnswer[],
	) => void;
	clearSelection: boolean;
	clearSelectionState: (
		value: ((prevState: boolean) => boolean) | boolean,
	) => void;
	clearSelectionFunction: () => void;
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
	clearSelectionFunction,
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

	const handleClearSelection = () => {
		return clearSelectionFunction();
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
					<MultiSelect
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
			{!showOverlay ? (
				<HStack marginTop={3} spacing={6} w="100%">
					{/* //TO-DO: investigate buttons shifting when specific widths removed */}
					<Button
						onClick={() => handleSubmission('IDK')}
						variant={'ampOutline'}
						isDisabled={Boolean(selectedAnswers.length)}
						w="140px">
						{i18n('iDontKnow')}
					</Button>
					<Button
						onClick={() => handleSubmission('UNSURE')}
						variant={'ampSolid'}
						bg="ampSecondary.500"
						isDisabled={Boolean(!selectedAnswers.length)}
						w="132px">
						{i18n('iAmUnsure')}
					</Button>
					<Button
						onClick={() => handleSubmission('SURE')}
						variant={'ampSolid'}
						isDisabled={Boolean(!selectedAnswers.length)}
						w="114px">
						{i18n('iAmSure')}
					</Button>
					<Button
						onClick={handleClearSelection}
						variant="link"
						isDisabled={Boolean(!selectedAnswers.length)}
						w="114px">
						{i18n('clearSelectionPlural')}
					</Button>
				</HStack>
			) : (
				<HStack
					marginTop={3}
					spacing={6}
					w="100%"
					style={{ justifyContent: 'flex-end', marginTop: '48px' }}>
					<Button
						onClick={onClick}
						variant={'ampSolid'}
						isDisabled={Boolean(!selectedAnswers.length)}
						w="114px"
						h="48px">
						{i18n('capitalContinue')}
					</Button>
				</HStack>
			)}
		</Box>
	);
};

export default MultipleCorrect;
