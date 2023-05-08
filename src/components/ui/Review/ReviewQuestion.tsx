import { Circle, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
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
	text: string;
}

const Circles = () => {
	return (
		<Box display="flex" marginLeft="auto" marginRight="27.5px">
			<Circle size={'24px'} bg="ampSuccess.500" style={styles.circle} />
			<Circle size={'24px'} bg="ampSuccess.500" style={styles.circle} />
			<Circle size={'24px'} bg="ampSuccess.500" style={styles.circle} />
			<Circle size={'24px'} bg="ampSuccess.500" style={styles.circle} />
			<Circle size={'24px'} bg="ampSuccess.500" />
		</Box>
	);
};

const ReviewQuestion = ({ text }: ReviewQuestionProps) => {
	return (
		<Box style={styles.container}>
			<Box style={styles.text}>
				<RichContentComponent content={text} />
			</Box>
			<Circles />
			<ChevronDownIcon style={styles.chevron} height={20} width={20} />
		</Box>
	);
};

export default ReviewQuestion;
