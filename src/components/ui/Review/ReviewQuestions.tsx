import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Stack,
} from '@chakra-ui/react';
import {
	AnswerHistory,
	Item,
	LearningUnitQuestion,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
import RichContentComponent from '../RichContentComponent';
import {
	getIcons,
	transformQuestion,
	truncateText,
} from '../../../utils/logic';
import { useTranslation } from 'react-i18next';
import ReviewContentRender from './ReviewContentRender';
import { useEffect } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useNavigate, useParams } from 'react-router-dom';

interface ReviewQuestionsProps {
	reviewQuestions: LearningUnitQuestion[];
	answerHistory: Item[] | null;
	expandAll: boolean;
	index: number[];
	setIndex: (index: number[]) => void;
	onExpandAllChange: (expanded: boolean) => void;
}

interface IconsProps {
	answerHistory?: AnswerHistory[];
	isExpanded: boolean;
	addMargins: boolean;
	isInReviewView: boolean;
}

export const Icons = ({
	answerHistory,
	isExpanded,
	addMargins,
	isInReviewView,
}: IconsProps) => {
	if (answerHistory) {
		if (isExpanded && answerHistory.length > 20) {
			let beginningAnswerHistory: AnswerHistory[] = [];
			let remainingAnswerHistory: AnswerHistory[] = [];

			if (answerHistory.length > 20) {
				beginningAnswerHistory = answerHistory.slice(0, 20);
				remainingAnswerHistory = answerHistory.slice(20);
			}

			if (isInReviewView) {
				return (
					<Flex flexDirection="column">
						<Box
							display="flex"
							marginLeft="auto"
							marginRight="27.5px"
							id="insideIcons">
							{getIcons(beginningAnswerHistory, isExpanded)}
						</Box>
						<Box
							display="flex"
							justifyContent="flex-start"
							marginRight="27.5px"
							id="insideIcons">
							{getIcons(remainingAnswerHistory, isExpanded)}
						</Box>
					</Flex>
				);
			} else {
				return (
					<>
						<Box
							display="flex"
							marginLeft="auto"
							marginRight="27.5px"
							id="insideIcons">
							{getIcons(beginningAnswerHistory, isExpanded)}
						</Box>
						<Box
							display="flex"
							justifyContent="flex-end"
							marginRight="27.5px"
							id="insideIcons">
							{getIcons(remainingAnswerHistory, isExpanded)}
						</Box>
					</>
				);
			}
		} else {
			return (
				<Box
					display="flex"
					marginLeft={addMargins ? 'auto' : 'none'}
					marginRight={addMargins ? '27.5px' : 'none'}
					id="insideIcons">
					{getIcons(answerHistory, isExpanded)}
				</Box>
			);
		}
	} else {
		return null;
	}
};

const ReviewQuestions = ({
	reviewQuestions,
	answerHistory,
	expandAll,
	index,
	setIndex,
}: ReviewQuestionsProps) => {
	const { assignmentKey } = useParams();
	const navigate = useNavigate();
	const { t: i18n } = useTranslation();

	useEffect(() => {
		if (expandAll) {
			setIndex(Array.from(Array(reviewQuestions.length).keys()));
		} else {
			setIndex([]);
		}
	}, [expandAll, reviewQuestions.length, setIndex]);

	const handleViewQuestion = (
		questionId: number,
		transformedQuestion: TransformedQuestion,
		questionIndex: number,
	) => {
		navigate(`/learning/review/${assignmentKey}/${questionId}`, {
			state: {
				questionIndex,
				transformedQuestion,
				reviewQuestions,
			},
		});
	};

	return (
		<Accordion allowMultiple index={index} onChange={setIndex}>
			{reviewQuestions.map((reviewQuestion, questionIndex) => {
				const transformedQuestion = transformQuestion(
					reviewQuestion,
					answerHistory,
				);
				const modifiedText = transformedQuestion.questionRc.includes('<img')
					? i18n('clickHereForImage')
					: transformedQuestion.questionRc;
				return (
					<AccordionItem
						style={{
							border: '1px solid #CCCCCC',
							borderRadius: '10px',
							margin: '10px',
						}}>
						{({ isExpanded }) => (
							<>
								<AccordionButton
									height={76}
									display="flex"
									justifyContent="space-between">
									<Box as="span" flex="1" textAlign="left" fontWeight="bold">
										{isExpanded ? (
											`${transformedQuestion.answerHistory.length} ${i18n(
												'attempts',
											)}`
										) : (
											<RichContentComponent
												content={truncateText(modifiedText)}
												style={{ fontWeight: 600 }}
											/>
										)}
									</Box>
									<Box id="insideRender">
										<Icons
											isInReviewView={false}
											addMargins={true}
											answerHistory={transformedQuestion.answerHistory}
											isExpanded={isExpanded}
										/>
									</Box>

									<AccordionIcon />
								</AccordionButton>
								<AccordionPanel pb={4}>
									{modifiedText === i18n('clickHereForImage') ? (
										<Stack spacing={5} marginTop={8}>
											<ReviewContentRender
												content={transformedQuestion.questionRc}
											/>
										</Stack>
									) : (
										<RichContentComponent content={modifiedText} />
									)}

									<Heading
										as="h3"
										size="md"
										color="ampSuccess.500"
										mt={4}
										mb={4}>
										{i18n('correctAnswers')}
									</Heading>
									{transformedQuestion.answers
										.filter((answer) => answer.isCorrect)
										.map((answer) => {
											return <ReviewContentRender content={answer.answerRc} />;
										})}
									<Divider />
									<Button
										variant="outline"
										onClick={() => {
											handleViewQuestion(
												transformedQuestion.id,
												transformedQuestion,
												questionIndex,
											);
										}}
										rightIcon={<ArrowRightIcon />}
										mt={6}
										ml={2}
										mb={2}>
										{i18n('viewTheQuestion')}
									</Button>
								</AccordionPanel>
							</>
						)}
					</AccordionItem>
				);
			})}
		</Accordion>
	);
};

export default ReviewQuestions;
