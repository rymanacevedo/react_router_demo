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
import { RefObject, useEffect, useRef, useState } from 'react';
import { LoaderFunction } from 'react-router';
import { requireUser } from '../../../utils/user';
import {
	Confidence,
	QuestionInFocus,
	RoundData,
} from '../../pages/AssignmentView/AssignmentTypes';
import HiddenFormInputs from './HiddenFormInputs';
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons';
import AnswerSelection from '../AnswerSelection';
import { findQuestionInFocus } from '../../pages/AssignmentView/findQuestionInFocus';

export const questionAnswerLoader: LoaderFunction = async ({ params }) => {
	const user = requireUser();
	const questionId = params.questionId!;
	const hasConfidenceEnabled = user.config.showTimedAssessmentConfidence;

	return json({ hasConfidenceEnabled, questionId });
};
export default function AmpBoxWithQuestionAndAnswer() {
	const { t: i18n } = useTranslation();
	const fetcher = useFetcher();
	const navigate = useNavigate();
	const ref = useRef<HTMLFormElement>(null);
	const { hasConfidenceEnabled, questionId } = useLoaderData() as any;
	const [firstRender, setFirstRender] = useState(true);
	const context = useOutletContext<any>();
	const {
		setQuestionInFocus,
		secondsSpent,
		setSecondsSpent,
		startTimer,
		startSecondsSpent,
		assignmentUid,
		moduleInfoAndQuestions,
		//     outlet for timed assessment stops here
		questionTrigger,
		setQuestionTrigger,
		flaggedQuestions,
		setFlaggedQuestions,
		selectedAnswer,
		setSelectedAnswer,
		setAnsweredQuestions,
	} = context;
	const {
		questionInFocus,
		roundData,
	}: { questionInFocus: QuestionInFocus | null; roundData: RoundData } =
		context;
	const [questions] = useState<QuestionInFocus[]>(
		roundData.questionList.map((question) => question),
	);
	const [answerUpdated, setAnswerUpdated] = useState(false);

	const prepareAndSubmitFormData = ({
		currentRef,
		submitter,
	}: {
		currentRef: RefObject<HTMLFormElement>;
		submitter: FetcherWithComponents<any>;
	}) => {
		if (answerUpdated) {
			const user = requireUser();
			let answerChoices: HTMLInputElement[] = [];
			for (const item of currentRef.current!) {
				const input = item as HTMLInputElement;
				if (input.name === 'answerChoice') {
					answerChoices.push(input);
				}
			}
			const choice = answerChoices.find(
				(answerChoice) => answerChoice.indeterminate || answerChoice.checked,
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
		}
	};

	const handleMouseLeave = async (event: MouseEvent) => {
		if (
			event.clientY <= 0 ||
			event.clientX <= 0 ||
			event.clientX >= window.innerWidth ||
			event.clientY >= window.innerHeight
		) {
			// WARNING handle events CAN'T see state changes for some weird reason. bug possibly? hence why I can't put answerUpdated in the if statement
			const user = requireUser();
			let answerChoices: HTMLInputElement[] = [];
			for (const item of ref.current!) {
				const input = item as HTMLInputElement;
				if (input.name === 'answerChoice') {
					answerChoices.push(input);
				}
			}
			const choice = answerChoices.find(
				(answerChoice) => answerChoice.indeterminate || answerChoice.checked,
			);
			const form = new FormData(ref.current!);
			form.append('user', JSON.stringify(user));
			if (choice) {
				form.append('answerChoice', choice.value);
			}
			fetcher.submit(form, {
				method: 'POST',
				action: '/api/timedAssessment',
			});
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
					(answerChoice) => answerChoice.indeterminate || answerChoice.checked,
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

	const handleNavigation = (question: QuestionInFocus | null) => {
		prepareAndSubmitFormData({ currentRef: ref, submitter: fetcher });
		if (!!question) {
			const q = findQuestionInFocus(
				moduleInfoAndQuestions,
				roundData,
				false,
				false,
				question.displayOrder - 1,
			);
			setQuestionInFocus(q);

			const a = question.answerList.find((answer) => answer.selected);

			const iSa = a
				? { id: a.id, confidence: question.confidence! }
				: question.confidence === Confidence.NotSure
				? { id: 1, confidence: Confidence.NotSure }
				: { id: null, confidence: Confidence.NA };

			setSelectedAnswer(iSa);
			navigate(
				`/learning/timedAssessment/${assignmentUid}/${questionTrigger.id.toString()}`,
			);
		} else {
			setQuestionInFocus(question);
			navigate(`/learning/timedAssessment/${assignmentUid}/submission`);
		}
	};

	useEffect(() => {
		if (!firstRender) {
			handleNavigation(questionTrigger);
		}
		if (firstRender) {
			setFirstRender(false);
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
					onSubmit={() => {
						if (questionInFocus) {
							const id = Number(questionInFocus.id) + 1;
							const findQuestion =
								questions.find((question) => question.id === id) || null;
							setQuestionTrigger(findQuestion);
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
