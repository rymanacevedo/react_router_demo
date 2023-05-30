import { Box, Text } from '@chakra-ui/react';

type CountUpTimerProps = {
	hours: number;
	minutes: number;
	seconds: number;
};

const CountUpTimer = ({ hours, minutes, seconds }: CountUpTimerProps) => {
	return (
		<Box>
			<Text fontSize="21px" fontWeight="600" color="ampWhite">
				{hours.toString().padStart(2, '0')}:
				{minutes.toString().padStart(2, '0')}:
				{seconds.toString().padStart(2, '0')}
			</Text>
		</Box>
	);
};

export default CountUpTimer;
