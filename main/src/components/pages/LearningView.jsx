import AssignmentList from '../ui/AssignmentList';
import { Container, HStack } from '@chakra-ui/react';
import TestProgressBarMenu from '../ui/TestProgressBarMenu';
import ProgressMenu from '../ui/ProgressMenu';

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
					<HStack width="100vw">
						<AssignmentList />
						<ProgressMenu />
					</HStack>
				</Container>
			</main>
		</>
	);
};

export default LearningView;
