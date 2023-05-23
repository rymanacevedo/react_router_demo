import {
	Box,
	AccordionItem,
	Accordion,
	AccordionButton,
	AccordionPanel,
	Text,
	AccordionIcon,
	Stack,
	VStack,
	HStack,
} from '@chakra-ui/react';
import {
	AnswerHistory,
	Item,
	LearningUnitQuestion,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
import RichContentComponent from '../RichContentComponent';
import { truncateText, getIcons } from '../../../utils/logic';
import { useTranslation } from 'react-i18next';
import ReviewContentRender from './ReviewContentRender';
import { useEffect } from 'react';

interface ReviewQuestionsProps {
	reviewQuestions: LearningUnitQuestion[];
	answerHistory: Item[] | null;
	expandAll: boolean;
	index: number[];
	setIndex: (index: number[]) => void;
	onExpandAllChange: (expanded: boolean) => void;
}

interface IconsProps {
	answerHistory: AnswerHistory[];
	isExpanded: boolean;
}

const Icons = ({ answerHistory, isExpanded }: IconsProps) => {
	if (isExpanded && answerHistory.length > 20) {
		let beginningAnswerHistory: AnswerHistory[] = [];
		let remainingAnswerHistory: AnswerHistory[] = [];

		if (answerHistory.length > 20) {
			beginningAnswerHistory = answerHistory.slice(0, 20);
			remainingAnswerHistory = answerHistory.slice(20);
		}
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
	} else {
		return (
			<Box
				display="flex"
				marginLeft="auto"
				marginRight="27.5px"
				id="insideIcons">
				{getIcons(answerHistory, isExpanded)}
			</Box>
		);
	}
};

const ReviewQuestions = ({
	reviewQuestions,
	answerHistory,
	expandAll,
	index,
	setIndex,
}: ReviewQuestionsProps) => {
	const { t: i18n } = useTranslation();

	useEffect(() => {
		if (expandAll) {
			setIndex(Array.from(Array(reviewQuestions.length).keys()));
		} else {
			setIndex([]);
		}
	}, [expandAll, reviewQuestions.length, setIndex]);

	const transformQuestion = (
		question: LearningUnitQuestion,
		answerHistoryArray: Item[] | null,
	): TransformedQuestion => {
		const uuid = question.uid;
		const target = answerHistoryArray?.find((item) =>
			item.publishedQuestionUri.includes(uuid),
		);
		if (target) {
			return {
				...question,
				answerHistory: target.answerHistory,
			};
		}
		return {
			...question,
			answerHistory: [],
		};
	};

	return (
		<VStack alignItems="flex-start" width="100%">
			<HStack width="100%" justifyContent="space-between" alignItems="center">
				<Accordion
					allowMultiple
					index={index}
					onChange={setIndex}
					marginRight={'7px'}>
					{reviewQuestions.map((reviewQuestion) => {
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
									width: '895px',
									border: '1px solid #CCCCCC',
									borderRadius: '10px',
									margin: '10px',
								}}>
								{({ isExpanded }) => (
									<>
										<h2>
											<AccordionButton
												style={{
													height: '76px',
													display: 'flex',
													justifyContent: 'space-between',
												}}>
												<Box
													as="span"
													flex="1"
													textAlign="left"
													fontWeight={'bold'}>
													{isExpanded ? (
														`${transformedQuestion.answerHistory.length} ${i18n(
															'attempts',
														)}`
													) : (
														<RichContentComponent
															content={truncateText(modifiedText)}
															style={{ fontSize: '16px', fontWeight: 600 }}
														/>
													)}
												</Box>
												<Box id="insideRender">
													<Icons
														answerHistory={transformedQuestion.answerHistory}
														isExpanded={isExpanded}
													/>
												</Box>

												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											{modifiedText === i18n('clickHereForImage') ? (
												<Stack spacing="20px" marginTop="34px">
													<ReviewContentRender
														content={transformedQuestion.questionRc}
													/>
												</Stack>
											) : (
												<RichContentComponent
													content={modifiedText}
													style={{ fontSize: '21px', fontWeight: 400 }}
												/>
											)}

											<Text
												color={'#468446'}
												fontWeight={600}
												fontSize={'21px'}
												marginTop={'24px'}
												marginBottom={'24px'}>
												{i18n('correctAnswers')}
											</Text>
											{transformedQuestion.answers
												.filter((answer) => answer.isCorrect)
												.map((answer) => {
													return (
														<>
															<ReviewContentRender content={answer.answerRc} />
														</>
													);
												})}
										</AccordionPanel>
									</>
								)}
							</AccordionItem>
						);
					})}
				</Accordion>
			</HStack>
		</VStack>
	);
};

export default ReviewQuestions;
