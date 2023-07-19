import { HStack, Icon, Text } from '@chakra-ui/react';
import { LapTimerIcon } from '@radix-ui/react-icons';
import { convertSecondsToTime } from '../../utils/logic';

type CountUpTimerProps = {
	seconds: number;
	color: string;
	boxSize: number;
};

const CountUpTimer = ({ seconds, color, boxSize }: CountUpTimerProps) => {
	return (
		<HStack>
			<Icon as={LapTimerIcon} color={color} boxSize={boxSize} />
			<Text fontSize="lg" fontWeight="semibold" color={color}>
				{convertSecondsToTime(seconds)}
			</Text>
		</HStack>
	);
};

export default CountUpTimer;
