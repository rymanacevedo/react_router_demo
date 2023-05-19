// MultipleChoice.tsx
import { Box, Button, Divider, Fade, HStack, Text } from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswers,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultipleChoiceAnswers from './MultipleChoiceAnswers';
import MultipleChoiceOverLay from './MultipleChoiceOverLay';

type MultipleChoiceProps = {
	questionInFocus: QuestionInFocus;
	selectedAnswers: SelectedAnswers[];
	selectedAnswersState: (
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
	clearSelectionFunction: () => void;
	setIDKResponse: (value: ((prevState: boolean) => boolean) | boolean) => void;
	IDKResponse: boolean;
	smallerThan1000: boolean;
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
	smallerThan1000,
	showOverlay,
}: MultipleChoiceProps) => {
	const { t: i18n } = useTranslation();

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
				<Fade in={!showOverlay}>
					<MultipleChoiceAnswers
						questionInFocus={questionInFocus as QuestionInFocus}
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
					_hover={{ backgroundColor: 'white' }}
					height="12px"
					variant="ghost"
					onClick={clearSelectionFunction}>
					{!showOverlay && (
						<Text fontSize={'14px'} color={'ampSecondary.500'}>
							{i18n('clearSelection')}
						</Text>
					)}
				</Button>
			</HStack>
		</Box>
	);
};
