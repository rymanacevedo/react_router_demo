import { createContext, useState } from 'react';

type FeedbackContextValue = {
	feedbackStatus: string;
	feedbackVariant: string;
	feedbackText: string;
	updateFeedback: (newfeedbackVariant: string, newText: string) => void;
	updateCorrectStatus: (status: string) => void;
};

// Create a new context
export const FeedbackContext = createContext<FeedbackContextValue>({
	feedbackStatus: '',
	feedbackVariant: '',
	feedbackText: '',
	updateFeedback: () => {},
	updateCorrectStatus: () => {},
});

type FeedbackProviderProps = {
	children: React.ReactNode;
};

// Create a provider component for the context
export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({
	children,
}) => {
	// Define state variables to store feedbackVariant and text
	const [feedbackVariant, setFeedbackVariant] = useState<string>('');
	const [feedbackText, setFeedbackText] = useState<string>('');
	const [feedbackStatus, setFeedbackStatus] = useState<string>('');

	// Function to update the feedbackVariant and text values
	const updateFeedback = (newfeedbackVariant: string, newText: string) => {
		console.log('variant setting');
		setFeedbackVariant(newfeedbackVariant);
		setFeedbackText(newText);
	};

	const updateCorrectStatus = (status: string) => {
		setFeedbackStatus(status);
	};

	// Value object to be provided by the context
	const contextValue = {
		feedbackVariant,
		feedbackText,
		feedbackStatus,
		updateFeedback,
		updateCorrectStatus,
	};

	return (
		<FeedbackContext.Provider value={contextValue}>
			{children}
		</FeedbackContext.Provider>
	);
};
