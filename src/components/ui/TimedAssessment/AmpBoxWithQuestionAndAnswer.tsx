import AmpBox from '../../standard/container/AmpBox';
import Question from '../Question';
import { Button, Divider, Heading, HStack, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { json, useFetcher, useOutletContext } from 'react-router-dom';
import { useRef } from 'react';
import { LoaderFunction } from 'react-router';
import { requireUser } from '../../../utils/user';

export const questionAnswerLoader: LoaderFunction = async () => {
	const user = requireUser();
	const hasConfidenceEnabled = user.config.showTimedAssessmentConfidence;

	return json(hasConfidenceEnabled);
};
export default function AmpBoxWithQuestionAndAnswer() {
	const { t: i18n } = useTranslation();
	// const { hasConfidenceEnabled } = useLoaderData() as any;
	const fetcher = useFetcher();
	const ref = useRef<HTMLFormElement>(null);

	const {
		// roundData,
		questionInFocus,
		// answeredQuestions,
		// flaggedQuestions,
		// setSelectedAnswer,
		// setQuestionInFocus,
	} = useOutletContext<any>();
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
						// leftIcon={
						// 	flaggedQuestions.has(
						// 		questionInFocus.publishedQuestionAuthoringKey,
						// 	) ? (
						// 		<BookmarkFilledIcon />
						// 	) : (
						// 		<BookmarkIcon />
						// 	)
						// }
						colorScheme="ampSecondary"
						variant="ghost"
						// onClick={handleFlagForReview}
					>
						{/*{flaggedQuestions.has(questionInFocus.publishedQuestionAuthoringKey)*/}
						{/*	? i18n('flaggedForReview')*/}
						{/*	: i18n('flagForReview')}*/}
					</Button>
				</Stack>
				{/*<fetcher.Form ref={ref} onSubmit={(e) => handleSubmit(e, fetcher, ref)}>*/}
				<fetcher.Form ref={ref}>
					{/*<AnswerSelection*/}
					{/*	questionInFocus={questionInFocus}*/}
					{/*	setSelectedAnswer={setSelectedAnswer}*/}
					{/*	selectedAnswer={selectedAnswer}*/}
					{/*	setAnswerUpdated={setAnswerUpdated}*/}
					{/*	hasConfidenceEnabled={hasConfidenceEnabled}*/}
					{/*	handleAnsweredQuestions={handleAnsweredQuestions}*/}
					{/*/>*/}
					{/*<HiddenFormInputsComponent />*/}
					<Divider marginTop={11} />
					<HStack marginTop={3} justify="space-between">
						<Button type="submit">{i18n('submitBtnText')}</Button>
						<Button
							// isDisabled={!selectedAnswer.id}
							onClick={() => {
								// setSelectedAnswer(() => {
								// 	return {
								// 		id: null,
								// 		confidence: Confidence.NA,
								// 	};
								// });
								// handleAnsweredQuestions('delete');
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
