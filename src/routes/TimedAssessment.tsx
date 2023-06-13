import { LoaderFunction } from 'react-router';
import {
	Box,
	Button,
	Container,
	Divider,
	Heading,
	HStack,
	Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import PracticeTestCard from '../components/ui/PracticeTestCard';
import PracticeTestHeader from '../components/ui/PracticeTestHeader';
import { requireUser } from '../utils/user';
import {
	getCurrentRoundTimedAssessment,
	getFullModuleWithQuestions,
} from '../services/learning';
import { getSubAccount } from '../services/utils';
import { useLoaderData } from 'react-router-dom';
import {
	ModuleData,
	QuestionInFocus,
	RoundData,
} from '../components/pages/AssignmentView/AssignmentTypes';
import { AssignmentData } from '../lib/validator';
import { useEffect, useState } from 'react';
import { findQuestionInFocus } from '../components/pages/AssignmentView/findQuestionInFocus';
import Question from '../components/ui/Question';
import AnswerSelection from '../components/ui/AnswerSelection';

export const timedAssessmentLoader: LoaderFunction = async ({ params }) => {
	const user = requireUser();
	const assignmentUid = params.assignmentUid!;
	const account = getSubAccount(user);
	const { assignmentData, moduleData, moduleInfoAndQuestions } =
		await getFullModuleWithQuestions(user, account, assignmentUid);
	const { data: roundData } = await getCurrentRoundTimedAssessment(
		user,
		account,
		assignmentUid,
	);
	return { assignmentData, moduleData, moduleInfoAndQuestions, roundData };
};

export default function TimedAssessment() {
	const { t: i18n } = useTranslation();
	const [questionInFocus, setQuestionInFocus] =
		useState<QuestionInFocus | null>(null);
	// const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer[]>([]);
	const { moduleInfoAndQuestions, roundData } = useLoaderData() as {
		assignmentData: AssignmentData;
		moduleData: ModuleData;
		moduleInfoAndQuestions: ModuleData;
		roundData: RoundData;
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

	useEffect(() => {
		if (!questionInFocus) {
			setQuestionInFocus(
				findQuestionInFocus(moduleInfoAndQuestions, roundData, false, false),
			);
		}
	}, [questionInFocus]);

	return (
		<main id="timed-assessment">
			<Container
				id="learning-assignment"
				margin="0"
				padding="0"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<PracticeTestHeader />
				<HStack justify="center" align="space-between">
					<Stack
						w="100%"
						p="12px"
						pr="0px"
						alignItems="stretch"
						direction={['column', 'column', 'row', 'row', 'row', 'row']}>
						<Box
							backgroundColor="#D5D7D8"
							boxShadow="md"
							borderRadius={24}
							maxWidth={480}
							px="24px"
							py="24px"
							w={{ base: '100%', md: '50%' }}>
							{/*TODO: spacing from style guide*/}
							<Heading mb="16px" as="h2" fontSize="xl">
								{i18n('practiceTestNavigation')}
							</Heading>
							<Divider marginTop="4px" marginBottom="4px" />
							{roundData.questionList.map((question) => {
								return (
									<PracticeTestCard
										key={question.publishedQuestionAuthoringKey}
										size="sm"
										variant="multiPartCard"
										values={
											question.publishedQuestionAuthoringKey ===
											questionInFocus?.publishedQuestionAuthoringKey
												? ['selected', 'unselected']
												: ['unselected']
										}
										text={question.displayOrder.toString()}
										onClick={() => handleNavigation(question)}
									/>
								);
							})}

							<Button
								display="block"
								marginRight="auto"
								marginLeft="auto"
								variant="ampSolid">
								{i18n('finishPracticeTest')}
							</Button>
						</Box>

						{/*QuestionArea*/}
						<Box
							backgroundColor="ampWhite"
							boxShadow="md"
							borderRadius={24}
							px="72px"
							py="44px"
							w={{ base: '100%', md: '50%' }}>
							<Question questionInFocus={questionInFocus} />
						</Box>
						{/*<AnswerArea*/}
						<Box
							backgroundColor="ampWhite"
							boxShadow="md"
							borderRadius={24}
							px="72px"
							py="44px"
							w={{ base: '100%', md: '50%' }}>
							<Heading as="h2">{i18n('answer')}</Heading>
							<AnswerSelection
								questionInFocus={questionInFocus}
								// selectedAnswers={selectedAnswer}
								// setSelectedAnswers={setSelectedAnswer}
								// roundData={roundData}
							/>
						</Box>
					</Stack>
				</HStack>
			</Container>
		</main>
	);
}
