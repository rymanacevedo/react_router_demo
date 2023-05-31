import { Box, Text } from '@chakra-ui/react';

type CountUpTimerProps = {
	seconds: number;
};

const CountUpTimer = ({ seconds }: CountUpTimerProps) => {
	const convertSecondsToTime = (timerSeconds: number): string => {
		const hours = Math.floor(timerSeconds / 3600);
		const minutes = Math.floor((timerSeconds - hours * 3600) / 60);
		const convertedSeconds = timerSeconds - hours * 3600 - minutes * 60;

		return `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:${convertedSeconds.toString().padStart(2, '0')}`;
	};

	return (
		<Box>
			<Text fontSize="21px" fontWeight="600" color="ampWhite">
				{convertSecondsToTime(seconds)}
			</Text>
		</Box>
	);
};

export default CountUpTimer;
