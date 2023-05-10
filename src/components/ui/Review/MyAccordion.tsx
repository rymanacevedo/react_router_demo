import { useState } from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
} from '@chakra-ui/react';

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
};

const MyAccordion = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleAccordionClick = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<Accordion allowMultiple>
			<AccordionItem>
				<h2>
					<AccordionButton sx={styles.container} onClick={handleAccordionClick}>
						{/* Content to display in the AccordionButton goes here */}
					</AccordionButton>
				</h2>
				<AccordionPanel>
					{isExpanded ? (
						<p>Content to display when the Accordion is expanded</p>
					) : null}
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

export default MyAccordion;
