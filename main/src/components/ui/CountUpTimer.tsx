import { Box, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const CountUpTimer = () => {
	const [timeState, setTimeState] = useState([0, 0, 0]);
	const [hours, minutes, seconds] = timeState;

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeState((timeState) => {
				const [currentHours, currentMinutes, currentSeconds] = timeState;
				let newHours = currentHours,
					newMinutes = currentMinutes,
					newSeconds = currentSeconds + 1;
				if (newSeconds >= 60) {
					newMinutes += 1;
					newSeconds = 0;
				}
				if (newMinutes >= 60) {
					newHours += 1;
					newMinutes = 0;
				}
				return [newHours, newMinutes, newSeconds];
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Box>
			<Text fontSize={'21px'} fontWeight="600" color={'ampWhite'}>
				{hours.toString().padStart(2, '0')}:
				{minutes.toString().padStart(2, '0')}:
				{seconds.toString().padStart(2, '0')}
			</Text>
		</Box>
	);
};

export default CountUpTimer;
