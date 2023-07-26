import { Button, Divider, Heading, HStack, SlideFade } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
	Confidence,
	CurrentRoundAnswerOverLayData,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultiSelect from './MultiSelect';
import MultiSelectFeedback from './MultiSelectFeedback';
import { QuestionInFocus } from '../../../lib/validator';
import AmpBox from '../../standard/container/AmpBox';

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
		<AmpBox>
			<Heading as="h3">{i18n('selectAllthatApply')}</Heading>
			{!showFeedback ? (
				<MultiSelect
					questionInFocus={questionInFocus}
					selectedAnswers={selectedAnswers}
					setSelectedAnswers={setSelectedAnswers}
					setIDKResponse={setIDKResponse}
				/>
			) : (
				<MultiSelectFeedback
					questionInFocus={questionInFocus}
					roundFeedbackData={roundFeedbackData}
				/>
			)}
			<Divider marginTop={11} />
			{!showFeedback ? (
				<SlideFade in={!showFeedback} unmountOnExit={true}>
					<HStack marginTop={3} wrap="wrap">
						<Button
							size="md"
							onClick={() => handleSubmission(Confidence.NA)}
							variant="outline"
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
							colorScheme="ampSecondary"
							variant="ghost"
							isDisabled={Boolean(!selectedAnswers.length)}>
							{i18n('clearSelectionPlural')}
						</Button>
					</HStack>
				</SlideFade>
			) : (
				<SlideFade in={showFeedback} unmountOnExit={true}>
					<HStack marginTop={3} wrap="wrap">
						<Button onClick={continueBtnFunc}>{i18n('continueBtnText')}</Button>
					</HStack>
				</SlideFade>
			)}
		</AmpBox>
	);
};

export default MultipleCorrect;
