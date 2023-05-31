import { LoaderFunction } from 'react-router';
import {
	Box,
	Button,
	Container,
	Divider,
	Heading,
	HStack,
	Stack,
} from '@chakra-ui/react';
import PracticeTestCard from '../components/ui/PracticeTestCard';
import { useTranslation } from 'react-i18next';

export const timedAssessmentLoader: LoaderFunction = async () => {
	return null;
};

export default function TimedAssessment() {
	const { t: i18n } = useTranslation();
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
						w="100%"
						p="12px"
						pr="0px"
						alignItems="stretch"
						direction={['column', 'column', 'row', 'row', 'row', 'row']}>
						<Box
							backgroundColor="#D5D7D8"
							boxShadow="md"
							borderRadius={24}
							px="72px"
							py="44px"
							w={{ base: '100%', md: '50%' }}>
							<Heading as="h2" fontSize="xl">
								{i18n('practiceTestNavigation')}
							</Heading>
							<Divider marginTop="4px" marginBottom="4px" />
							{/*unselected, flagged, selected, flagged/selected*/}
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((questionNumber) => (
								<PracticeTestCard
									size="sm"
									variant="unselected"
									text={questionNumber.toString()}
								/>
							))}

							<Button
								display="block"
								marginRight="auto"
								marginLeft="auto"
								variant="ampSolid">
								{i18n('finishPracticeTest')}
							</Button>
						</Box>

						{/*QuestionArea*/}
						<Box
							backgroundColor="white"
							boxShadow="md"
							borderRadius={24}
							px="72px"
							py="44px"
							w={{ base: '100%', md: '50%' }}></Box>
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
