import { useCallback, useEffect, useRef, useState } from 'react';

type Callback = () => void;

function useInterval(
	callback: Callback,
	delay: number | null,
): (shouldStart: boolean) => void {
	const savedCallback = useRef<Callback | null>(null);
	const [start, setStart] = useState(false);

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		if (start) {
			const tick = () => {
				if (savedCallback.current) {
					savedCallback.current();
				}
			};
			if (delay !== null) {
				const id = setInterval(tick, delay);
				return () => clearInterval(id);
			}
		}
	}, [delay, start]);

	const startTimer = useCallback((shouldStart: boolean) => {
		setStart(shouldStart);
	}, []);

	return startTimer;
}

export default useInterval;
