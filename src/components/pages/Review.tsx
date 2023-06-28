import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { json, useLoaderData, useNavigate } from 'react-router-dom';
import {
	createReviewQuestionsArray,
	sortReviewQuestions,
} from '../../utils/logic';
import ReviewQuestions from '../ui/Review/ReviewQuestions';
import {
	Item,
	LearningUnit,
	LearningUnitQuestion,
	ModuleData,
} from './AssignmentView/AssignmentTypes';
import { useQuizContext } from '../../hooks/useQuizContext';
import { LoaderFunction } from 'react-router';
import { requireUser } from '../../utils/user';
import { getSubAccount } from '../../services/utils';
import {
	getAnswerHistory,
	getFullModuleWithQuestions,
} from '../../services/learning';

export const reviewLoader: LoaderFunction = async ({ params }) => {
	const assignmentKey = params.assignmentKey!;
	const user = requireUser();
	const { subAccount } = getSubAccount(user);
	const { data } = await getAnswerHistory(user, subAccount, assignmentKey);

	const { moduleInfoAndQuestions } = await getFullModuleWithQuestions(
		user,
		subAccount,
		assignmentKey,
	);

	return json({ data: data.items, assignmentKey, moduleInfoAndQuestions });
};

const Review = () => {
	const { assignmentKey, data, moduleInfoAndQuestions } = useLoaderData() as {
		assignmentKey: string;
		data: Item[];
		moduleInfoAndQuestions: ModuleData;
	};
	const { message } = useQuizContext();

	const [reviewQuestions, setReviewQuestions] = useState<
		LearningUnitQuestion[]
	>([]);

	const { t: i18n } = useTranslation();
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
				obj[prop].forEach((unit: LearningUnit) => {
					unit.questions.forEach((question) => {
						questions.push(question);
					});
				});
			}
		}
		setReviewQuestions(questions);
	};

	useEffect(() => {
		if (moduleInfoAndQuestions) {
			populateQuestions(moduleInfoAndQuestions);
		}
	}, [assignmentKey]);

	const handleViewModuleIntro = () => {
		navigate(`/learning/moduleIntro/${assignmentKey}`, {
			state: {
				review: true,
				numberOfLearningUnits: moduleInfoAndQuestions.learningUnits.length,
				estimatedTimeToComplete: moduleInfoAndQuestions.timeAllotted,
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
		<main id="review">
			<Container maxWidth={1464} mr="auto" ml="auto">
				<Flex
					backgroundColor="ampWhite"
					boxShadow="md"
					borderRadius={24}
					wrap="wrap"
					p={18}>
					<Box width="895px">
						<Flex direction="column" basis="100%" flex={1}>
							<Heading as="h1" mb={3}>
								{moduleInfoAndQuestions.name}
							</Heading>
							<Flex align="center" justify="space-between">
								<Text fontSize="lg" color="ampNeutral.600">
									{moduleInfoAndQuestions.learningUnits.length}{' '}
									{moduleInfoAndQuestions.learningUnits.length > 1
										? i18n('questions')
										: i18n('question')}
								</Text>
								<Button
									variant="ghost"
									colorScheme="ampSecondary"
									onClick={handleExpandAll}>
									{index.length === allExpandedIndices.length
										? i18n('collapseAll')
										: i18n('expandAll')}
								</Button>
							</Flex>

							<ReviewQuestions
								expandAll={expandAll}
								reviewQuestions={sortReviewQuestions(reviewQuestions, message)}
								answerHistory={data}
								onExpandAllChange={handleExpandAllChange}
								index={index}
								setIndex={setIndex}
							/>
						</Flex>
					</Box>
					<Flex direction="column" basis="100%" flex={1}>
						{moduleInfoAndQuestions.introductionRc && (
							<Box
								bg="ampNeutral.100"
								minWidth={'400px'}
								minHeight={'263px'}
								borderRadius={12}
								p={3}>
								<h3>{i18n('moduleResources')}</h3>
								<Button
									variant={'outline'}
									marginTop={'12px'}
									onClick={handleViewModuleIntro}>
									{i18n('viewModuleIntro')}
								</Button>
							</Box>
						)}
					</Flex>
				</Flex>
			</Container>
		</main>
	);
};

export default Review;
