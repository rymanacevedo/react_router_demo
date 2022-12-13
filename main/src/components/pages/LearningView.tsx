import { Container } from '@chakra-ui/react';
import AssignmentList from '../ui/AssignmentList';

const LearningView = () => {
	return (
		<main id="main-learning">
			<Container
				id={'learning-dash-main'}
				margin="0"
				padding="12px"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<AssignmentList />
			</Container>
		</main>
	);
};

export default LearningView;
