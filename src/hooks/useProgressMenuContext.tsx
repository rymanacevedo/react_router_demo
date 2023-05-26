import {
	createContext,
	useContext,
	useMemo,
	useState,
	useRef,
	useEffect,
} from 'react';

type ProgressMenuContextType = {
	isMenuOpen: boolean;
	handleMenuOpen: () => void;
	hours: number;
	minutes: number;
	seconds: number;
};

const ProgressMenuContext = createContext<ProgressMenuContextType>({
	isMenuOpen: false,
	handleMenuOpen: () => {},
	hours: 0,
	minutes: 0,
	seconds: 0,
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

	const handleMenuOpen = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	const value = useMemo(
		() => ({ isMenuOpen, handleMenuOpen, hours, minutes, seconds }),
		[isMenuOpen, handleMenuOpen, hours, minutes, seconds],
	);

	return (
		<ProgressMenuContext.Provider value={value}>
			{children}
		</ProgressMenuContext.Provider>
	);
};

export { ProgressMenuContextProvider, useProgressMenuContext };
