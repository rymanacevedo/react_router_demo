import { LoaderFunction, Outlet } from 'react-router';
import {
	Box,
	Button,
	Container,
	Flex,
	HStack,
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
import PracticeTestHeader from '../components/ui/PracticeTestHeader';
import { requireUser } from '../utils/user';
import {
	getCurrentRoundTimedAssessment,
	getFullModuleWithQuestions,
	postRetakeTimedAssessment,
} from '../services/learning';
import { getSubAccount } from '../services/utils';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
	ConfidenceSchema,
	ModuleDataSchema,
	QuestionInFocus,
	QuestionInFocusSchema,
	RoundDataSchema,
} from '../lib/validator';
import { useEffect, useState } from 'react';
import { findQuestionInFocus } from '../components/pages/AssignmentView/findQuestionInFocus';
import useInterval from '../hooks/useInterval';
import RedIcon from '../components/ui/Icons/RedIcon';
import { z } from 'zod';
import { UserSchema } from '../services/user';
import useEffectOnce from '../hooks/useEffectOnce';

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

const OutletContextSchema = z.object({
	roundData: RoundDataSchema,
	questionInFocus: QuestionInFocusSchema.nullable(),
	setQuestionInFocus: z.function(),
	questionTrigger: QuestionInFocusSchema,
	setQuestionTrigger: z.function(),
	seconds: z.number(),
	setSeconds: z.function(),
	secondsSpent: z.number(),
	setSecondsSpent: z.function(),
	startTimer: z.function(),
	startSecondsSpent: z.function(),
	assignmentUid: z.string(),
	moduleInfoAndQuestions: ModuleDataSchema,
	flaggedQuestions: z.set(z.string()),
	toggleFlaggedQuestion: z.function(),
	selectedAnswer: z.object({
		id: z.number().nullable(),
		confidence: ConfidenceSchema,
	}),
	setSelectedAnswer: z.function(),
	setAnsweredQuestions: z.function(),
	handleNavigation: z.function(),
});

const LoaderDataSchema = z.object({
	assignmentUid: z.string(),
	moduleInfoAndQuestions: ModuleDataSchema,
	roundData: RoundDataSchema,
});

export type TimedAssessmentFields = z.infer<typeof TimedAssessmentFieldsSchema>;
export type OutletContext = z.infer<typeof OutletContextSchema>;
type LoaderData = z.infer<typeof LoaderDataSchema>;
export const timedAssessmentLoader: LoaderFunction = async ({
	params,
	request,
}) => {
	const user = requireUser();
	const { subAccount } = getSubAccount(user);
	const url = new URL(request.url);
	const assignmentUid = params.assignmentUid!;
	const hasConfidenceEnabled = user.config.showTimedAssessmentConfidence;
	const isRetake = url.searchParams.get('retake') === 'true';

	if (isRetake) {
		const { data } = await postRetakeTimedAssessment(
			user,
			subAccount,
			assignmentUid,
		);

		const { data: roundData } = await getCurrentRoundTimedAssessment(
			user,
			subAccount,
			data.assignmentUid,
		);

		const { assignmentData, moduleData, moduleInfoAndQuestions } =
			await getFullModuleWithQuestions(user, subAccount, data.assignmentUid);

		return {
			assignmentUid: data.assignmentUid,
			assignmentData,
			moduleData,
			moduleInfoAndQuestions,
			roundData,
			hasConfidenceEnabled,
		};
	}
	const { data: roundData } = await getCurrentRoundTimedAssessment(
		user,
		subAccount,
		assignmentUid,
	);

	const { assignmentData, moduleData, moduleInfoAndQuestions } =
		await getFullModuleWithQuestions(user, subAccount, assignmentUid);

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
	const { t: i18n } = useTranslation();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { assignmentUid, moduleInfoAndQuestions, roundData } =
		useLoaderData() as LoaderData;

	const initialQuestionInFocus = findQuestionInFocus(
		moduleInfoAndQuestions,
		roundData,
		false,
		false,
		0,
	);

	const navigate = useNavigate();
	const [questionInFocus, setQuestionInFocus] =
		useState<QuestionInFocus | null>(initialQuestionInFocus);
	const [questionTrigger, setQuestionTrigger] = useState<
		QuestionInFocus | null | undefined
	>(undefined);

	const [seconds, setSeconds] = useState<number | null>(
		roundData.timeRemaining,
	);

	const [secondsSpent, setSecondsSpent] = useState<number>(0);

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
		if (seconds === 0) {
			startTimer(false);
			onOpen();
		}
	}, [seconds]);

	const handleResultsNavigation = () => {
		navigate(`/learning/timedAssessment/${assignmentUid}/results`);
	};

	useEffectOnce(() => {
		navigate(
			`/learning/timedAssessment/${assignmentUid}/${questionInFocus!.id.toString()}`,
		);
	});

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
						<Outlet
							context={{
								roundData,
								questionInFocus,
								setQuestionInFocus,
								questionTrigger,
								setQuestionTrigger,
								seconds,
								setSeconds,
								secondsSpent,
								setSecondsSpent,
								startTimer,
								startSecondsSpent,
								assignmentUid,
								moduleInfoAndQuestions,
							}}
						/>
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
