import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswers,
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
import { MutableRefObject } from 'react';
import { MultipleChoice } from './MultipleChoiceAnswerInput/MultipleChoice';
import MultipleChoiceOverLay from './MultipleChoiceAnswerInput/MultipleChoiceFeedBack';
import MultipleCorrect from './MultipleCorrectAnswerInput/MultipleCorrect';
import { useTranslation } from 'react-i18next';

export default function AnswerArea(props: {
	isOpen: boolean;
	onClose: () => void;
	smallerThan1000: boolean;
	initialFocusRef: MutableRefObject<null>;
	showOverlay: boolean;
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
	setTotalAnswerConfidence: (value: string) => void;
}) {
	const { t: i18n } = useTranslation();

	return (
		<Popover
			closeOnBlur={false}
			closeOnEsc={false}
			isLazy={true}
			offset={[-150, 0]}
			arrowPadding={220}
			isOpen={props.isOpen}
			onClose={props.onClose}
			defaultIsOpen={props.isOpen}
			placement={props.smallerThan1000 ? 'auto' : 'left'}
			initialFocusRef={props.initialFocusRef}
			arrowSize={20}>
			<PopoverAnchor>
				<>
					{props.questionInFocus?.questionType === 'MultipleChoice' && (
						<MultipleChoice
							questionInFocus={props.questionInFocus}
							selectedAnswers={props.selectedAnswers}
							selectedAnswersState={props.selectedAnswersState}
							clearSelection={props.clearSelection}
							clearSelectionState={props.clearSelectionState}
							currentRoundAnswerOverLayData={
								props.currentRoundAnswerOverLayData
							}
							onClick={props.onClick}
							clearSelectionFunction={props.clearSelectionFunction}
							setIDKResponse={props.setIDKResponse}
							IDKResponse={props.IDKResponse}
							smallerThan1000={props.smallerThan1000}
							showOverlay={props.showOverlay}
						/>
					)}
					{props.questionInFocus?.questionType === 'MultipleCorrect' && (
						<MultipleCorrect
							questionInFocus={props.questionInFocus}
							selectedAnswers={props.selectedAnswers}
							updateSelectedAnswersState={props.selectedAnswersState}
							clearSelection={props.clearSelection}
							clearSelectionState={props.clearSelectionState}
							currentRoundAnswerOverLayData={
								props.currentRoundAnswerOverLayData
							}
							onClick={props.onClick}
							setIDKResponse={props.setIDKResponse}
							smallerThan1000={props.smallerThan1000}
							showOverlay={props.showOverlay}
							setTotalAnswerConfidence={props.setTotalAnswerConfidence}
						/>
					)}
					{props.questionInFocus?.questionType === 'Matching' && (
						//TODO: refactor this out when we have the matching component files
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
								<Fade in={!props.showOverlay}>
									<Text>Under construction</Text>
								</Fade>
							) : (
								<Fade in={props.showOverlay}>
									{' '}
									<MultipleChoiceOverLay
										questionInFocus={props.questionInFocus}
										selectedAnswers={props.selectedAnswers}
										setSelectedAnswers={props.selectedAnswersState}
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
									onClick={props.onClick}
									variant={'ampSolid'}
									w="150px"
									isDisabled={
										!props.IDKResponse && !props.selectedAnswers.length
									}>
									<Text>
										{i18n(
											props.showOverlay ? 'continueBtnText' : 'submitBtnText',
										)}
									</Text>
								</Button>
								<Button
									_hover={{ backgroundColor: 'white' }}
									height="12px"
									variant="ghost"
									onClick={props.clearSelectionFunction}>
									{!props.showOverlay && (
										<Text fontSize={'14px'} color={'ampSecondary.500'}>
											{i18n('clearSelection')}
										</Text>
									)}
								</Button>
							</HStack>
						</Box>
					)}
				</>
			</PopoverAnchor>
			{/* TODO: a hack, is to wrap a box around instead of added zindex to the theme file https://chakra-ui.com/docs/styled-system/theme#z-index-values*/}
			<Box style={{ zIndex: 1401 }}>
				<PopoverContent
					p={props.smallerThan1000 ? 12 : 10}
					h={props.smallerThan1000 ? 'auto' : 485}
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
									src={`${import.meta.env.VITE_PUBLIC_URL}/images/unsure.gif`}
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
									src={`${import.meta.env.VITE_PUBLIC_URL}/images/sure.gif`}
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
						<Button mt={4} onClick={props.onClose} ref={props.initialFocusRef}>
							Continue
						</Button>
					</PopoverBody>
				</PopoverContent>
			</Box>
		</Popover>
	);
}
