import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function AmpBox({ children }: { children?: ReactNode }) {
	return (
		<Flex
			backgroundColor="ampWhite"
			boxShadow="md"
			borderRadius="3xl"
			p={12}
			flex={1}
			direction="column">
			{children}
		</Flex>
	);
}
