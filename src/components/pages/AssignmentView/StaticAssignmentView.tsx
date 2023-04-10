//@ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Container,
	HStack,
	useMediaQuery,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	PopoverAnchor,
	Button,
	Text,
	ModalOverlay,
	Modal,
	Heading,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';
import { useTranslation } from 'react-i18next';

import AnswerArea from '../../ui/AnswerInput/AnswerArea';
import {
	CurrentRoundAnswerOverLayData,
	QuestionInFocus,
	CurrentRoundQuestionListData,
	SelectedAnswers,
} from './AssignmentTypes';

import {
	currentRoundQuestionListDataMock,
	questionDataMock,
	questionInFocusDataMock,
	currentRoundAnswerOverlayDataMock,
} from './mockAssignmentData';

const OverlayOne = ({ tourStep }: number) => (
	<Modal isOpen={tourStep >= 2}>
		<ModalOverlay bg="rgba(41, 61, 89, 0.8)" backdropFilter="auto" />
	</Modal>
);

const StaticAssignmentView = ({
	tourStep,
	setTourStep,
	ansIndex,
	setAnsIndex,
	barIndex,
	setBarIndex,
}) => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers[]>([]);
	const [questionData] = useState(questionDataMock);
	const [menuIndex, setMenuIndex] = useState(0);

	const [questionInFocusMock] = useState<QuestionInFocus>(
		questionInFocusDataMock,
	);

	const [currentRoundQuestionListData] = useState<CurrentRoundQuestionListData>(
		currentRoundQuestionListDataMock,
	);

	const [currentRoundAnswerOverLayData] =
		useState<CurrentRoundAnswerOverLayData>(currentRoundAnswerOverlayDataMock);

	const answerRef = useRef();
	const barRef = useRef();
	const nav = useNavigate();

	const barPopoverContent = {
		3: {
			placement: 'bottom-start',
			title: 'step3PopoverTitle',
			content: 'step3PopoverContent',
			arrowOffset: '25px',
		},
		4: {
			placement: 'bottom',
			title: 'step4PopoverTitle',
			content: 'step4PopoverContent',
			arrowOffset: '230px',
		},
		5: {
			placement: 'bottom-end',
			title: 'step5PopoverTitle',
			content: 'step5PopoverContent',
			arrowOffset: '450px',
		},
	};

	useEffect(() => {
		if (tourStep === 6) {
			setIsMenuOpen(true);
			setBarIndex(0);
			setMenuIndex(1500);
		}
	}, [tourStep]);

	return (
		<>
			<main id="learning-assignment" pointerEvents="none">
				<Container
					id={'learning-assignment'}
					margin="0"
					padding="0"
					maxWidth={'100vw'}
					overflowY={'hidden'}
					overflowX={'hidden'}>
					<Popover
						isOpen={tourStep >= 3 && tourStep < 6}
						placement={barPopoverContent[tourStep]?.placement || 'bottom'}
						initialFocusRef={barRef.current}
						arrowSize={20}
						gutter={20}>
						<PopoverTrigger>
							<PopoverAnchor>
								<Box
									style={{
										zIndex: barIndex,
										pointerEvents: 'none',
										position: 'relative',
									}}>
									<TestProgressBarMenu
										id={'bar'}
										questionData={questionData}
										isMenuOpen={isMenuOpen}
										setIsMenuOpen={setIsMenuOpen}
										currentRoundQuestionListData={currentRoundQuestionListData}
										currentQuestion={questionInFocusMock}
										currentRoundAnswerOverLayData={
											currentRoundAnswerOverLayData
										}
										ref={barRef.current}
										tabIndex="0"
									/>
								</Box>
							</PopoverAnchor>
						</PopoverTrigger>
						<Box style={{ position: 'relative', zIndex: barIndex }}>
							<PopoverContent p="24px" w="560px" h="287px">
								<Box
									position="fixed"
									top="2px"
									left={barPopoverContent[tourStep]?.arrowOffset}>
									<PopoverArrow position="fixed" top="0" left="0" />
								</Box>
								<PopoverCloseButton
									p="24px"
									onClick={() => {
										nav(-1);
									}}
								/>
								<PopoverBody p="24px" pl="0">
									<Heading fontSize={24} as="h2" mb={3}>
										{i18n(barPopoverContent[tourStep]?.title)}
									</Heading>
									<Text>{i18n(barPopoverContent[tourStep]?.content)}</Text>
								</PopoverBody>
								<PopoverFooter border="0" p="0" justifyContent="flex-start">
									<HStack spacing={5}>
										<Text color="rgba(0, 0, 0, 0.5)" mr="auto">
											{i18n('step')} {tourStep} {i18n('of6')}
										</Text>
										<Text
											as="u"
											color="rgba(0, 0, 0, 0.5)"
											cursor="pointer"
											onClick={() => {
												nav(-1);
											}}>
											{i18n('skipTour')}
										</Text>

										<Button
											onClick={() => {
												setTourStep(tourStep + 1);
											}}>
											{i18n('nextBtn')}
										</Button>
									</HStack>
								</PopoverFooter>
							</PopoverContent>
						</Box>
					</Popover>
					<HStack width="100%">
						<HStack
							w="100%"
							p="12px"
							justifyContent={'center'}
							flexWrap={isSmallerThan1000 ? 'wrap' : 'nowrap'}>
							<Box
								style={{
									backgroundColor: 'white',
									margin: '6px',
								}}
								boxShadow="2xl"
								w="100%"
								maxWidth={726}
								h={isSmallerThan1000 ? '' : '745px'}
								overflow="hidden"
								borderRadius={24}
								p={'72px'}>
								<Question questionInFocus={questionInFocusMock} />
							</Box>
							<Popover
								isOpen={tourStep === 2}
								placement="left"
								initialFocusRef={answerRef.current}
								gutter="40"
								arrowSize={20}>
								<PopoverTrigger>
									<PopoverAnchor>
										<Box
											style={{
												zIndex: ansIndex,
												pointerEvents: 'none',
												maxHeight: '755px',
											}}>
											<AnswerArea
												id="answerArea"
												smallerThan1000={isSmallerThan1000}
												questionInFocus={questionInFocusMock}
												currentRoundAnswerOverLayData={
													currentRoundAnswerOverLayData
												}
												selectedAnswers={selectedAnswers}
												selectedAnswersState={setSelectedAnswers}
												ref={answerRef.current}
												tabIndex="0"
											/>
										</Box>
									</PopoverAnchor>
								</PopoverTrigger>
								<Box
									style={{
										position: 'relative',
										zIndex: tourStep === 2 ? ansIndex : 'unset',
									}}>
									<PopoverContent p="24px" w="560px" h="287px">
										<PopoverArrow />
										<PopoverCloseButton
											p="24px"
											onClick={() => {
												nav(-1);
											}}
										/>
										<PopoverBody p="24px" pl="0">
											<Heading fontSize={24} as="h2" mb={3}>
												{i18n('step2PopoverTitle')}
											</Heading>
											<Text>{i18n('step2PopoverContent')}</Text>
										</PopoverBody>
										<PopoverFooter border="0" p="0" justifyContent="flex-start">
											<HStack spacing={5}>
												<Text color="rgba(0, 0, 0, 0.5)" mr="auto">
													{i18n('step')} {tourStep} {i18n('of6')}
												</Text>
												<Text
													as="u"
													color="rgba(0, 0, 0, 0.5)"
													cursor="pointer"
													onClick={() => {
														nav(-1);
													}}>
													{i18n('skipTour')}
												</Text>

												<Button
													onClick={() => {
														setTourStep(tourStep + 1);
														setAnsIndex(0);
														setBarIndex(1500);
													}}>
													{i18n('nextBtn')}
												</Button>
											</HStack>
										</PopoverFooter>
									</PopoverContent>
								</Box>
							</Popover>
						</HStack>
						<Popover
							isOpen={tourStep === 6}
							placement="auto"
							gutter="40"
							arrowSize={20}>
							<PopoverTrigger>
								<PopoverAnchor>
									<Box
										style={{
											zIndex: menuIndex,
											pointerEvents: 'none',
											marginTop: 'unset',
										}}>
										<ProgressMenu
											isMenuOpen={isMenuOpen}
											currentRoundQuestionListData={
												currentRoundQuestionListData
											}
											currentRoundAnswerOverLayData={
												currentRoundAnswerOverLayData
											}
										/>
									</Box>
								</PopoverAnchor>
							</PopoverTrigger>
							<Box style={{ position: 'relative', zIndex: menuIndex }}>
								<PopoverContent p="24px" w="560px" h="287px">
									<PopoverArrow />
									<PopoverCloseButton
										p="24px"
										onClick={() => {
											nav(-1);
										}}
									/>
									<PopoverBody p="24px" pl="0">
										<Heading fontSize={24} as="h2" mb={3}>
											{i18n('step6PopoverTitle')}
										</Heading>
										<Text>{i18n('step6PopoverContent')}</Text>
									</PopoverBody>
									<PopoverFooter border="0" p="0" justifyContent="flex-start">
										<HStack spacing={5}>
											<Text color="rgba(0, 0, 0, 0.5)" mr="auto">
												{i18n('step')} {tourStep} {i18n('of6')}
											</Text>
											<Text
												as="u"
												color="rgba(0, 0, 0, 0.5)"
												cursor="pointer"
												onClick={() => {
													nav(-1);
												}}>
												{i18n('skipTour')}
											</Text>

											<Button
												onClick={() => {
													nav(-1);
												}}>
												{i18n('finishTourBtn')}
											</Button>
										</HStack>
									</PopoverFooter>
								</PopoverContent>
							</Box>
						</Popover>
					</HStack>
				</Container>
			</main>
			<OverlayOne tourStep={tourStep} />
		</>
	);
};

export default StaticAssignmentView;
