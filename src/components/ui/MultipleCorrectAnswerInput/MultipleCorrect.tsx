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

export interface MultipleCorrectProps {
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
	clearSelectionFunction: () => void;
	setIDKResponse: (value: ((prevState: boolean) => boolean) | boolean) => void;
	IDKResponse: boolean;
	smallerThan1000: boolean;
	showOverlay: boolean;
	setTotalAnswerConfidence: (value: string) => void;
}

const MultipleCorrect = (props: MultipleCorrectProps) => {
	const { t: i18n } = useTranslation();

	const [submited, setSubmited] = useState(false);

	const handleMultiCorrectSubmission = (assignmentTakerConfidence?: string) => {
		if (assignmentTakerConfidence === 'IDK') {
			props.setTotalAnswerConfidence('NotSure');
			setSubmited(true);
		} else if (assignmentTakerConfidence === 'UNSURE') {
			const selectedAnswersWithConfidence = props.selectedAnswers.map(
				(answer) => {
					return {
						...answer,
						confidence: 50,
					};
				},
			);
			props.updateSelectedAnswersState(selectedAnswersWithConfidence);
			props.setTotalAnswerConfidence('PartSure');
			setSubmited(true);
		} else if (assignmentTakerConfidence === 'SURE') {
			const selectedAnswersWithConfidence = props.selectedAnswers.map(
				(answer) => {
					return {
						...answer,
						confidence: 100,
					};
				},
			);

			props.updateSelectedAnswersState(selectedAnswersWithConfidence);
			props.setTotalAnswerConfidence('Sure');
			setSubmited(true);
		}
	};

	useEffect(() => {
		if (submited) {
			props.onClick();
		}
	}, [submited]);

	return (
		<>
			{props.questionInFocus?.questionType === 'MultipleCorrect' && (
				<Box
					style={{
						marginTop: props.smallerThan1000 ? '10px' : '0px',
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
					{!props.showOverlay ? (
						//Matching
						//MultipleChoice
						//MultipleCorrect
						<Fade in={!props.showOverlay}>
							<MultipleCorrectAnswers
								questionInFocus={props.questionInFocus as QuestionInFocus}
								selectedAnswers={props.selectedAnswers}
								setSelectedAnswers={props.updateSelectedAnswersState}
								setIDKResponse={props.setIDKResponse}
							/>
						</Fade>
					) : (
						<Fade in={props.showOverlay}>
							{' '}
							<MultipleChoiceOverLay
								questionInFocus={props.questionInFocus}
								selectedAnswers={props.selectedAnswers}
								setSelectedAnswers={props.updateSelectedAnswersState}
								clearSelection={props.clearSelection}
								setClearSelection={props.clearSelectionState}
								currentRoundAnswerOverLayData={
									props.currentRoundAnswerOverLayData
								}
							/>
						</Fade>
					)}
					<Divider marginTop="43px" />
					<HStack
						justifyContent={'space-between'}
						display={'flex'}
						marginTop={'12px'}>
						<Button
							onClick={() => handleMultiCorrectSubmission('IDK')}
							variant={'ampOutline'}
							w="150px"
							isDisabled={Boolean(props.selectedAnswers.length)}>
							<Text>{i18n('iDontKnow')}</Text>
						</Button>
						<Button
							onClick={() => handleMultiCorrectSubmission('UNSURE')}
							variant={'ampSolid'}
							w="150px"
							bg="ampSecondary.500"
							isDisabled={!props.selectedAnswers.length as boolean}>
							<Text>{i18n('iAmUnsure')}</Text>
						</Button>
						<Button
							onClick={() => handleMultiCorrectSubmission('SURE')}
							variant={'ampSolid'}
							w="150px"
							isDisabled={!props.selectedAnswers.length as boolean}>
							<Text>{i18n('iAmSure')}</Text>
						</Button>
					</HStack>
				</Box>
			)}
		</>
	);
};

export default MultipleCorrect;
