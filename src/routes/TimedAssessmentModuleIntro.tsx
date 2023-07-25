import { Box, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReviewContentRender from '../components/ui/Review/ReviewContentRender';
import useModuleContentService from '../services/coursesServices/useModuleContentService';
import { useNavigate, useParams } from 'react-router-dom';

const TimedAssessmentModuleIntro = () => {
	const { assignmentUid } = useParams();
	const [contentString, setContentString] = useState('');
	const { fetchModuleContent } = useModuleContentService();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchContent = async () => {
			let response = await fetchModuleContent(assignmentUid);
			if (response.introductionRc) {
				setContentString(response.introductionRc);
			} else {
				navigate(`/learning/timedAssessment/${assignmentUid}`);
			}
		};

		fetchContent();
	}, []);

	// let htmlString =
	// 	'<p><a data-parvus="" href="amp_resource?path=93110891-3822-41e5-bb15-45284ebe8f96/b9/b9bf72e9-a478-4ac5-bad0-c4d77bfa9050.jpg&amp;isAuthoring=true" target="_blank"><img src="amp_resource?path=93110891-3822-41e5-bb15-45284ebe8f96/b9/b9bf72e9-a478-4ac5-bad0-c4d77bfa9050.jpg&amp;isAuthoring=true" style="height:480px; width:640px" /></a></p>\n\n<p>&nbsp;</p>\n\n<p>Hey, here is some intro content with images</p>';

	return (
		<Container
			id={'module-intro'}
			margin="0"
			padding="12px"
			maxWidth={'100vw'}
			overflowY={'hidden'}
			overflowX={'hidden'}>
			<Box
				style={{
					backgroundColor: 'white',
				}}
				boxShadow="md"
				overflow="hidden"
				margin={'12px auto'}
				borderRadius={24}
				padding={16}
				display={'flex'}
				flexDirection={'column'}>
				<ReviewContentRender content={contentString} />
			</Box>
		</Container>
	);
};

export default TimedAssessmentModuleIntro;
