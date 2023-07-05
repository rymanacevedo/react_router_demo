import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function AmpBox({ children }: { children?: ReactNode }) {
	return (
		<Box
			backgroundColor="ampWhite"
			boxShadow="md"
			borderRadius={24}
			px={18}
			py={11}
			w={{ base: '100%', md: '50%' }}>
			{children}
		</Box>
	);
}
