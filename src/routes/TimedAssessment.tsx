import { LoaderFunction } from 'react-router';
import { Box, Container, HStack, Stack } from '@chakra-ui/react';

export const timedAssessmentLoader: LoaderFunction = async () => {
	return null;
};

export default function TimedAssessment() {
	return (
		<main id="timed-assessment">
			<Container
				id="learning-assignment"
				margin="0"
				padding="0"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<h1>Timed Assessment</h1>
				<HStack justify="center" align="space-between">
					<Stack
						maxW="1496"
						w="100%"
						p="12px"
						pr="0px"
						alignItems="stretch"
						direction={['column', 'column', 'row', 'row', 'row', 'row']}>
						{/*QuestionArea*/}
						<Box
							backgroundColor="white"
							boxShadow="md"
							borderRadius={24}
							px="72px"
							py="44px"
							w={{ base: '100%', md: '50%' }}></Box>{' '}
						{/*<AnswerArea*/}
						<Box
							backgroundColor="white"
							boxShadow="md"
							borderRadius={24}
							px="72px"
							py="44px"
							w={{ base: '100%', md: '50%' }}></Box>
					</Stack>
				</HStack>
			</Container>
		</main>
	);
}
