import { Container } from '@chakra-ui/react';
import ModuleIntroOutroComponent from '../ui/ModuleIntroComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useModuleContentService from '../../services/coursesServices/useModuleContentService';
import { useEffect, useState } from 'react';
import LoadingAssignmentView from '../ui/loading/LoadingAssignmentView';

const ModuleIntroView = () => {
	const [data, setData] = useState({
		name: '',
		introductionRc: '',
		outroRc: '',
	});
	const { fetchModuleContent } = useModuleContentService();
	const navigate = useNavigate();
	const { state } = useLocation();
	const { assignmentKey } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			let response = await fetchModuleContent(assignmentKey);
			if (response?.introductionRc) {
				setData(response);
			} else {
				navigate(`/learning/assignment/${assignmentKey}`);
			}
		};
		if (assignmentKey) {
			fetchData();
		}
	}, [assignmentKey]);

	const beginAssignment = () => {
		navigate(`/learning/assignment/${assignmentKey}`);
	};
	const backToReview = () => {
		navigate(`/learning/review/${assignmentKey}`);
	};

	return data.introductionRc ? (
		<main id="main-learning">
			<Container
				id={'module-into'}
				margin="0"
				padding="12px"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<ModuleIntroOutroComponent
					moduleData={data}
					numberOfLearningUnits={state?.numberOfLearningUnits}
					estimatedTimeToComplete={state?.estimatedTimeToComplete}
					action={!state?.review ? beginAssignment : backToReview}
					review={state.review}
				/>
			</Container>
		</main>
	) : (
		<LoadingAssignmentView />
	);
};

export default ModuleIntroView;
