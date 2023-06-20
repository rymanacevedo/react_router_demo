import {
	Card as ChakraCard,
	CardBody,
	CardProps as ChakraCardProps,
	Text,
} from '@chakra-ui/react';
import Triangle from './Triangle';

export type CardValue = 'unselected' | 'flagged' | 'selected' | 'answered';
export type CardValues = CardValue[];
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
	const { values: cardValues } = values;
	const isFlagged = cardValues.includes('flagged');
	const isSelected = cardValues.includes('selected');
	return (
		<ChakraCard
			marginRight={'4px'}
			marginLeft={'4px'}
			marginBottom={'8px'}
			marginTop={'8px'}
			display={'inline-flex'}
			key={variant}
			variant={variant}
			size={size}
			position={'relative'}
			{...values}>
			{isFlagged && <Triangle isSelected={isSelected} />}
			<CardBody>
				<Text>{text}</Text>
			</CardBody>
		</ChakraCard>
	);
}
