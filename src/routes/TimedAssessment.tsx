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
import {
	FetcherWithComponents,
	useFetcher,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import {
	Confidence,
	ModuleData,
	QuestionInFocus,
	RoundData,
} from '../components/pages/AssignmentView/AssignmentTypes';
import { AssignmentData } from '../lib/validator';
import { ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import { findQuestionInFocus } from '../components/pages/AssignmentView/findQuestionInFocus';
import Question from '../components/ui/Question';
import AnswerSelection from '../components/ui/AnswerSelection';
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons';
import useInterval from '../hooks/useInterval';
import RedIcon from '../components/ui/Icons/RedIcon';
import AmpBox from '../components/standard/container/AmpBox';
import { z } from 'zod';
import { UserSchema } from '../services/user';
import { SelectedAnswer } from '../components/ui/RefactoredAnswerInputs/MultipleChoiceInput';

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
	user: UserSchema.optional(),
});

export type TimedAssessmentFields = z.infer<typeof TimedAssessmentFieldsSchema>;

export const timedAssessmentLoader: LoaderFunction = async ({ params }) => {
	const user = requireUser();
	const hasConfidenceEnabled = user.config.showTimedAssessmentConfidence;
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
		hasConfidenceEnabled,
	};
};

export default function TimedAssessment() {
	const fetcher = useFetcher();
	const { t: i18n } = useTranslation();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		assignmentUid,
		moduleInfoAndQuestions,
		roundData,
		hasConfidenceEnabled,
	} = useLoaderData() as {
		assignmentUid: string;
		assignmentData: AssignmentData;
		moduleData: ModuleData;
		moduleInfoAndQuestions: ModuleData;
		roundData: RoundData;
		hasConfidenceEnabled: boolean;
	};
	const flaggedQuestionIds = roundData.questionList
		.filter((question) => question.flagged)
		.map((question) => question.publishedQuestionAuthoringKey);
	const answeredQuestionIds = roundData.questionList
		.filter(
			(question) =>
				question.confidence && question.confidence !== Confidence.NA,
		)
		.map((question) => question.publishedQuestionAuthoringKey);

	const initialQuestionInFocus = findQuestionInFocus(
		moduleInfoAndQuestions,
		roundData,
		false,
		false,
		0,
	);

	const navigate = useNavigate();
	const [questionInFocus, setQuestionInFocus] = useState<QuestionInFocus>(
		initialQuestionInFocus,
	);

	const foundAnswer = questionInFocus.answerList.find(
		(answer) => answer.selected,
	);

	const initialSelectedAnswer = foundAnswer
		? { id: foundAnswer.id, confidence: questionInFocus.confidence }
		: questionInFocus.confidence === Confidence.NotSure
		? { id: 1, confidence: Confidence.NotSure }
		: null;

	const [flaggedQuestions, setFlaggedQuestions] = useState(
		flaggedQuestionIds.length > 0 ? new Set(flaggedQuestionIds) : new Set(),
	);

	const initialAnsweredQuestions =
		answeredQuestionIds.length > 0
			? new Set(answeredQuestionIds)
			: initialSelectedAnswer
			? new Set([questionInFocus.publishedQuestionAuthoringKey])
			: new Set();

	const [answeredQuestions, setAnsweredQuestions] = useState(
		initialAnsweredQuestions,
	);
	const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>({
		id: initialSelectedAnswer !== null ? initialSelectedAnswer.id : null,
		confidence: questionInFocus.confidence ?? Confidence.NA,
	});

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

	const prepareAndSubmitFormData = ({
		currentRef,
		submitter,
	}: {
		currentRef: RefObject<HTMLFormElement>;
		submitter: FetcherWithComponents<any>;
	}) => {
		const user = requireUser();
		let answerChoices: HTMLInputElement[] = [];
		for (const item of currentRef.current!) {
			const input = item as HTMLInputElement;
			if (input.name === 'answerChoice') {
				answerChoices.push(input);
			}
		}
		const choice = answerChoices.find(
			(answerChoice) => answerChoice.indeterminate,
		);
		const form = new FormData(currentRef.current!);
		form.append('user', JSON.stringify(user));
		if (choice) {
			form.append('answerChoice', choice.value);
		}
		submitter.submit(form, {
			method: 'POST',
			action: '/api/timedAssessment',
		});
	};

	const handleSubmit = (
		event: any,
		f: FetcherWithComponents<any>,
		r: RefObject<HTMLFormElement>,
	) => {
		if (event) {
			event.preventDefault();
		}

		if (!answerUpdated) {
			return;
		}
		prepareAndSubmitFormData({ currentRef: r, submitter: f });
	};

	const handleMouseLeave = async (event: MouseEvent) => {
		if (
			event.clientY <= 0 ||
			event.clientX <= 0 ||
			event.clientX >= window.innerWidth ||
			event.clientY >= window.innerHeight
		) {
			// WARNING handle events CAN'T see state changes for some weird reason. bug possibly? hence why I can't put answerUpdated in the if statement
			prepareAndSubmitFormData({ currentRef: ref, submitter: fetcher });
		}
	};

	useEffect(() => {
		const f = fetcher;
		const user = requireUser();
		const currentRef = ref.current as HTMLFormElement;
		startTimer(true);
		startSecondsSpent(true);
		window.addEventListener('mouseout', handleMouseLeave);
		return () => {
			window.removeEventListener('mouseout', handleMouseLeave);
			startTimer(false); // Stop the timer when the component unmounts
			startSecondsSpent(false);

			if (!ref.current && f) {
				let answerChoices: HTMLInputElement[] = [];
				for (const item of currentRef) {
					const input = item as HTMLInputElement;
					if (input.name === 'answerChoice') {
						answerChoices.push(input);
					}
				}
				const choice = answerChoices.find(
					(answerChoice) => answerChoice.indeterminate,
				);
				const form = new FormData(currentRef);
				form.append('user', JSON.stringify(user));
				if (choice) {
					form.append('answerChoice', choice.value);
				}
				f.submit(form, {
					method: 'POST',
					action: '/api/timedAssessment',
				});
			}
		};
	}, []);

	useEffect(() => {
		if (seconds === 0) {
			startTimer(false);
			onOpen();
		}
	}, [seconds]);

	const handleFlagForReview = () => {
		setFlaggedQuestions((prevState) => {
			const newSet = new Set(prevState);
			if (newSet.has(questionInFocus.publishedQuestionAuthoringKey)) {
				newSet.delete(questionInFocus.publishedQuestionAuthoringKey);
			} else {
				newSet.add(questionInFocus.publishedQuestionAuthoringKey);
			}
			return newSet;
		});
	};

	const handleAnsweredQuestions = (action?: string) => {
		setAnsweredQuestions((prevState) => {
			const newSet = new Set(prevState);
			if (
				newSet.has(questionInFocus.publishedQuestionAuthoringKey) &&
				action === 'delete'
			) {
				newSet.delete(questionInFocus.publishedQuestionAuthoringKey);
			} else {
				newSet.add(questionInFocus.publishedQuestionAuthoringKey);
			}
			return newSet;
		});
	};

	const handleNavigation = (question: QuestionInFocus) => {
		// handle if the user selects the same navigation item
		if (!(question.id === questionInFocus!.id)) {
			const currentRef = ref.current as HTMLFormElement;
			let answerChoices: HTMLInputElement[] = [];
			for (const item of currentRef) {
				const input = item as HTMLInputElement;
				if (input.name === 'answerChoice') {
					answerChoices.push(input);
				}
			}
			const choice = answerChoices.find(
				(answerChoice) => answerChoice.indeterminate,
			);
			const form = new FormData(currentRef);
			if (choice) {
				form.append('answerChoice', choice.value);
			}
			fetcher.submit(form, {
				method: 'POST',
				action: '/api/timedAssessment',
			});

			setQuestionInFocus(
				findQuestionInFocus(
					moduleInfoAndQuestions,
					roundData,
					false,
					false,
					question.displayOrder - 1,
				),
			);

			const a = question.answerList.find((answer) => answer.selected);

			const iSa = a
				? { id: a.id, confidence: question.confidence! }
				: question.confidence === Confidence.NotSure
				? { id: 1, confidence: Confidence.NotSure }
				: { id: null, confidence: Confidence.NA };

			setSelectedAnswer(iSa);
		}
	};

	const handleResultsNavigation = () => {
		navigate('results');
	};

	useEffect(() => {
		if (fetcher.data) {
			setSecondsSpent(0);
			setAnswerUpdated(false);
		}
	}, [fetcher.data]);

	function QuestionsCard(): ReactElement[] {
		return roundData.questionList.map((question) => {
			const values: CardValues = ['unselected'];
			if (
				question.publishedQuestionAuthoringKey ===
				questionInFocus.publishedQuestionAuthoringKey
			) {
				values.push('selected');
			}
			if (answeredQuestions.has(question.publishedQuestionAuthoringKey)) {
				values.push('answered');
			}
			if (flaggedQuestions.has(question.publishedQuestionAuthoringKey)) {
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
		});
	}

	function QuestionCardsComponent() {
		const elements = QuestionsCard();
		return <>{elements}</>;
	}

	function HiddenFormInputs(): ReactElement[] {
		const inputs = [
			{
				id: 'timedAssessmentKey',
				name: 'timedAssessmentKey',
				value: assignmentUid,
			},
			{
				id: 'answerUpdated',
				name: 'answerUpdated',
				value: answerUpdated.toString(),
			},
			{
				id: 'flagged',
				name: 'flagged',
				value: flaggedQuestions
					.has(questionInFocus.publishedQuestionAuthoringKey)
					.toString(),
			},
			{
				id: 'questionType',
				name: 'questionType',
				value: questionInFocus.questionType,
			},
			{ id: 'questionId', name: 'questionId', value: questionInFocus.id },
			{
				id: 'confidence',
				name: 'confidence',
				value: selectedAnswer.confidence.toString(),
			},
			{ id: 'secondsSpent', name: 'secondsSpent', value: secondsSpent },
		];

		return inputs.map((input) => (
			<FormControl hidden={true} key={input.id}>
				<Input
					readOnly={true}
					id={input.id}
					name={input.name}
					value={input.value}
				/>
			</FormControl>
		));
	}
	function HiddenFormInputsComponent() {
		const elements = HiddenFormInputs();
		return <>{elements}</>;
	}

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
							<QuestionCardsComponent />
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
								<Heading as="h2" fontSize="xl">
									{i18n('answer')}
								</Heading>
								<Button
									leftIcon={
										flaggedQuestions.has(
											questionInFocus.publishedQuestionAuthoringKey,
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
										questionInFocus.publishedQuestionAuthoringKey,
									)
										? i18n('flaggedForReview')
										: i18n('flagForReview')}
								</Button>
							</Stack>
							<fetcher.Form
								ref={ref}
								onSubmit={(e) => handleSubmit(e, fetcher, ref)}>
								<AnswerSelection
									questionInFocus={questionInFocus}
									setSelectedAnswer={setSelectedAnswer}
									selectedAnswer={selectedAnswer}
									setAnswerUpdated={setAnswerUpdated}
									hasConfidenceEnabled={hasConfidenceEnabled}
									handleAnsweredQuestions={handleAnsweredQuestions}
									// roundData={roundData}
								/>
								<HiddenFormInputsComponent />
								<Divider marginTop={11} />
								<HStack marginTop={3} justify="space-between">
									<Button type="submit">{i18n('submitBtnText')}</Button>
									<Button
										isDisabled={!selectedAnswer.id}
										onClick={() => {
											setSelectedAnswer(() => {
												return {
													id: null,
													confidence: Confidence.NA,
												};
											});
											handleAnsweredQuestions('delete');
										}}
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
