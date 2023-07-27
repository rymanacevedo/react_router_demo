import AmpBox from '../../standard/container/AmpBox';
import Question from '../Question';
import { Button, Divider, Heading, HStack, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
	FetcherWithComponents,
	json,
	useFetcher,
	useLoaderData,
	useNavigate,
	useOutletContext,
} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { LoaderFunction } from 'react-router';
import { requireUser } from '../../../utils/user';
import { Confidence } from '../../pages/AssignmentView/AssignmentTypes';
import HiddenFormInputs from './HiddenFormInputs';
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons';
import AnswerSelection from '../AnswerSelection';
import { findQuestionInFocus } from '../../pages/AssignmentView/findQuestionInFocus';
import { OutletContext } from '../../../routes/TimedAssessment';
import { QuestionInFocus } from '../../../lib/validator';
import { UserSchema } from '../../../services/user';
import { z } from 'zod';

const LoaderDataSchema = z.object({
	user: UserSchema,
	hasConfidenceEnabled: z.boolean(),
	questionId: z.string(),
});

type LoaderData = z.infer<typeof LoaderDataSchema>;

export const questionAnswerLoader: LoaderFunction = async ({ params }) => {
	const user = requireUser();
	const questionId = params.questionId!;
	const hasConfidenceEnabled = user.config.showTimedAssessmentConfidence;

	return json({ user, hasConfidenceEnabled, questionId });
};
export default function AmpBoxWithQuestionAndAnswer() {
	const { t: i18n } = useTranslation();
	const fetcher = useFetcher();
	const navigate = useNavigate();
	const ref = useRef<HTMLFormElement>(null);
	const { user, hasConfidenceEnabled, questionId } =
		useLoaderData() as LoaderData;
	const context = useOutletContext<OutletContext>();
	const {
		setQuestionInFocus,
		secondsSpent,
		setSecondsSpent,
		startTimer,
		startSecondsSpent,
		assignmentUid,
		moduleInfoAndQuestions,
		questionTrigger,
		setQuestionTrigger,
		flaggedQuestions,
		setFlaggedQuestions,
		selectedAnswer,
		setSelectedAnswer,
		setAnsweredQuestions,
	} = context;
	const { questionInFocus, roundData } = context;
	const questions: QuestionInFocus[] = roundData.questionList.map(
		(question: QuestionInFocus) => question,
	);
	const [answerUpdated, setAnswerUpdated] = useState(false);

	const prepareAndSubmitFormData = ({
		currentRef,
		submitter,
	}: {
		currentRef: HTMLFormElement;
		submitter: FetcherWithComponents<any>;
	}) => {
		let answerChoices: HTMLInputElement[] = [];
		for (const item of currentRef) {
			const input = item as HTMLInputElement;
			if (input.name === 'answerChoice') {
				answerChoices.push(input);
			}
		}
		const choice = answerChoices.find(
			(answerChoice) => answerChoice.indeterminate || answerChoice.checked,
		);
		const form = new FormData(currentRef);
		form.append('user', JSON.stringify(user));
		if (choice) {
			form.append('answerChoice', choice.value);
		}
		submitter.submit(form, {
			method: 'POST',
			action: '/api/timedAssessment',
		});
	};

	const handleMouseLeave = async (event: MouseEvent) => {
		if (
			event.clientY <= 0 ||
			event.clientX <= 0 ||
			event.clientX >= window.innerWidth ||
			event.clientY >= window.innerHeight
		) {
			// WARNING handle events CAN'T see state changes for some weird reason. bug possibly? hence why I can't put answerUpdated in the if statement
			prepareAndSubmitFormData({
				currentRef: ref.current!,
				submitter: fetcher,
			});
		}
	};

	useEffect(() => {
		const f = fetcher;
		const currentRef = ref.current as HTMLFormElement;
		startTimer(true);
		startSecondsSpent(true);
		window.addEventListener('mouseout', handleMouseLeave);
		return () => {
			window.removeEventListener('mouseout', handleMouseLeave);
			startTimer(false); // Stop the timer when the component unmounts
			startSecondsSpent(false);

			if (!ref.current && f) {
				prepareAndSubmitFormData({ currentRef: currentRef, submitter: f });
			}
		};
	}, []);

	const handleNavigation = (question: QuestionInFocus) => {
		prepareAndSubmitFormData({ currentRef: ref.current!, submitter: fetcher });
		setQuestionInFocus(
			findQuestionInFocus(
				moduleInfoAndQuestions,
				roundData,
				false,
				false,
				question.displayOrder - 1,
			),
		);
		const answerInFocus = question.answerList.find((answer) => answer.selected);

		const selectedAnswerObj = answerInFocus
			? { id: answerInFocus.id, confidence: question.confidence! }
			: question.confidence === Confidence.NotSure
			? { id: 1, confidence: Confidence.NotSure }
			: { id: null, confidence: Confidence.NA };

		setSelectedAnswer(selectedAnswerObj);
		navigate(
			`/learning/timedAssessment/${assignmentUid}/${question.id.toString()}`,
		);
	};

	useEffect(() => {
		if (questionTrigger === null) {
			setQuestionInFocus(questionTrigger);
			navigate(`/learning/timedAssessment/${assignmentUid}/submission`);
		} else if (questionTrigger) {
			handleNavigation(questionTrigger);
		}
	}, [questionTrigger]);

	const handleFlagForReview = () => {
		setFlaggedQuestions((prevState: Set<string | undefined>) => {
			const newSet = new Set(prevState);
			if (newSet.has(questionInFocus?.publishedQuestionAuthoringKey)) {
				newSet.delete(questionInFocus?.publishedQuestionAuthoringKey);
			} else {
				newSet.add(questionInFocus?.publishedQuestionAuthoringKey);
			}
			return newSet;
		});
	};

	const handleAnsweredQuestions = (action?: string) => {
		setAnsweredQuestions((prevState: Set<string | undefined>) => {
			const newSet = new Set(prevState);
			if (
				newSet.has(questionInFocus?.publishedQuestionAuthoringKey) &&
				action === 'delete'
			) {
				newSet.delete(questionInFocus?.publishedQuestionAuthoringKey);
			} else {
				newSet.add(questionInFocus?.publishedQuestionAuthoringKey);
			}
			return newSet;
		});
	};

	useEffect(() => {
		if (fetcher.data) {
			setSecondsSpent(0);
			setAnswerUpdated(false);
		}
	}, [fetcher.data]);

	return (
		<>
			<AmpBox>
				<Question questionInFocus={questionInFocus} />
			</AmpBox>
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
								questionInFocus!.publishedQuestionAuthoringKey,
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
							questionInFocus!.publishedQuestionAuthoringKey,
						)
							? i18n('flaggedForReview')
							: i18n('flagForReview')}
					</Button>
				</Stack>
				<fetcher.Form
					ref={ref}
					onSubmit={() => {
						if (questionInFocus) {
							const id = Number(questionInFocus.id) + 1;
							setQuestionTrigger(
								questions.find((question) => question.id === id) || null,
							);
						}
					}}>
					<AnswerSelection
						questionInFocus={questionInFocus}
						setSelectedAnswer={setSelectedAnswer}
						selectedAnswer={selectedAnswer}
						setAnswerUpdated={setAnswerUpdated}
						hasConfidenceEnabled={hasConfidenceEnabled}
						handleAnsweredQuestions={handleAnsweredQuestions}
					/>
					<HiddenFormInputs
						assignmentUid={assignmentUid}
						answerUpdated={answerUpdated}
						flaggedQuestions={flaggedQuestions}
						questionInFocus={questionInFocus!}
						selectedAnswer={selectedAnswer}
						secondsSpent={secondsSpent}
						questionId={questionId}
					/>
					<Divider marginTop={11} />
					<HStack marginTop={3} justify="space-between">
						<Button type="submit">{i18n('nextQ')}</Button>
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
		</>
	);
}
