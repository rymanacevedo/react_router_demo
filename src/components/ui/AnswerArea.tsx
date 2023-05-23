import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswer,
} from '../pages/AssignmentView/AssignmentTypes';
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

type Props = {
	isOpen: boolean;
	onClose: () => void;
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
	smallerThan1000: boolean;
	showFeedback: boolean;
	setTotalAnswerConfidence: (value: string) => void;
	initialFocusRef: MutableRefObject<null>;
};

export default function AnswerArea({
	isOpen,
	onClose,
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
	showFeedback,
	setTotalAnswerConfidence,
	initialFocusRef,
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
							selectedAnswersState={selectedAnswersState}
							clearSelection={clearSelection}
							clearSelectionState={clearSelectionState}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
							onClick={onClick}
							clearSelectionFunction={clearSelectionFunction}
							setIDKResponse={setIDKResponse}
							IDKResponse={IDKResponse}
							smallerThan1000={smallerThan1000}
							showOverlay={showFeedback}
						/>
					)}
					{questionInFocus?.questionType === 'MultipleCorrect' && (
						//     The backend use MultipleCorrect as the term for MultiSelect
						<MultipleCorrect
							questionInFocus={questionInFocus}
							selectedAnswers={selectedAnswers}
							updateSelectedAnswersState={selectedAnswersState}
							clearSelection={clearSelection}
							clearSelectionState={clearSelectionState}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
							onClick={onClick}
							setIDKResponse={setIDKResponse}
							smallerThan1000={smallerThan1000}
							showOverlay={showFeedback}
							setTotalAnswerConfidence={setTotalAnswerConfidence}
						/>
					)}
					{questionInFocus?.questionType === 'Matching' && (
						//TODO: refactor this out when we have the matching component files
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
							{!showFeedback ? (
								<Fade in={!showFeedback}>
									<Text>Under construction</Text>
								</Fade>
							) : (
								<Fade in={showFeedback}>
									{' '}
									<MultipleChoiceOverLay
										questionInFocus={questionInFocus}
										selectedAnswers={selectedAnswers}
										setSelectedAnswers={selectedAnswersState}
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
								marginTop={'12px'}>
								<Button
									onClick={onClick}
									variant={'ampSolid'}
									w="150px"
									isDisabled={!IDKResponse && !selectedAnswers.length}>
									<Text>
										{i18n(showFeedback ? 'continueBtnText' : 'submitBtnText')}
									</Text>
								</Button>
								<Button
									_hover={{ backgroundColor: 'white' }}
									height="12px"
									variant="ghost"
									onClick={clearSelectionFunction}>
									{!showFeedback && (
										<Text fontSize={'14px'} color={'ampSecondary.500'}>
											{i18n('clearSelection')}
										</Text>
									)}
								</Button>
							</HStack>
						</Box>
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
								<Heading
									style={{ fontWeight: 'normal' }}
									mt={4}
									mb={4}
									as="h3"
									size="md">
									Click <strong>once</strong> if you are <strong>unsure</strong>
								</Heading>
								<img
									style={{
										marginTop: '24px',
										marginBottom: '24px',
									}}
									src="/images/unsure.gif"
									alt="unsure gif"
								/>
							</Box>
							<Box>
								<Heading
									style={{ fontWeight: 'normal' }}
									mt={4}
									mb={4}
									as="h3"
									size="md">
									Click <strong>twice</strong> if you are <strong>sure</strong>
								</Heading>
								<img
									style={{
										marginTop: '24px',
										marginBottom: '24px',
									}}
									src="/images/sure.gif"
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
