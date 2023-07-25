import { Box, Button, Container, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReviewContentRender from '../components/ui/Review/ReviewContentRender';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { estimatedTimeRemaining } from '../utils/logic';
import useModuleContentService from '../services/coursesServices/useModuleContentService';

const TimedAssessmentModuleIntro = () => {
	const { t: i18n } = useTranslation();
	const { assignmentUid } = useParams();
	const [contentString, setContentString] = useState('');
	const navigate = useNavigate();
	const { state } = useLocation();

	const { fetchModuleContent } = useModuleContentService();

	useEffect(() => {
		const fetchContent = async () => {
			let response = await fetchModuleContent(assignmentUid);
			if (response.introductionRc) {
				setContentString(response.introductionRc);
			}
		};

		fetchContent();
	}, []);

	const startPracticeTestHandler = () => {
		navigate(`/learning/timedAssessment/${state.assignmentUid}`);
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
				<ReviewContentRender content={contentString} />
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
							true,
							i18n('hours'),
							i18n('hour'),
							i18n('minutes'),
							i18n('minute'),
						)}
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
