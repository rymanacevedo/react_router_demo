import {
	Card as ChakraCard,
	CardBody,
	CardProps as ChakraCardProps,
	Text,
} from '@chakra-ui/react';

type CardValue = 'unselected' | 'flagged' | 'selected' | 'answered';
type CardValues = CardValue[];
interface Options extends ChakraCardProps {
	size: 'sm' | 'md';
	variant: 'multiPartCard';
	text: string;
	values: CardValues;
}

export default function PracticeTestCard({
	variant,
	text,
	size,
	...values
}: Options) {
	return (
		<ChakraCard
			marginRight={'5px'}
			marginLeft={'5px'}
			marginBottom={'8px'}
			marginTop={'8px'}
			display={'inline-flex'}
			key={variant}
			variant={variant}
			size={size}
			{...values}>
			<CardBody>
				<Text>{text}</Text>
			</CardBody>
		</ChakraCard>
	);
}
