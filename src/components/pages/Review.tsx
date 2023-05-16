import {
	Box,
	Container,
	Stack,
	Heading,
	Text,
	Button,
	HStack,
	VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import useModuleContentService from '../../services/coursesServices/useModuleContentService';
import useAnswerHistoryService from '../../services/useAnswerHistoryService';
import { createReviewQuestionsArray } from '../../utils/logic';
import LoadingReview from '../ui/loading/LoadingReview';
import ReviewQuestions from '../ui/Review/ReviewQuestions';
import {
	ApiRes,
	Item,
	LearningUnitQuestion,
	ModuleData,
	ModuleDataLearningUnit,
} from './AssignmentView/AssignmentTypes';

const Review = () => {
	const { getAnswerHistory } = useAnswerHistoryService();
	const [answerHistory, setAnswerHistory] = useState<Item[] | null>(null);
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
	const navigate = useNavigate();
	const [expandAll, setExpandAll] = useState(false);
	const [index, setIndex] = useState<number[]>([]);
	const allExpandedIndices = createReviewQuestionsArray(reviewQuestions.length);

	const handleExpandAll = () => {
		if (index.length === allExpandedIndices.length) {
			setIndex([]);
		} else {
			setIndex(allExpandedIndices);
		}
	};

	const handleExpandAllChange = (expanded: boolean) => {
		if (expanded) {
			setIndex(allExpandedIndices);
		} else {
			setIndex([]);
		}
		setExpandAll(expanded);
	};

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
		const fetchAnswerHistory = async () => {
			let response: ApiRes = await getAnswerHistory(assignmentKey);
			if (response) {
				setAnswerHistory(response.items);
			}
		};

		const fetchData = async () => {
			let response = await fetchModuleQuestions(assignmentKey);
			if (response) {
				populateQuestions(response);
				setQuestionData(response);
			}
		};
		if (assignmentKey) {
			fetchData();
			fetchAnswerHistory();
		}
	}, [assignmentKey]);

	const handleViewModuleIntro = () => {
		navigate(`/app/learning/moduleIntro/${assignmentKey}`, {
			state: {
				review: true,
				numberOfLearningUnits: questionData.learningUnits.length,
				estimatedTimeToComplete: questionData.timeAllotted,
			},
		});
	};

	useEffect(() => {
		const isAllExpanded = index.length === allExpandedIndices.length;
		if (isAllExpanded) {
			setExpandAll(false);
		}
	}, [index, allExpandedIndices]);

	return (
		<Container
			style={{ maxWidth: '1464px' }}
			id={'review'}
			margin="0"
			padding="0"
			maxWidth={'100vw'}
			overflowY={'auto'}
			overflowX={'hidden'}
			mx="auto">
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
							marginBottom={'12px'}
							fontSize={28}
							color={'#7E8A9B'}
							position="relative">
							{questionData.learningUnits.length} {i18n('questions')}
							<Text
								onClick={handleExpandAll}
								color={'#257CB5'}
								fontWeight={600}
								fontSize={'16px'}
								position="absolute"
								right="385px"
								top="50%"
								variant="link"
								_hover={{
									cursor: 'pointer',
								}}
								transform="translateY(-50%)">
								{index.length === allExpandedIndices.length
									? i18n('collapseAll')
									: i18n('expandAll')}
							</Text>
						</Text>
						<HStack justifyContent={'space-between'} alignItems={'flex-start'}>
							<VStack>
								<ReviewQuestions
									expandAll={expandAll}
									reviewQuestions={reviewQuestions}
									answerHistory={answerHistory}
									onExpandAllChange={handleExpandAllChange}
									index={index}
									setIndex={setIndex}
								/>
							</VStack>

							<Box
								bg="ampNeutral.100"
								minWidth={'400px'}
								minHeight={'263px'}
								borderRadius={12}
								p="12px">
								<h3>{i18n('moduleResourses')}</h3>
								{questionData.introductionRc && (
									<Button
										variant={'ampOutline'}
										marginTop={'12px'}
										onClick={handleViewModuleIntro}>
										{i18n('viewModuleIntro')}
									</Button>
								)}
							</Box>
						</HStack>
					</Box>
				) : (
					<LoadingReview />
				)}
			</Stack>
		</Container>
	);
};

export default Review;
