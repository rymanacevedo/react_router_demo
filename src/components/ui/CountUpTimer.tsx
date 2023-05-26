import { Box, Text } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';

const CountUpTimer = () => {
	const [timeState, setTimeState] = useState([0, 0, 0]);
	const [hours, minutes, seconds] = timeState;
	const countUpRef = useRef<ReturnType<typeof setInterval>>();
	useEffect(() => {
		const interval = () => {
			countUpRef.current = setInterval(() => {
				setTimeState((currentTime) => {
					const [currentHours, currentMinutes, currentSeconds] = currentTime;
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
		};

		interval();

		return () => clearInterval(countUpRef.current);
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
