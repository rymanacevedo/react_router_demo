import { useState } from 'react';
import { Box, Container, Heading, HStack, VStack } from '@chakra-ui/react';
import TestProgressBarMenu from '../ui/TestProgressBarMenu';
import ProgressMenu from '../ui/ProgressMenu';
import Question from '../ui/Question';
import AnswerInput from '../ui/AnswerInput';

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
				<HStack width="100%">
					<HStack w="100%" p="12px" justifyContent={'space-around'}>
						<Question
							title="Question"
							questionIntro={
								'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'
							}
							questionStem={
								'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'
							}
						/>
						<Box
							style={{
								backgroundColor: 'white',
							}}
							boxShadow="2xl"
							maxW="xl"
							h="745px"
							width="100%"
							maxWidth={726}
							minWidth={545}
							m="12px"
							overflow="hidden"
							borderRadius={24}
							p="16">
							<Heading as="h2">{'Answer'}</Heading>
							<VStack minHeight="630px" alignItems={'left'}>
								<AnswerInput />
								<AnswerInput />
								<AnswerInput />
								<AnswerInput />
							</VStack>
						</Box>
					</HStack>
					<ProgressMenu isOpen={isOpen} />
				</HStack>
			</Container>
		</main>
	);
};

export default AssignmentView;
