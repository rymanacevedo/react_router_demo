import { Circle, Box } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
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
		transition: 'height 0.3s ease-in-out', // Add transition for smooth animation
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
	richContent: {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
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
	const modifiedText = text.includes('<img') ? 'Click here for image' : text;
	const [isExpanded, setIsExpanded] = useState(false);

	// Update the height of the container when isExpanded is true
	const containerHeight = isExpanded ? '200px' : styles.container.height;

	return (
		<Box
			style={{
				...styles.container,
				height: containerHeight, // Set the height dynamically
			}}
			onClick={() => {
				setIsExpanded(!isExpanded);
			}}>
			<Box style={styles.text}>
				<RichContentComponent content={modifiedText} />
			</Box>
			<Circles />
			{isExpanded ? (
				<ChevronUpIcon style={styles.chevron} height={20} width={20} />
			) : (
				<ChevronDownIcon style={styles.chevron} height={20} width={20} />
			)}
		</Box>
	);
};

export default ReviewQuestion;
