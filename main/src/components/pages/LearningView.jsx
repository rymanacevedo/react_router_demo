import AssignmentList from '../ui/AssignmentList';
import { Container } from '@chakra-ui/react';
import TestProgressBarMenu from '../ui/TestProgressBarMenu';

const LearningView = () => {
	return (
		<>
			<main id="main-learning">
				<Container
					id={'learning-dash-main'}
					margin="0"
					padding="0"
					width={'100%'}>
					<TestProgressBarMenu />
					<AssignmentList />
				</Container>
			</main>
		</>
	);
};

export default LearningView;
