import { Box, Button, Container, Text } from '@chakra-ui/react';
import ReviewContentRender from '../components/ui/Review/ReviewContentRender';
import {
	json,
	LoaderFunction,
	useLoaderData,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { estimatedTimeRemaining } from '../utils/logic';
import { requireUser } from '../utils/user';
import { getSubAccount } from '../services/utils';
import { getFullModuleWithQuestions } from '../services/learning';
import { AssignmentData, ModuleData } from '../lib/validator';

export const timedAssessmentModuleIntroLoader: LoaderFunction = async ({
	params,
}) => {
	const user = requireUser();
	const { subAccount } = getSubAccount(user);
	const assignmentUid = params.assignmentUid!;
	const { assignmentData, moduleData, moduleInfoAndQuestions } =
		await getFullModuleWithQuestions(user, subAccount, assignmentUid);

	return json({
		assignmentData,
		moduleData,
		moduleInfoAndQuestions,
		assignmentUid,
	});
};

type TimedAssessmentModuleIntroLoaderData = {
	assignmentData: AssignmentData;
	moduleData: ModuleData;
	moduleInfoAndQuestions: ModuleData;
	assignmentUid: string;
};

const TimedAssessmentModuleIntro = () => {
	const { t: i18n } = useTranslation();
	const { assignmentData, moduleInfoAndQuestions } =
		useLoaderData() as TimedAssessmentModuleIntroLoaderData;
	const navigate = useNavigate();
	const { state } = useLocation();

	const startPracticeTestHandler = () => {
		navigate(`/learning/timedAssessment/${assignmentData.assignmentUid}`);
	};

	return (
		<Container
			id={'module-intro'}
			padding={3}
			maxWidth={'100vw'}
			overflowY={'hidden'}
			overflowX={'hidden'}>
			<Box
				style={{
					backgroundColor: 'white',
				}}
				boxShadow="md"
				overflow="hidden"
				margin={3}
				borderRadius={24}
				padding={16}
				display={'flex'}
				flexDirection={'column'}>
				<ReviewContentRender content={moduleInfoAndQuestions.introductionRc} />
				<Box display="flex" alignItems="center">
					<Text fontSize="sm" marginBottom={15}>
						{state.numLearningUnits}{' '}
						{state.numLearningUnits && state.numLearningUnits > 1
							? i18n('Questions')
							: i18n('Question')}
					</Text>
					<Box width={6} />
					<Text fontSize="sm" marginBottom={15}>
						{estimatedTimeRemaining(
							state.estimatedTimeToComplete,
							i18n('hours'),
							i18n('hour'),
							i18n('minutes'),
							i18n('minute'),
						)}
						{i18n('toComplete')}
					</Text>
				</Box>
				<Button
					onClick={startPracticeTestHandler}
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="fit-content">
					{i18n('startPracticeTest')}
				</Button>
			</Box>
		</Container>
	);
};

export default TimedAssessmentModuleIntro;
