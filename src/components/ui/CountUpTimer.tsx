import { Box, Text } from '@chakra-ui/react';
import { convertSecondsToTime } from '../../utils/logic';

type CountUpTimerProps = {
	seconds: number;
};

const CountUpTimer = ({ seconds }: CountUpTimerProps) => {
	return (
		<Box>
			<Text fontSize="21px" fontWeight="600" color="ampWhite">
				{convertSecondsToTime(seconds)}
			</Text>
		</Box>
	);
};

export default CountUpTimer;
