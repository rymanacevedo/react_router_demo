import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	SelectedAnswers,
} from '../../pages/AssignmentView/AssignmentTypes';
import {
	Box,
	Button,
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
import MultipleChoiceAnswers from '../MultipleChoiceAnswers';
import MultipleChoiceOverLay from '../MultipleChoiceOverLay';
import { useTranslation } from 'react-i18next';
import { MutableRefObject } from 'react';

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
				<Box
					style={{
						backgroundColor: 'white',
						margin: '6px',
						minHeight: '745px',
					}}
					boxShadow="2xl"
					h={props.smallerThan1000 ? '' : '100%'}
					display={'flex'}
					flexDirection="column"
					justifyContent={'space-between'}
					w="100%"
					maxWidth={726}
					overflow="hidden"
					borderRadius={24}
					p={'72px'}>
					{!props.showOverlay ? (
						<Fade in={!props.showOverlay}>
							{' '}
							<MultipleChoiceAnswers
								questionInFocus={props.questionInFocus}
								selectedAnswers={props.selectedAnswers}
								setSelectedAnswers={props.selectedAnswersState}
								clearSelection={props.clearSelection}
								setClearSelection={props.clearSelectionState}
								setIDKResponse={props.setIDKResponse}
								IDKResponse={props.IDKResponse}
							/>
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
					<HStack
						justifyContent={'space-between'}
						display={'flex'}
						marginTop={'12px'}>
						<Button
							onClick={props.onClick}
							variant={'ampSolid'}
							w="150px"
							isDisabled={
								!props.selectedAnswers.length ||
								(props.IDKResponse && !props.selectedAnswers.length)
							}>
							<Text>
								{i18n(props.showOverlay ? 'continueBtnText' : 'submitBtnText')}
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
			</PopoverAnchor>
			{/* TODO: a hack, is to wrap a box around instead of added zindex to the theme file https://chakra-ui.com/docs/styled-system/theme#z-index-values*/}
			<Box style={{ zIndex: 1401 }}>
				<PopoverContent
					p={props.smallerThan1000 ? 12 : 10}
					h={props.smallerThan1000 ? 'auto' : 485}
					w={560}>
					<PopoverArrow />
					<Heading as="h2" size="lg" mb={3}>
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
									style={{ marginTop: '24px', marginBottom: '24px' }}
									src={`${process.env.PUBLIC_URL}/images/unsure.gif`}
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
									style={{ marginTop: '24px', marginBottom: '24px' }}
									src={`${process.env.PUBLIC_URL}/images/sure.gif`}
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
