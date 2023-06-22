import {
	Badge,
	Box,
	Button,
	Divider,
	Fade,
	Flex,
	Heading,
	HStack,
	Text,
} from '@chakra-ui/react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFeedback } from '../../../hooks/useFeedbackContext';
import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultiSelect from './MultiSelect';
import MultiSelectFeedback from './MultiSelectFeedback';

export type MultipleCorrectProps = {
	questionInFocus: QuestionInFocus;
	selectedAnswers: SelectedAnswer[];
	updateSelectedAnswersState: (
		value:
			| ((prevState: SelectedAnswer[]) => SelectedAnswer[])
			| SelectedAnswer[],
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

	const { feedbackVariant, feedbackText, feedbackStatus } = useFeedback();

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
		setSubmitted(false);
		return clearSelectionFunction();
	};

	useEffect(() => {
		if (submitted) {
			setSubmitted(false);
			onClick();
		}
	}, [submitted]);
	const idkChosen = feedbackText === 'NA' && feedbackVariant === 'NA';
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
				<>
					<Fade in={showOverlay}>
						{' '}
						<MultiSelectFeedback
							questionInFocus={questionInFocus}
							selectedAnswers={selectedAnswers}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						/>
					</Fade>
					{showOverlay && (
						<Flex hidden={idkChosen}>
							<span>
								You were <Badge variant={feedbackVariant}>{feedbackText}</Badge>{' '}
								and&nbsp;
							</span>
							<Badge variant={feedbackVariant}>
								<span
									style={{
										display: 'flex',
										alignItems: 'center',
									}}>
									{<Cross1Icon />}{' '}
									<Text paddingLeft={'5px'}>{feedbackStatus}</Text>
								</span>
							</Badge>
						</Flex>
					)}
				</>
			)}
			<Divider marginTop="43px" />
			{!showOverlay ? (
				<HStack marginTop={3} spacing={6} w="100%">
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
				// TO-DO: investigate buttons shifting when specific widths removed
				<HStack
					marginTop={3}
					spacing={6}
					w="100%"
					style={{ justifyContent: 'flex-end', marginTop: '48px' }}>
					<Button
						onClick={onClick}
						isDisabled={!idkChosen && Boolean(!selectedAnswers.length)}
						w="114px"
						h="48px">
						{i18n('continueBtnText')}
					</Button>
				</HStack>
			)}
		</Box>
	);
};

export default MultipleCorrect;
