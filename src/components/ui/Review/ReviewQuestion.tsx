import { Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { getIcons, truncateText } from '../../../utils/logic';
import {
	AnswerHistory,
	TransformedQuestion,
} from '../../pages/AssignmentView/AssignmentTypes';
import RichContentComponent from '../RichContentComponent';

const styles = {
	container: {
		border: '1px solid #CCCCCC',
		borderRadius: '10px',
		padding: '10px',
		display: 'flex',
		alignItems: 'center',
		width: '895px',
		height: '76px',
		marginBottom: '27px',
	},
	text: {
		fontWeight: 'bold',
		marginRight: '24px',
	},
	chevron: {
		marginRight: '20px',
	},
	circle: {
		marginInlineEnd: '4px',
	},
};

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
	const modifiedText = transformedQuestion.questionRc.includes('<img')
		? 'Click here for image'
		: transformedQuestion.questionRc;

	return (
		<Box style={styles.container}>
			<Box style={styles.text}>
				<RichContentComponent content={truncateText(modifiedText)} />
			</Box>
			<Icons answerHistory={transformedQuestion.answerHistory} />
			<ChevronDownIcon style={styles.chevron} height={20} width={20} />
		</Box>
	);
};

export default ReviewQuestion;
