import { Card, CardBody, Text } from '@chakra-ui/react';

type Options = {
	size: 'sm' | 'md';
	variant: 'unselected' | 'flagged' | 'selected' | 'selectedFlagged';
	text: string;
};

export default function PracticeTestCard({ variant, text, size }: Options) {
	return (
		<Card
			marginRight={'8px'}
			marginBottom={'8px'}
			marginTop={'8px'}
			display={'inline-flex'}
			key={variant}
			variant={variant}
			size={size}>
			<CardBody>
				<Text>{text}</Text>
			</CardBody>
		</Card>
	);
}
