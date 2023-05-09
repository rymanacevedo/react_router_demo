import { Box, Container, Stack, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useModuleContentService from '../../services/coursesServices/useModuleContentService';
import LoadingReview from '../ui/loading/LoadingReview';
import ReviewQuestion from '../ui/Review/ReviewQuestion';
import {
	LearningUnitQuestion,
	ModuleData,
	ModuleDataLearningUnit,
} from './AssignmentView/AssignmentTypes';

const Review = () => {
	const [questionData, setQuestionData] = useState<ModuleData>({
		accountUri: '',
		children: null,
		customizations: [],
		descriptionRc: null,
		id: 0,
		introductionRc: null,
		isAllowTimeIncrease: false,
		isCustomMessagesEnabled: false,
		isRecommendedModulesEnabled: false,
		key: '',
		kind: '',
		learningUnits: [],
		locale: '',
		name: '',
		outroButtonText: null,
		outroLink: null,
		outroRc: null,
		ownerAccountUid: '',
		publishedVersionId: null,
		self: '',
		timeAllotted: null,
		timedAssessment: false,
		uid: '',
		versionId: 0,
	});
	const [reviewQuestions, setReviewQuestions] = useState<
		LearningUnitQuestion[]
	>([]);
	const { t: i18n } = useTranslation();
	const { assignmentKey } = useParams();
	const { fetchModuleQuestions } = useModuleContentService();

	const populateQuestions = (obj: ModuleData) => {
		const questions: LearningUnitQuestion[] = [];
		for (let prop in obj) {
			if (typeof obj[prop] === 'object' && obj[prop] !== null) {
				populateQuestions(obj[prop]);
			}
			if (Array.isArray(obj[prop]) && prop === 'learningUnits') {
				obj[prop].forEach((unit: ModuleDataLearningUnit) => {
					unit.questions.forEach((question) => {
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
				populateQuestions(response);
				setQuestionData(response);
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
				{questionData.learningUnits.length ? (
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
						<Heading as="h1">{questionData.name}</Heading>
						<Text
							marginTop={34}
							marginBottom={10}
							fontSize={28}
							color={'#7E8A9B'}>
							{questionData.learningUnits.length} {i18n('questions')}
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
