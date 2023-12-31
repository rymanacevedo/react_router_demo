import { Confidence } from '../pages/AssignmentView/AssignmentTypes';
import {
	Answer,
	AnswerData,
	QuestionInFocus,
	RoundData,
} from '../../lib/validator';
import {
	Box,
	Button,
	Divider,
	Fade,
	Heading,
	HStack,
	Popover,
	PopoverAnchor,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	Stack,
	Text,
} from '@chakra-ui/react';
import { MultipleChoice } from './MultipleChoiceAnswerInput/MultipleChoice';
import MultipleChoiceOverLay from './MultipleChoiceAnswerInput/MultipleChoiceFeedBack';
import MultipleCorrect from './MultipleCorrectAnswerInput/MultipleCorrect';
import { useTranslation } from 'react-i18next';
import { MutableRefObject } from 'react';

import sure from '../../assets/sure.gif';
import unsure from '../../assets/unsure.gif';
import AmpBox from '../standard/container/AmpBox';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	questionInFocus: QuestionInFocus | null;
	selectedAnswers: Answer[];
	setSelectedAnswers: (
		value: ((prevState: Answer[]) => Answer[]) | Answer[],
	) => void;
	clearSelection: boolean;
	clearSelectionState: (
		value: ((prevState: boolean) => boolean) | boolean,
	) => void;
	currentRoundAnswerOverLayData: AnswerData;
	roundData?: RoundData;
	continueBtnFunc: () => void;
	clearSelectionFunction: () => void;
	setIDKResponse: (value: ((prevState: boolean) => boolean) | boolean) => void;
	IDKResponse: boolean;
	smallerThan1000: boolean;
	showFeedback: boolean;
	initialFocusRef: MutableRefObject<null>;
	submitMultiSelectAnswer: (s: Answer[], c: Confidence) => void;
};

export default function AnswerArea({
	isOpen,
	onClose,
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
	clearSelection,
	clearSelectionState,
	currentRoundAnswerOverLayData,
	roundData,
	continueBtnFunc,
	clearSelectionFunction,
	setIDKResponse,
	IDKResponse,
	smallerThan1000,
	showFeedback,
	initialFocusRef,
	submitMultiSelectAnswer,
}: Props) {
	const { t: i18n } = useTranslation();

	return (
		<Popover
			closeOnBlur={false}
			closeOnEsc={false}
			isLazy={true}
			offset={[-150, 0]}
			arrowPadding={220}
			isOpen={isOpen}
			onClose={onClose}
			defaultIsOpen={isOpen}
			placement={smallerThan1000 ? 'auto' : 'left'}
			initialFocusRef={initialFocusRef}
			arrowSize={20}>
			<PopoverAnchor>
				<Box minW="50%">
					{questionInFocus?.questionType === 'MultipleChoice' && (
						<MultipleChoice
							questionInFocus={questionInFocus}
							selectedAnswers={selectedAnswers}
							selectedAnswersState={setSelectedAnswers}
							clearSelection={clearSelection}
							clearSelectionState={clearSelectionState}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
							onClick={continueBtnFunc}
							clearSelectionFunction={clearSelectionFunction}
							setIDKResponse={setIDKResponse}
							IDKResponse={IDKResponse}
							showOverlay={showFeedback}
						/>
					)}
					{questionInFocus?.questionType === 'MultipleCorrect' && (
						// The backend use MultipleCorrect as the term for MultiSelect
						<MultipleCorrect
							questionInFocus={questionInFocus}
							selectedAnswers={selectedAnswers}
							setSelectedAnswers={setSelectedAnswers}
							clearSelectionFunction={clearSelectionFunction}
							roundData={roundData}
							answerData={currentRoundAnswerOverLayData}
							continueBtnFunc={continueBtnFunc}
							setIDKResponse={setIDKResponse}
							showFeedback={showFeedback}
							submitMultiSelectAnswer={submitMultiSelectAnswer}
						/>
					)}
					{questionInFocus?.questionType === 'Matching' && (
						//TODO: refactor this out when we have the matching component files
						<AmpBox>
							{!showFeedback ? (
								<Fade in={!showFeedback}>
									<Text>Under construction</Text>
								</Fade>
							) : (
								<Fade in={showFeedback}>
									<MultipleChoiceOverLay
										questionInFocus={questionInFocus}
										selectedAnswers={selectedAnswers}
										setSelectedAnswers={setSelectedAnswers}
										clearSelection={clearSelection}
										setClearSelection={clearSelectionState}
										currentRoundAnswerOverLayData={
											currentRoundAnswerOverLayData
										}
									/>
								</Fade>
							)}
							<Divider marginTop="43px" />
							<HStack
								justifyContent={'space-between'}
								display={'flex'}
								marginTop={3}>
								<Button
									onClick={continueBtnFunc}
									variant={'ampSolid'}
									w="150px"
									isDisabled={!IDKResponse && !selectedAnswers.length}>
									<Text>
										{i18n(showFeedback ? 'continueBtnText' : 'submitBtnText')}
									</Text>
								</Button>
								<Button
									isDisabled={!IDKResponse && !selectedAnswers.length}
									variant="ghost"
									colorScheme="ampSecondary"
									onClick={clearSelectionFunction}>
									{!showFeedback && i18n('clearSelection')}
								</Button>
							</HStack>
						</AmpBox>
					)}
				</Box>
			</PopoverAnchor>
			{/* TODO: a hack, is to wrap a box around instead of added zindex to the theme file https://chakra-ui.com/docs/styled-system/theme#z-index-values*/}
			<Box style={{ zIndex: 1401 }}>
				<PopoverContent
					p={smallerThan1000 ? 12 : 10}
					h={smallerThan1000 ? 'auto' : 425}
					w={560}>
					<PopoverArrow />
					<Heading as="h3" mb={3}>
						Ways to answer
					</Heading>
					<PopoverBody style={{ padding: 0 }}>
						<Stack direction={['column', 'row']}>
							<Box>
								<Heading fontWeight="normal" mt={4} mb={4} as="h3" size="md">
									Click <strong>once</strong> if you are <strong>unsure</strong>
								</Heading>
								<img
									style={{
										marginTop: '24px',
										marginBottom: '24px',
									}}
									src={unsure}
									alt="unsure gif"
								/>
							</Box>
							<Box>
								<Heading fontWeight="normal" mt={4} mb={4} as="h3" size="md">
									Click <strong>twice</strong> if you are <strong>sure</strong>
								</Heading>
								<img
									style={{
										marginTop: '24px',
										marginBottom: '24px',
									}}
									src={sure}
									alt="sure gif"
								/>
							</Box>
						</Stack>
						<Text>
							Choosing unsure will give you the opportunity to try this question
							again later after learning more. You can submit up to two choices
							if you are unsure.
						</Text>
						<Text mt={'5px'}>
							You can click three times to unselect your answer.
						</Text>
						<Button mt={4} onClick={onClose} ref={initialFocusRef}>
							Continue
						</Button>
					</PopoverBody>
				</PopoverContent>
			</Box>
		</Popover>
	);
}
