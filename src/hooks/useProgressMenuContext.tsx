import { createContext, useContext, useMemo, useState } from 'react';

type ProgressMenuContextType = {
	isMenuOpen: boolean;
	handleMenuOpen: () => void;
};

const ProgressMenuContext = createContext<ProgressMenuContextType>({
	isMenuOpen: false,
	handleMenuOpen: () => {},
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

	const handleMenuOpen = () => {
		setIsMenuOpen((prevState) => !prevState);
	};

	const value = useMemo(
		() => ({ isMenuOpen, handleMenuOpen }),
		[isMenuOpen, handleMenuOpen],
	);

	return (
		<ProgressMenuContext.Provider value={value}>
			{children}
		</ProgressMenuContext.Provider>
	);
};

export { ProgressMenuContextProvider, useProgressMenuContext };
