import { Button, Divider, Heading, HStack, SlideFade } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Confidence } from '../../pages/AssignmentView/AssignmentTypes';
import {
	Answer,
	AnswerData,
	QuestionInFocus,
	RoundData,
} from '../../../lib/validator';
import AmpBox from '../../standard/container/AmpBox';
import QuestionMultiSelect from './QuestionMultiSelect';

type Props = {
	questionInFocus: QuestionInFocus;
	selectedAnswers: Answer[];
	setSelectedAnswers: (
		value: ((prevState: Answer[]) => Answer[]) | Answer[],
	) => void;
	clearSelectionFunction: () => void;
	answerData: AnswerData;
	roundData?: RoundData;
	continueBtnFunc: () => void;
	setIDKResponse: (value: ((prevState: boolean) => boolean) | boolean) => void;
	showFeedback: boolean;
	submitMultiSelectAnswer: (s: Answer[], c: Confidence) => void;
};

const MultipleCorrect = ({
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
	clearSelectionFunction,
	answerData,
	roundData,
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
			const a: Answer[] = selectedAnswers.map((answer) => {
				return {
					...answer,
					confidence: confidence === Confidence.PartSure ? 50 : 100,
				};
			});
			submitMultiSelectAnswer(a, confidence);
		}
	};
	function isEveryAnswerCorrect(data: AnswerData) {
		const correctAnswerIds = data.correctAnswerIds;
		if (!correctAnswerIds)
			throw Error('No correct answer ids, are you in review?');

		if (
			correctAnswerIds &&
			correctAnswerIds.length !== data.answerList.length
		) {
			return false;
		}

		if (correctAnswerIds && correctAnswerIds.length === 1) {
			return correctAnswerIds[0] === data.answerList[0].answerId;
		}

		return correctAnswerIds.every((id: number) =>
			data.answerList.map((a) => a.answerId).includes(id),
		);
	}

	return (
		<AmpBox>
			<Heading as="h3">{i18n('selectAllthatApply')}</Heading>
			<QuestionMultiSelect
				showFeedback={showFeedback}
				questionInFocus={questionInFocus}
				selectedAnswers={selectedAnswers}
				setSelectedAnswers={setSelectedAnswers}
				setIDKResponse={setIDKResponse}
				answerData={answerData}
				roundData={roundData}
				validator={isEveryAnswerCorrect}
			/>
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
