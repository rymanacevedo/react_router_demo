import {
	Box,
	AccordionItem,
	Accordion,
	AccordionButton,
	AccordionPanel,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
	AnswerHistory,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
import RichContentComponent from '../RichContentComponent';
import { getIcons, truncateText } from '../../../utils/logic';
import { useTranslation } from 'react-i18next';

interface ReviewQuestionProps {
	transformedQuestion: TransformedQuestion;
}

interface IconsProps {
	answerHistory: AnswerHistory[];
}

const Icons = ({ answerHistory }: IconsProps) => {
	console.log(answerHistory);

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

	return (
		<Accordion allowMultiple>
			<AccordionItem
				style={{
					width: '895px',
					border: '1px solid #CCCCCC',
					borderRadius: '10px',
				}}>
				{({ isExpanded }) => (
					<>
						<h2>
							<AccordionButton style={{ height: '76px' }}>
								<Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
									{isExpanded ? (
										`${transformedQuestion.answerHistory.length} Attempt`
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
							<RichContentComponent
								content={modifiedText}
								style={{ fontSize: '21px', fontWeight: 400 }}
							/>
						</AccordionPanel>
					</>
				)}
			</AccordionItem>
		</Accordion>
	);
};

export default ReviewQuestion;
