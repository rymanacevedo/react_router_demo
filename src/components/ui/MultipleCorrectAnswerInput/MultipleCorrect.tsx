import { Box, Button, Divider, Fade, Heading, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
	Confidence,
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultiSelect from './MultiSelect';
import MultiSelectFeedback from './MultiSelectFeedback';

type Props = {
	questionInFocus: QuestionInFocus;
	selectedAnswers: SelectedAnswer[];
	setSelectedAnswers: (
		value:
			| ((prevState: SelectedAnswer[]) => SelectedAnswer[])
			| SelectedAnswer[],
	) => void;
	clearSelectionFunction: () => void;
	roundFeedbackData: CurrentRoundAnswerOverLayData;
	continueBtnFunc: () => void;
	setIDKResponse: (value: ((prevState: boolean) => boolean) | boolean) => void;
	smallerThan1000: boolean;
	showFeedback: boolean;
	submitMultiSelectAnswer: (s: SelectedAnswer[], c: Confidence) => void;
};

const MultipleCorrect = ({
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
	clearSelectionFunction,
	roundFeedbackData,
	continueBtnFunc,
	setIDKResponse,
	smallerThan1000,
	showFeedback,
	submitMultiSelectAnswer,
}: Props) => {
	const { t: i18n } = useTranslation();
	const handleSubmission = (confidence: Confidence) => {
		if (confidence === Confidence.NA) {
			submitMultiSelectAnswer(selectedAnswers, confidence);
		} else {
			const s: SelectedAnswer[] = selectedAnswers.map((answer) => {
				return {
					...answer,
					confidence: confidence === Confidence.PartSure ? 50 : 100,
				};
			});
			submitMultiSelectAnswer(s, confidence);
		}
	};

	return (
		<Box
			style={{
				marginTop: smallerThan1000 ? '10px' : '0px',
				maxWidth: '700px',
			}}
			alignItems="stretch"
			flex={1}
			backgroundColor="white"
			boxShadow="md"
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			borderRadius={24}
			px="72px"
			py="44px">
			<Heading as="h3">{i18n('selectAllthatApply')}</Heading>
			{!showFeedback ? (
				<Fade in={!showFeedback}>
					<MultiSelect
						questionInFocus={questionInFocus}
						selectedAnswers={selectedAnswers}
						setSelectedAnswers={setSelectedAnswers}
						setIDKResponse={setIDKResponse}
					/>
				</Fade>
			) : (
				<Fade in={showFeedback}>
					<MultiSelectFeedback
						questionInFocus={questionInFocus}
						roundFeedbackData={roundFeedbackData}
					/>
				</Fade>
			)}
			<Divider marginTop="43px" />
			<HStack marginTop={3} spacing={6} w="100%">
				{!showFeedback ? (
					<>
						<Button
							onClick={() => handleSubmission(Confidence.NA)}
							variant={'ampOutline'}
							isDisabled={Boolean(selectedAnswers.length)}>
							{i18n('iDontKnow')}
						</Button>
						<Button
							onClick={() => handleSubmission(Confidence.PartSure)}
							bg="ampSecondary.500"
							isDisabled={Boolean(!selectedAnswers.length)}>
							{i18n('iAmUnsure')}
						</Button>
						<Button
							onClick={() => handleSubmission(Confidence.Sure)}
							isDisabled={Boolean(!selectedAnswers.length)}>
							{i18n('iAmSure')}
						</Button>
						<Button
							onClick={clearSelectionFunction}
							variant="ghost"
							isDisabled={Boolean(!selectedAnswers.length)}>
							{i18n('clearSelectionPlural')}
						</Button>
					</>
				) : (
					<Button onClick={continueBtnFunc}>{i18n('continueBtnText')}</Button>
				)}
			</HStack>
		</Box>
	);
};

export default MultipleCorrect;
