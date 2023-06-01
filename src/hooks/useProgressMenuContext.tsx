import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useInterval from './useInterval';

type ProgressMenuContextType = {
	isMenuOpen: boolean;
	handleMenuOpen: () => void;
	seconds: number;
	clearTimer: () => void;
};

const ProgressMenuContext = createContext<ProgressMenuContextType>({
	isMenuOpen: false,
	handleMenuOpen: () => {},
	seconds: 0,
	clearTimer: () => {},
});

const useProgressMenuContext = () => {
	const context = useContext(ProgressMenuContext);
	if (!context) {
		throw new Error(
			'useProgressMenuContext must be used within a ProgressMenuContextProvider',
		);
	}
	return context;
};

const ProgressMenuContextProvider = ({ children }: { children: any }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [seconds, setSeconds] = useState(0);
	const location = useLocation();
	const inAssignment = location.pathname.indexOf('assignment');
	const inReview = location.pathname.indexOf('review');

	const timerFunc = () => {
		setSeconds((prevSeconds) => prevSeconds + 1);
		return seconds;
	};

	const startTimer = useInterval(timerFunc, 1000);

	const clearTimer = () => {
		startTimer(false);
		setSeconds(0);
	};

	useEffect(() => {
		if (inAssignment > -1 || inReview > -1) {
			startTimer(true);
		}
		return () => {
			clearTimer();
		};
	}, [inAssignment, inReview, startTimer]);

	const handleMenuOpen = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	const value = useMemo(
		() => ({
			isMenuOpen,
			handleMenuOpen,
			seconds,
			clearTimer,
		}),
		[isMenuOpen, handleMenuOpen, seconds, clearTimer],
	);

	return (
		<ProgressMenuContext.Provider value={value}>
			{children}
		</ProgressMenuContext.Provider>
	);
};

export { ProgressMenuContextProvider, useProgressMenuContext };
