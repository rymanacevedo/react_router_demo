import {
	Box,
	AccordionItem,
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Circle,
	// Tag,
	// Badge,
} from '@chakra-ui/react';
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@radix-ui/react-icons';
// import AmpChip from '../../../css/AmpChip';
// import { useEffect } from 'react';
// import { extractUUIDs } from '../../../utils/logic';
import {
	AnswerHistory,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
// import CustomOverLayIcon from '../AnswerInput/CustomOverLayIcon';
import RichContentComponent from '../RichContentComponent';
// import { useState } from 'react';

const styles = {
	// container: {
	// 	border: '1px solid #CCCCCC',
	// 	borderRadius: '10px',
	// 	padding: '10px',
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	width: '895px',
	// 	height: '76px',
	// 	marginBottom: '27px',
	// 	transition: 'height 0.3s ease-in-out', // Add transition for smooth animation
	// },
	// text: {
	// 	fontWeight: 'bold',
	// 	marginRight: '24px',
	// },
	// chevron: {
	// 	marginRight: '20px',
	// },
	circle: {
		marginInlineEnd: '4px',
	},
	// richContent: {
	// 	position: 'absolute',
	// 	top: '50%',
	// 	transform: 'translateY(-50%)',
	// },
};

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
			<Circle size="24px" bg="green.600" color="white">
				<CheckIcon />
			</Circle>
			<Circle size={'24px'} bg="ampSuccess.500" style={styles.circle} />
			<Circle size={'24px'} bg="ampSuccess.500" style={styles.circle} />
			<Circle size={'24px'} bg="ampSuccess.500" style={styles.circle} />
			<Circle size={'24px'} bg="ampSuccess.500" style={styles.circle} />
			<Circle size={'24px'} bg="ampSuccess.500" />
		</Box>
	);
};

const ReviewQuestion = ({ transformedQuestion }: ReviewQuestionProps) => {
	// console.log(answerHistory);
	// // console.log(question);
	// // useEffect(() => {
	// // 	const uuids = extractUUIDs(answerHistory);
	// // }, []);
	const modifiedText = transformedQuestion.questionRc.includes('<img')
		? 'Click here for image'
		: transformedQuestion.questionRc;
	// const [isExpanded, setIsExpanded] = useState(false);

	// Update the height of the container when isExpanded is true
	// const containerHeight = isExpanded ? '200px' : styles.container.height;

	return (
		<Accordion allowMultiple>
			<AccordionItem
				style={{
					width: '895px',
					border: '1px solid #CCCCCC',
					borderRadius: '10px',
					marginBottom: '27px',
				}}>
				<h2>
					<AccordionButton style={{ height: '76px' }}>
						<Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
							<RichContentComponent content={modifiedText} />
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem
				style={{
					width: '895px',
					border: '1px solid #CCCCCC',
					borderRadius: '10px',
					marginBottom: '27px',
				}}>
				{({ isExpanded }) => (
					<>
						<h2>
							<AccordionButton style={{ height: '76px' }}>
								<Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
									Section 2 title
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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat.
						</AccordionPanel>
					</>
				)}
			</AccordionItem>
		</Accordion>
	);
};

export default ReviewQuestion;
