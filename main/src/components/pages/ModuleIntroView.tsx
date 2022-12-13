import { Container } from '@chakra-ui/react';
import ModuleIntroductionComponent from '../ui/ModuleIntroductionComponent';
import { useParams, useNavigate } from 'react-router-dom';
import useModuleContentService from '../../services/useModuleContentService';
import { useEffect, useState } from 'react';

const ModuleIntroView = () => {
	const [data, setData] = useState({
		name: '',
		introductionRc: '',
	});
	const { fetchModuleContent } = useModuleContentService();
	const navigate = useNavigate();
	const { assignmentKey } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			let response = await fetchModuleContent(assignmentKey);
			if (Boolean(response?.introductionRc.length)) {
				setData(response);
			} else {
				navigate(`/app/learning/assignment/:${assignmentKey}`);
			}
		};
		if (assignmentKey) {
			fetchData();
		}
	}, [assignmentKey]);

	const beginAssignment = () => {
		navigate(`/app/learning/assignment/:${assignmentKey}`);
	};

	return (
		<main id="main-learning">
			<Container
				id={'module-into'}
				margin="0"
				padding="12px"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<ModuleIntroductionComponent
					moduleData={data}
					beginAssignment={beginAssignment}
				/>
			</Container>
		</main>
	);
};

export default ModuleIntroView;
