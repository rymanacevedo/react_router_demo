import { Button, Divider, Fade, HStack, Text } from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import {
	CurrentRoundAnswerOverLayData,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import MultipleChoiceOverLay from './MultipleChoiceFeedBack';
import { QuestionInFocus } from '../../../lib/validator';
import AmpBox from '../../standard/container/AmpBox';

type MultipleChoiceProps = {
	questionInFocus: QuestionInFocus;
	selectedAnswers: SelectedAnswer[];
	selectedAnswersState: (
		value:
			| ((prevState: SelectedAnswer[]) => SelectedAnswer[])
			| SelectedAnswer[],
	) => void;
	clearSelection: boolean;
	clearSelectionState: (
		value: ((prevState: boolean) => boolean) | boolean,
	) => void;
	currentRoundAnswerOverLayData: CurrentRoundAnswerOverLayData;
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
					{' '}
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
			<HStack
				justifyContent={'space-between'}
				display={'flex'}
				marginTop={'12px'}>
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
