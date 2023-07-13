import { LoaderFunction } from 'react-router';
import {
	Box,
	Button,
	Container,
	Divider,
	Flex,
	FormControl,
	Heading,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PracticeTestCard, {
	CardValues,
} from '../components/ui/PracticeTestCard';
import PracticeTestHeader from '../components/ui/PracticeTestHeader';
import { requireUser } from '../utils/user';
import {
	getCurrentRoundTimedAssessment,
	getFullModuleWithQuestions,
} from '../services/learning';
import { getSubAccount } from '../services/utils';
import { useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import {
	Confidence,
	ModuleData,
	QuestionInFocus,
	RoundData,
} from '../components/pages/AssignmentView/AssignmentTypes';
import { AssignmentData } from '../lib/validator';
import { useEffect, useRef, useState } from 'react';
import { findQuestionInFocus } from '../components/pages/AssignmentView/findQuestionInFocus';
import Question from '../components/ui/Question';
import AnswerSelection from '../components/ui/AnswerSelection';
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons';
import useInterval from '../hooks/useInterval';
import RedIcon from '../components/ui/Icons/RedIcon';
import AmpBox from '../components/standard/container/AmpBox';
import { z } from 'zod';

export const TimedAssessmentFieldsSchema = z.object({
	answerUpdated: z.boolean(),
	questionType: z.string(),
	flagged: z.boolean(),
	confidence: z.string(),
	answers: z
		.array(
			z.object({
				answerId: z.number(),
			}),
		)
		.optional(),
	secondsSpent: z.number(),
	questionId: z.number(),
	timedAssessmentKey: z.string(),
	answerChoice: z.number().optional(),
});

export type TimedAssessmentFields = z.infer<typeof TimedAssessmentFieldsSchema>;

export const timedAssessmentLoader: LoaderFunction = async ({ params }) => {
	const user = requireUser();
	const assignmentUid = params.assignmentUid!;
	const { subAccount } = getSubAccount(user);
	const { assignmentData, moduleData, moduleInfoAndQuestions } =
		await getFullModuleWithQuestions(user, subAccount, assignmentUid);
	const { data: roundData } = await getCurrentRoundTimedAssessment(
		user,
		subAccount,
		assignmentUid,
	);
	return {
		assignmentUid,
		assignmentData,
		moduleData,
		moduleInfoAndQuestions,
		roundData,
	};
};

export default function TimedAssessment() {
	const fetcher = useFetcher();
	const { t: i18n } = useTranslation();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { assignmentUid, moduleInfoAndQuestions, roundData } =
		useLoaderData() as {
			assignmentUid: string;
			assignmentData: AssignmentData;
			moduleData: ModuleData;
			moduleInfoAndQuestions: ModuleData;
			roundData: RoundData;
		};
	const flaggedQuestionIds = roundData.questionList
		.filter((question) => question.flagged)
		.map((question) => question.publishedQuestionAuthoringKey);
	const selectedAnswerIds = roundData.questionList.flatMap((question) =>
		question.answerList
			.filter((answer) => answer.selected)
			.map((answer) => answer.id),
	);

	const navigate = useNavigate();
	const [questionInFocus, setQuestionInFocus] =
		useState<QuestionInFocus | null>(null);
	// const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer[]>([]);
	const [flaggedQuestions, setFlaggedQuestions] = useState(
		flaggedQuestionIds.length > 0 ? new Set(flaggedQuestionIds) : new Set(),
	);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
		selectedAnswerIds.length > 0 ? selectedAnswerIds[0] : null,
	);
	const [answerUpdated, setAnswerUpdated] = useState(false);
	const [seconds, setSeconds] = useState<number | null>(
		roundData.timeRemaining,
	);

	const [secondsSpent, setSecondsSpent] = useState<number>(0);

	const ref = useRef<HTMLFormElement>(null);

	const timerFunc = () => {
		setSeconds((prevSeconds) => {
			if (prevSeconds === null) {
				return null;
			}
			if (prevSeconds === 0) {
				return prevSeconds;
			}

			return prevSeconds - 1;
		});
	};

	const startTimer = useInterval(timerFunc, 1000);

	const secondsSpentFunc = () => {
		setSecondsSpent((prevSecondsSpent) => {
			return prevSecondsSpent + 1;
		});
	};

	const startSecondsSpent = useInterval(secondsSpentFunc, 1000);

	useEffect(() => {
		startTimer(true);
		startSecondsSpent(true);
		return () => {
			startTimer(false); // Stop the timer when the component unmounts
			startSecondsSpent(false);
		};
	}, []);

	useEffect(() => {
		if (seconds === 0) {
			startTimer(false);
			onOpen();
		}
	}, [seconds]);

	const handleFlagForReview = () => {
		if (questionInFocus) {
			setFlaggedQuestions((prevState) => {
				const newSet = new Set(prevState);
				if (newSet.has(questionInFocus.publishedQuestionAuthoringKey)) {
					newSet.delete(questionInFocus.publishedQuestionAuthoringKey);
				} else {
					newSet.add(questionInFocus.publishedQuestionAuthoringKey);
				}
				return newSet;
			});
		}
	};

	const handleNavigation = (question: QuestionInFocus) => {
		setQuestionInFocus(
			findQuestionInFocus(
				moduleInfoAndQuestions,
				roundData,
				false,
				false,
				question.displayOrder - 1,
			),
		);
	};

	const handleResultsNavigation = () => {
		navigate('results');
	};

	useEffect(() => {
		if (!questionInFocus) {
			setQuestionInFocus(
				findQuestionInFocus(moduleInfoAndQuestions, roundData, false, false),
			);
		}
	}, [questionInFocus]);

	useEffect(() => {
		if (fetcher.data) {
			setSecondsSpent(0);
			setAnswerUpdated(false);
		}
	}, [fetcher.data]);

	return (
		<Box as="main" id="timed-assessment">
			<Container margin={0} padding={0} maxWidth={'100vw'}>
				<PracticeTestHeader
					text={moduleInfoAndQuestions.name}
					timeRemaining={seconds}
				/>
				<HStack justify="center" align="space-between">
					<Stack
						w="100%"
						p={3}
						pr={0}
						alignItems="stretch"
						direction={['column', 'column', 'row', 'row', 'row', 'row']}>
						<Box
							backgroundColor="ampNeutral.200"
							boxShadow="md"
							borderRadius={24}
							maxWidth={480}
							maxHeight={274}
							px={6}
							py={6}
							w={{ base: '100%', md: '50%' }}>
							<Heading mb={4} as="h2" fontSize="xl">
								{i18n('practiceTestNavigation')}
							</Heading>
							<Divider marginTop={1} marginBottom={1} />
							{roundData.questionList.map((question) => {
								const values: CardValues = ['unselected'];
								if (
									question.publishedQuestionAuthoringKey ===
									questionInFocus?.publishedQuestionAuthoringKey
								) {
									values.push('selected');
								}

								if (question.confidence !== Confidence.NA) {
									values.push('answered');
								}

								if (
									flaggedQuestions.has(question.publishedQuestionAuthoringKey)
								) {
									values.push('flagged');
								}

								return (
									<PracticeTestCard
										key={question.publishedQuestionAuthoringKey}
										size="sm"
										variant="multiPartCard"
										values={values}
										text={question.displayOrder.toString()}
										onClick={() => handleNavigation(question)}
									/>
								);
							})}
							<Button display="block" mr="auto" ml="auto">
								{i18n('finishPracticeTest')}
							</Button>
						</Box>

						{/*QuestionArea*/}
						<AmpBox>
							<Question questionInFocus={questionInFocus} />
						</AmpBox>
						{/*<AnswerArea*/}
						<AmpBox>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="space-between">
								<Heading as="h2">{i18n('answer')}</Heading>
								<Button
									leftIcon={
										flaggedQuestions.has(
											questionInFocus?.publishedQuestionAuthoringKey,
										) ? (
											<BookmarkFilledIcon />
										) : (
											<BookmarkIcon />
										)
									}
									colorScheme="ampSecondary"
									variant="ghost"
									onClick={handleFlagForReview}>
									{flaggedQuestions.has(
										questionInFocus?.publishedQuestionAuthoringKey,
									)
										? i18n('flaggedForReview')
										: i18n('flagForReview')}
								</Button>
							</Stack>
							<fetcher.Form
								ref={ref}
								method="POST"
								action="/api/timedAssessment">
								<AnswerSelection
									questionInFocus={questionInFocus}
									setSelectedAnswer={setSelectedAnswer}
									selectedAnswer={selectedAnswer}
									setAnswerUpdated={setAnswerUpdated}
									// roundData={roundData}
								/>
								<FormControl hidden={true}>
									<Input
										readOnly={true}
										id="timedAssessmentKey"
										name="timedAssessmentKey"
										value={assignmentUid}
									/>
								</FormControl>
								<FormControl hidden={true}>
									<Input
										readOnly={true}
										id="answerUpdated"
										name="answerUpdated"
										value={answerUpdated.toString()}
									/>
								</FormControl>
								<FormControl hidden={true}>
									<Input
										readOnly={true}
										id="flagged"
										name="flagged"
										value={flaggedQuestions
											.has(questionInFocus?.publishedQuestionAuthoringKey)
											.toString()}
									/>
								</FormControl>
								<FormControl hidden={true}>
									<Input
										readOnly={true}
										id="questionType"
										name="questionType"
										value="MultipleChoice"
									/>
								</FormControl>
								<FormControl hidden={true}>
									<Input
										readOnly={true}
										id="questionId"
										name="questionId"
										value={questionInFocus?.id}
									/>
								</FormControl>
								<FormControl hidden={true}>
									<Input
										readOnly={true}
										id="confidence"
										name="confidence"
										value={selectedAnswer ? Confidence.Sure : Confidence.NA}
									/>
								</FormControl>
								<FormControl hidden={true}>
									<Input
										readOnly={true}
										id="secondsSpent"
										name="secondsSpent"
										value={secondsSpent}
									/>
								</FormControl>
								<Divider marginTop={11} />
								<HStack marginTop={3} justify="space-between">
									<Button type="submit">{i18n('submitBtnText')}</Button>
									<Button
										isDisabled={!selectedAnswer}
										colorScheme="ampSecondary"
										variant="ghost">
										{i18n('clearSelectionPlural')}
									</Button>
								</HStack>
							</fetcher.Form>
						</AmpBox>
					</Stack>
				</HStack>
			</Container>
			<Modal
				size="lg"
				closeOnOverlayClick={false}
				isOpen={isOpen}
				onClose={onClose}
				onEsc={handleResultsNavigation}
				isCentered>
				<ModalOverlay />
				<ModalContent p={6}>
					<Flex alignItems="center" justify="center">
						<RedIcon />
						<Box>
							<ModalHeader fontSize="lg">
								{i18n('youHaveRunOutOfTime')}
							</ModalHeader>
							<ModalBody>
								<Text> {i18n('yourPracticeTestIsComplete')}</Text>
							</ModalBody>
						</Box>
					</Flex>
					<ModalFooter mr="auto" ml="auto">
						<Button onClick={handleResultsNavigation}>
							{i18n('continueToResults')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}
