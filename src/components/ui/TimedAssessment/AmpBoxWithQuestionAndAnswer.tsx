import AmpBox from '../../standard/container/AmpBox';
import Question from '../Question';
import {
	Button,
	Divider,
	Heading,
	HStack,
	Stack,
	useUpdateEffect,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
	FetcherWithComponents,
	json,
	useFetcher,
	useLoaderData,
	useOutletContext,
} from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LoaderFunction } from 'react-router';
import { requireUser } from '../../../utils/user';
import { Confidence } from '../../pages/AssignmentView/AssignmentTypes';
import HiddenFormInputs from './HiddenFormInputs';
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons';
import AnswerSelection from '../AnswerSelection';
import { OutletContext } from '../../../routes/TimedAssessment';
import { QuestionInFocus } from '../../../lib/validator';
import { UserSchema } from '../../../services/user';
import { z } from 'zod';
import useArray from '../../../hooks/useArray';
import useEffectOnce from '../../../hooks/useEffectOnce';
import usePageLeave from '../../../hooks/usePageLeave';

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
	const ref = useRef<HTMLFormElement | null>(null);
	const { user, hasConfidenceEnabled, questionId } =
		useLoaderData() as LoaderData;
	const {
		secondsSpent,
		setSecondsSpent,
		startTimer,
		startSecondsSpent,
		assignmentUid,
		questionTrigger,
		setQuestionTrigger,
		questionInFocus,
		roundData,
		flaggedQuestions,
		answeredQuestions,
		toggleFlaggedQuestion,
		selectedAnswer,
		setSelectedAnswer,
		setAnsweredQuestions,
		handleNavigation,
	} = useOutletContext<OutletContext>();

	const { array: questions } = useArray<QuestionInFocus>(
		roundData.questionList.map((question: QuestionInFocus) => question),
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

	const submitRef = useCallback(
		(node: HTMLFormElement | null) => {
			ref.current = node;
		},
		[answeredQuestions, flaggedQuestions],
	);

	usePageLeave(() => {
		prepareAndSubmitFormData({
			currentRef: ref.current!,
			submitter: fetcher,
		});
	});

	useEffectOnce(() => {
		startTimer(true);
		startSecondsSpent(true);
		return () => {
			startTimer(false); // Stop the timer when the component unmounts
			startSecondsSpent(false);
		};
	});

	useEffect(() => {
		const f = fetcher;
		const currentRef = ref.current!;
		return () => {
			if (!ref.current && f) {
				prepareAndSubmitFormData({ currentRef: currentRef, submitter: f });
			}
		};
	}, [submitRef]);

	useUpdateEffect(() => {
		if (!!questionTrigger) {
			prepareAndSubmitFormData({
				currentRef: ref.current!,
				submitter: fetcher,
			});
		}
		handleNavigation(questionTrigger);
	}, [questionTrigger]);

	useUpdateEffect(() => {
		if (fetcher.data) {
			setSecondsSpent(0);
			setAnswerUpdated(false);
		}
	}, [fetcher.data]);

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
								questionInFocus?.publishedQuestionAuthoringKey,
							) ? (
								<BookmarkFilledIcon />
							) : (
								<BookmarkIcon />
							)
						}
						colorScheme="ampSecondary"
						variant="ghost"
						onClick={() =>
							toggleFlaggedQuestion(
								questionInFocus?.publishedQuestionAuthoringKey,
							)
						}>
						{flaggedQuestions.has(
							questionInFocus?.publishedQuestionAuthoringKey,
						)
							? i18n('flaggedForReview')
							: i18n('flagForReview')}
					</Button>
				</Stack>
				<fetcher.Form
					ref={submitRef}
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
						questionInFocus={questionInFocus}
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
