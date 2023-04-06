//@ts-nocheck
import { useState, useRef } from 'react';
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

const OverlayOne = ({ tourStep }) => (
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
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers[]>([]);
	const [questionData] = useState(questionDataMock);

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
						isOpen={tourStep === 3}
						placement="bottom-start"
						initialFocusRef={barRef.current}
						gutter="40">
						<PopoverTrigger>
							<PopoverAnchor>
								<Box style={{ zIndex: barIndex, pointerEvents: 'none' }}>
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
								<PopoverArrow />
								<PopoverCloseButton
									p="24px"
									onClick={() => {
										nav(-1);
									}}
								/>
								<PopoverBody p="24px" pl="0">
									<Heading fontSize={24} as="h2" mb={3}>
										Your estimated time left ⏰
									</Heading>
									<Text>
										This is approximately how much time we think it will take
										you to complete this module. It will fluctuate throughout
										based on how you answer.
									</Text>
								</PopoverBody>
								<PopoverFooter border="0" p="0" justifyContent="flex-start">
									<HStack spacing={5}>
										<Text color="rgba(0, 0, 0, 0.5)" mr="auto">
											Step {tourStep} of 6
										</Text>
										<Text
											as="u"
											color="rgba(0, 0, 0, 0.5)"
											cursor="pointer"
											onClick={() => {
												nav(-1);
											}}>
											Skip the tour
										</Text>

										<Button
											onClick={() => {
												setTourStep(tourStep + 1);
												setBarIndex(0);
											}}>
											Next
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
								gutter="40">
								<PopoverTrigger>
									<PopoverAnchor>
										<Box style={{ zIndex: ansIndex, pointerEvents: 'none' }}>
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
								<Box style={{ position: 'relative', zIndex: ansIndex }}>
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
												We first ask questions 🤔
											</Heading>
											<Text>
												By first answering questions, we prime your brain to
												acquire new knowledge, creating a mental framework for
												the material to be learned.
											</Text>
										</PopoverBody>
										<PopoverFooter border="0" p="0" justifyContent="flex-start">
											<HStack spacing={5}>
												<Text color="rgba(0, 0, 0, 0.5)" mr="auto">
													Step {tourStep} of 6
												</Text>
												<Text
													as="u"
													color="rgba(0, 0, 0, 0.5)"
													cursor="pointer"
													onClick={() => {
														nav(-1);
													}}>
													Skip the tour
												</Text>

												<Button
													onClick={() => {
														setTourStep(tourStep + 1);
														setAnsIndex(0);
														setBarIndex(1500);
													}}>
													Next
												</Button>
											</HStack>
										</PopoverFooter>
									</PopoverContent>
								</Box>
							</Popover>
						</HStack>
						<ProgressMenu
							isMenuOpen={isMenuOpen}
							currentRoundQuestionListData={currentRoundQuestionListData}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						/>
					</HStack>
				</Container>
			</main>
			<OverlayOne tourStep={tourStep} />
		</>
	);
};

export default StaticAssignmentView;
