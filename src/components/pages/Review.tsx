import { Box, Container, Stack, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useModuleContentService from '../../services/coursesServices/useModuleContentService';
import LoadingReview from '../ui/loading/LoadingReview';
import ReviewQuestion from '../ui/Review/ReviewQuestion';

const Review = () => {
	const [data, setData] = useState({
		name: '',
		introductionRc: '',
		outroRc: '',
		learningUnits: [],
	});
	const [reviewQuestions, setReviewQuestions] = useState<any[]>([]);
	const { t: i18n } = useTranslation();
	const { assignmentKey } = useParams();
	const { fetchModuleQuestions } = useModuleContentService();

	const logQuestions = (obj: any) => {
		const questions: any[] = [];
		for (let prop in obj) {
			if (typeof obj[prop] === 'object' && obj[prop] !== null) {
				logQuestions(obj[prop]);
			}
			if (Array.isArray(obj[prop]) && prop === 'learningUnits') {
				obj[prop].forEach((unit: { questions: any[] }) => {
					unit.questions.map((question) => {
						questions.push(question);
					});
				});
			}
		}
		setReviewQuestions(questions);
	};

	useEffect(() => {
		const fetchData = async () => {
			let response = await fetchModuleQuestions(assignmentKey);
			if (response) {
				console.log(response);
				logQuestions(response);
				setData(response);
			}
		};
		if (assignmentKey) {
			fetchData();
		}
	}, [assignmentKey]);

	return (
		<Container
			id={'review'}
			margin="0"
			padding="0"
			maxWidth={'100vw'}
			overflowY={'auto'}
			overflowX={'hidden'}>
			<Stack
				w="100%"
				p="12px"
				direction={['column', 'column', 'row', 'row', 'row', 'row']}
				justifyContent={'center'}
				alignItems={'center'}>
				{data.learningUnits.length ? (
					<Box
						backgroundColor="white"
						margin="6px"
						boxShadow="2xl"
						w="100%"
						overflow="hidden"
						borderRadius={24}
						p={'72px'}
						display="flex"
						flexDirection="column">
						<Heading as="h1">{data.name}</Heading>
						<Text
							marginTop={34}
							marginBottom={10}
							fontSize={28}
							color={'#7E8A9B'}>
							{data.learningUnits.length} {i18n('questions')}
						</Text>
						{reviewQuestions.map((question) => (
							<ReviewQuestion text={question.questionRc} key={question.uid} />
						))}
					</Box>
				) : (
					<LoadingReview />
				)}
			</Stack>
		</Container>
	);
};

export default Review;
