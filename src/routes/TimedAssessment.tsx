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
import { useLoaderData } from 'react-router-dom';
import {
	Confidence,
	ModuleData,
	QuestionInFocus,
	RoundData,
} from '../components/pages/AssignmentView/AssignmentTypes';
import { AssignmentData } from '../lib/validator';
import { useEffect, useState } from 'react';
import { findQuestionInFocus } from '../components/pages/AssignmentView/findQuestionInFocus';
import Question from '../components/ui/Question';
import AnswerSelection from '../components/ui/AnswerSelection';
import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons';
import useInterval from '../hooks/useInterval';

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
	return { assignmentData, moduleData, moduleInfoAndQuestions, roundData };
};

export default function TimedAssessment() {
	const { t: i18n } = useTranslation();
	const { moduleInfoAndQuestions, roundData } = useLoaderData() as {
		assignmentData: AssignmentData;
		moduleData: ModuleData;
		moduleInfoAndQuestions: ModuleData;
		roundData: RoundData;
	};
	const [questionInFocus, setQuestionInFocus] =
		useState<QuestionInFocus | null>(null);
	// const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer[]>([]);
	const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

	const [seconds, setSeconds] = useState<number | null>(
		roundData.timeRemaining,
	);

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

	useEffect(() => {
		startTimer(true);
		return () => {
			startTimer(false); // Stop the timer when the component unmounts
		};
	}, []);

	useEffect(() => {
		if (seconds === 0) {
			startTimer(false);
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
				<PracticeTestHeader
					text={moduleInfoAndQuestions.name}
					timeRemaining={seconds}
				/>
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
							maxHeight={274}
							px="24px"
							py="24px"
							w={{ base: '100%', md: '50%' }}>
							{/*TODO: spacing from style guide*/}
							<Heading mb="16px" as="h2" fontSize="xl">
								{i18n('practiceTestNavigation')}
							</Heading>
							<Divider marginTop="4px" marginBottom="4px" />
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
