import {
	Box,
	AccordionItem,
	Accordion,
	AccordionButton,
	AccordionPanel,
	Text,
	AccordionIcon,
} from '@chakra-ui/react';
// import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
	AnswerHistory,
	Item,
	LearningUnitQuestion,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
import RichContentComponent from '../RichContentComponent';
import {
	// createReviewQuestionsArray,
	extractSrc,
	getIcons,
} from '../../../utils/logic';
import { useTranslation } from 'react-i18next';
import ReviewContentRender from './ReviewContentRender';
import { useEffect, useState } from 'react';
// import { useState } from 'react';

interface ReviewQuestionsProps {
	reviewQuestions: LearningUnitQuestion[];
	answerHistory: Item[] | null;
	expandAll: boolean;
}

interface IconsProps {
	answerHistory: AnswerHistory[];
}

const Icons = ({ answerHistory }: IconsProps) => {
	return (
		<Box display="flex" marginLeft="auto" marginRight="27.5px">
			{getIcons(answerHistory)}
		</Box>
	);
};

const ReviewQuestions = ({
	reviewQuestions,
	answerHistory,
	expandAll,
}: ReviewQuestionsProps) => {
	const { t: i18n } = useTranslation();
	const [index, setIndex] = useState<number[]>([]);

	useEffect(() => {
		if (expandAll) {
			setIndex(reviewQuestions.map((_, idx) => idx));
		} else {
			setIndex([]);
		}
	}, [expandAll, reviewQuestions]);

	// useEffect(() => {
	// 	if (expandAll || index.length === allExpanded.length) {
	// 		onExpandAllChange(true);
	// 	} else {
	// 		onExpandAllChange(false);
	// 	}
	// }, [index, expandAll, allExpanded, onExpandAllChange]);

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
		<Accordion allowMultiple index={index} onChange={setIndex}>
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
											<Text>{isExpanded ? 'helo' : 'bye'}</Text>
										</Box>
										<Icons answerHistory={transformedQuestion.answerHistory} />
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									{modifiedText === i18n('clickHereForImage') ? (
										<img
											src={extractSrc(transformedQuestion.questionRc)}
											alt={transformedQuestion.questionRc}
											style={{ width: '50%', height: '50%' }}
										/>
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
	);
};

export default ReviewQuestions;
