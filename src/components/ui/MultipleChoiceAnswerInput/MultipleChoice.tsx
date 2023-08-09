import { Button, Divider, Fade, Heading, HStack, Text } from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import MultipleChoiceOverLay from './MultipleChoiceFeedBack';
import { Answer, AnswerData, QuestionInFocus } from '../../../lib/validator';
import AmpBox from '../../standard/container/AmpBox';

type MultipleChoiceProps = {
	questionInFocus: QuestionInFocus;
	selectedAnswers: Answer[];
	selectedAnswersState: (
		value: ((prevState: Answer[]) => Answer[]) | Answer[],
	) => void;
	clearSelection: boolean;
	clearSelectionState: (
		value: ((prevState: boolean) => boolean) | boolean,
	) => void;
	currentRoundAnswerOverLayData: AnswerData;
	onClick: () => void;
	clearSelectionFunction: () => void;
	setIDKResponse: (value: ((prevState: boolean) => boolean) | boolean) => void;
	IDKResponse: boolean;
	showOverlay: boolean;
};

export const MultipleChoice = ({
	questionInFocus,
	selectedAnswers,
	selectedAnswersState,
	clearSelection,
	clearSelectionState,
	currentRoundAnswerOverLayData,
	onClick,
	clearSelectionFunction,
	setIDKResponse,
	IDKResponse,
	showOverlay,
}: MultipleChoiceProps) => {
	const { t: i18n } = useTranslation();

	return (
		<AmpBox>
			<Heading as="h2" fontSize="xl">
				{i18n('answer')}
			</Heading>
			{!showOverlay ? (
				<Fade in={!showOverlay}>
					<MultipleChoiceAnswers
						questionInFocus={questionInFocus}
						selectedAnswers={selectedAnswers}
						setSelectedAnswers={selectedAnswersState}
						clearSelection={clearSelection}
						setClearSelection={clearSelectionState}
						setIDKResponse={setIDKResponse}
						IDKResponse={IDKResponse}
					/>
				</Fade>
			) : (
				<Fade in={showOverlay}>
					<MultipleChoiceOverLay
						questionInFocus={questionInFocus}
						selectedAnswers={selectedAnswers}
						setSelectedAnswers={selectedAnswersState}
						clearSelection={clearSelection}
						setClearSelection={clearSelectionState}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
					/>
				</Fade>
			)}
			<Divider marginTop="43px" />
			<HStack justifyContent={'space-between'} display={'flex'} marginTop={3}>
				<Button
					onClick={onClick}
					variant={'ampSolid'}
					w="150px"
					isDisabled={!IDKResponse && !selectedAnswers.length}>
					<Text>{i18n(showOverlay ? 'continueBtnText' : 'submitBtnText')}</Text>
				</Button>
				<Button
					isDisabled={!IDKResponse && !selectedAnswers.length}
					variant="ghost"
					colorScheme="ampSecondary"
					onClick={clearSelectionFunction}>
					{!showOverlay && i18n('clearSelection')}
				</Button>
			</HStack>
		</AmpBox>
	);
};
