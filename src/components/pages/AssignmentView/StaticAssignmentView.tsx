//@ts-nocheck
import { useEffect, useRef, useState } from 'react';
import {
	Box,
	Button,
	Container,
	Heading,
	HStack,
	Popover,
	PopoverAnchor,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverTrigger,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';
import { useTranslation } from 'react-i18next';

import AnswerArea from '../../ui/AnswerArea';
import {
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	QuestionInFocus,
	SelectedAnswer,
} from './AssignmentTypes';

import {
	currentRoundAnswerOverlayDataMock,
	currentRoundQuestionListDataMock,
	questionDataMock,
	questionInFocusDataMock,
} from './mockAssignmentData';

import { useProgressMenuContext } from '../../../hooks/useProgressMenuContext';

const StaticAssignmentView = ({
	tourStep,
	setTourStep,
	ansIndex,
	setAnsIndex,
	barIndex,
	setBarIndex,
	nav,
}) => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const { isMenuOpen, handleMenuOpen } = useProgressMenuContext();
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
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
			handleMenuOpen();
			setBarIndex(0);
			setMenuIndex(1500);
		}
	}, [tourStep]);

	return (
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
					isLazy
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
									currentRoundQuestionListData={currentRoundQuestionListData}
									currentQuestion={questionInFocusMock}
									currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
									ref={barRef.current}
									tabIndex="0"
								/>
							</Box>
						</PopoverAnchor>
					</PopoverTrigger>
					<Box style={{ position: 'relative', zIndex: barIndex }}>
						<PopoverContent
							p={6}
							w={isSmallerThan1000 ? '100vw' : '560px'}
							h="auto">
							<Box
								position="fixed"
								top="2px"
								left={barPopoverContent[tourStep]?.arrowOffset}>
								<PopoverArrow position="fixed" top="0" left="0" />
							</Box>
							<PopoverCloseButton
								p={6}
								onClick={() => {
									nav(-1);
								}}
							/>
							<PopoverBody p={6} pl="0">
								<Heading fontSize="2xl-chakra" as="h2" mb={3}>
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
				<HStack justify="center" align="space-between">
					<Stack
						maxW="1496"
						w="100%"
						p={3}
						pr="0px"
						alignItems="stretch"
						direction={['column', 'column', 'row', 'row', 'row', 'row']}>
						<Box
							backgroundColor="white"
							boxShadow="md"
							borderRadius={24}
							px={12}
							py="44px"
							w={{ base: '100%', md: '50%' }}
							minWidth={{ base: '100%', md: '50%' }}>
							<Question questionInFocus={questionInFocusMock} />
						</Box>
						<Popover
							isOpen={tourStep === 2}
							placement={isSmallerThan1000 ? 'top' : 'left'}
							isLazy
							initialFocusRef={answerRef.current}
							gutter="40"
							arrowSize={20}>
							<PopoverTrigger>
								<PopoverAnchor>
									<Box
										style={{
											zIndex: ansIndex,
											pointerEvents: 'none',
										}}
										w={{ base: '100%', md: '50%' }}
										minWidth="100%">
										<AnswerArea
											id="answerArea"
											smallerThan1000={isSmallerThan1000}
											questionInFocus={questionInFocusMock}
											currentRoundAnswerOverLayData={
												currentRoundAnswerOverLayData
											}
											selectedAnswers={selectedAnswers}
											setSelectedAnswers={setSelectedAnswers}
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
								<PopoverContent
									p={6}
									w={isSmallerThan1000 ? '100vw' : '560px'}
									h="auto">
									<PopoverArrow />
									<PopoverCloseButton
										p={6}
										onClick={() => {
											nav(-1);
										}}
									/>
									<PopoverBody p={6} pl="0">
										<Heading fontSize="2xl-chakra" as="h2" mb={3}>
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
					</Stack>
					<Popover
						isOpen={tourStep === 6}
						placement={isSmallerThan1000 ? 'top' : 'left-start'}
						isLazy
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
										currentRoundQuestionListData={currentRoundQuestionListData}
										currentRoundAnswerOverLayData={
											currentRoundAnswerOverLayData
										}
									/>
								</Box>
							</PopoverAnchor>
						</PopoverTrigger>
						<Box style={{ position: 'relative', zIndex: menuIndex }}>
							<PopoverContent
								p={6}
								w={isSmallerThan1000 ? '100vw' : '560px'}
								h="auto">
								<Box position="fixed" top="40px" left="555px">
									<PopoverArrow position="fixed" top="0" left="0" />
								</Box>
								<PopoverCloseButton
									p={6}
									onClick={() => {
										nav(-1);
									}}
								/>
								<PopoverBody p={6} pl="0">
									<Heading fontSize="2xl-chakra" as="h2" mb={3}>
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
												handleMenuOpen();
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
	);
};

export default StaticAssignmentView;
