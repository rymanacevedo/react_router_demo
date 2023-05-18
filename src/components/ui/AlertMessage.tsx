import { Alert, AlertIcon, Text } from '@chakra-ui/react';

export default function AlertMessage({ text }: { text: string }) {
	return (
		<Alert status="error" bg="ampError.50">
			<AlertIcon />
			<Text align="center" color="ampError.700">
				{text}
			</Text>
		</Alert>
	);
}
