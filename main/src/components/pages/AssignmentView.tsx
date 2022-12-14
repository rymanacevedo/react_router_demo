import { useState } from 'react';
import { Container, HStack, Text } from '@chakra-ui/react';
import TestProgressBarMenu from '../ui/TestProgressBarMenu';
import ProgressMenu from '../ui/ProgressMenu';

const AssignmentView = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<main id="learning-assignment">
			<Container
				id={'learning-assignment'}
				margin="0"
				padding="0"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<TestProgressBarMenu isOpen={isOpen} setIsOpen={setIsOpen} />
				<HStack width="100vw" justifyContent={'space-between'}>
					<HStack w="100%">
						<Text>Under Construction</Text>
					</HStack>
					<ProgressMenu isOpen={isOpen} />
				</HStack>
			</Container>
		</main>
	);
};

export default AssignmentView;
