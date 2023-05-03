import { ChevronDownIcon } from '@radix-ui/react-icons';

const styles = {
	container: {
		border: '1px solid #CCCCCC',
		borderRadius: '10px',
		padding: '10px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: '895px',
		height: '76px',
	},
	text: {
		fontWeight: 'bold',
		marginLeft: '24px',
	},
};

interface ReviewQuestionProps {
	text: string;
}

const ReviewQuestion = ({ text }: ReviewQuestionProps) => {
	return (
		<div style={styles.container}>
			<div style={styles.text}>{text}</div>
			<ChevronDownIcon />
			<ChevronDownIcon />
			<ChevronDownIcon />
			<ChevronDownIcon />
		</div>
	);
};

export default ReviewQuestion;
