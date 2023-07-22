import { LoaderFunction, Outlet } from 'react-router';
import { Box, Button, Divider, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PracticeTestCard, { CardValues } from '../PracticeTestCard';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';
import { useOutletContext } from 'react-router-dom';

export const questionCardLoader: LoaderFunction = async () => {
	// const user = requireUser();
	// const assignmentUid = params.assignmentUid!;
	// const { subAccount } = getSubAccount(user);
	// const { moduleData, moduleInfoAndQuestions } =
	// 	await getFullModuleWithQuestions(user, subAccount, assignmentUid);
	// const { data: roundData } = await getCurrentRoundTimedAssessment(
	// 	user,
	// 	subAccount,
	// 	assignmentUid,
	// );
	//
	// return {
	// 	assignmentUid,
	// 	moduleData,
	// 	moduleInfoAndQuestions,
	// 	roundData,
	// };
};
export default function QuestionCards() {
	// const {
	// 	// ref,
	// 	roundData,
	// 	questionInFocus,
	// 	answeredQuestions,
	// 	flaggedQuestions,
	// 	fetcher,
	// 	moduleInfoAndQuestions,
	// 	setSelectedAnswer,
	// 	setQuestionInFocus,
	// } = useOutlet();

	const context = useOutletContext<any>();
	const { t: i18n } = useTranslation();
	const handleNavigation = (question: QuestionInFocus) => {
		// handle if the user selects the same navigation item
		if (!(question.id === context.questionInFocus?.id)) {
			// const currentRef = ref.current as HTMLFormElement;
			// let answerChoices: HTMLInputElement[] = [];
			// for (const item of currentRef) {
			// 	const input = item as HTMLInputElement;
			// 	if (input.name === 'answerChoice') {
			// 		answerChoices.push(input);
			// 	}
			// }
			// const choice = answerChoices.find(
			// 	(answerChoice) => answerChoice.indeterminate,
			// );
			// // const form = new FormData(currentRef);
			// if (choice) {
			// 	form.append('answerChoice', choice.value);
			// }
			// fetcher.submit(form, {
			// 	method: 'POST',
			// 	action: '/api/timedAssessment',
			// });
			// setQuestionInFocus(
			// 	findQuestionInFocus(
			// 		moduleInfoAndQuestions,
			// 		roundData,
			// 		false,
			// 		false,
			// 		question.displayOrder - 1,
			// 	),
			// );
			// const a = question.answerList.find((answer) => answer.selected);
			// const iSa = a
			// 	? { id: a.id, confidence: question.confidence! }
			// 	: question.confidence === Confidence.NotSure
			// 	? { id: 1, confidence: Confidence.NotSure }
			// 	: { id: null, confidence: Confidence.NA };
			// setSelectedAnswer(iSa);
		}
	};

	return (
		<>
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
				{/*<QuestionCard />*/}
				{context.roundData.questionList.map((question: QuestionInFocus) => {
					const values: CardValues = ['unselected'];
					// if (
					// 	question.publishedQuestionAuthoringKey ===
					// 	questionInFocus.publishedQuestionAuthoringKey
					// ) {
					// 	values.push('selected');
					// }
					// if (answeredQuestions.has(question.publishedQuestionAuthoringKey)) {
					// 	values.push('answered');
					// }
					// if (flaggedQuestions.has(question.publishedQuestionAuthoringKey)) {
					// 	values.push('flagged');
					// }

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
			<Outlet context={context} />
		</>
	);
}
