import {
	Box,
	AccordionItem,
	Accordion,
	AccordionButton,
	AccordionPanel,
	Text,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
	AnswerHistory,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
import RichContentComponent from '../RichContentComponent';
import { extractSrc, getIcons, truncateText } from '../../../utils/logic';
import { useTranslation } from 'react-i18next';
import ReviewContentRender from './ReviewContentRender';
import { useState } from 'react';

interface ReviewQuestionProps {
	transformedQuestion: TransformedQuestion;
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

const ReviewQuestion = ({ transformedQuestion }: ReviewQuestionProps) => {
	const { t: i18n } = useTranslation();
	const modifiedText = transformedQuestion.questionRc.includes('<img')
		? i18n('clickHereForImage')
		: transformedQuestion.questionRc;
	const [accordionIndex, setAccordionIndex] = useState<number[]>([]); // Initially empty

	const handleClick = () => {
		if (accordionIndex.length === 0) {
			setAccordionIndex([0]);
		} else {
			setAccordionIndex([]);
		}
	};

	return (
		<Accordion allowMultiple index={accordionIndex}>
			<AccordionItem
				style={{
					width: '895px',
					border: '1px solid #CCCCCC',
					borderRadius: '10px',
					marginRight: '16px',
				}}>
				{({ isExpanded }) => (
					<>
						<h2>
							<AccordionButton style={{ height: '76px' }} onClick={handleClick}>
								<Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
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
								<Icons answerHistory={transformedQuestion.answerHistory} />
								{isExpanded ? (
									<ChevronUpIcon fontSize="12px" />
								) : (
									<ChevronDownIcon fontSize="12px" />
								)}
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
		</Accordion>
	);
};

export default ReviewQuestion;
