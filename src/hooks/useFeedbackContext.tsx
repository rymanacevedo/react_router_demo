import { createContext, useMemo, useState } from 'react';

type FeedbackContextValue = {
	feedbackStatus: string;
	feedbackVariant: string;
	feedbackText: string;
	updateFeedback: (newfeedbackVariant: string, newText: string) => void;
	updateCorrectStatus: (status: string) => void;
};

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

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({
	children,
}) => {
	const [feedbackVariant, setFeedbackVariant] = useState<string>('');
	const [feedbackText, setFeedbackText] = useState<string>('');
	const [feedbackStatus, setFeedbackStatus] = useState<string>('');

	const updateFeedback = (newfeedbackVariant: string, newText: string) => {
		setFeedbackVariant(newfeedbackVariant);
		setFeedbackText(newText);
	};

	const updateCorrectStatus = (status: string) => {
		setFeedbackStatus(status);
	};

	const contextValue = useMemo(
		() => ({
			feedbackVariant,
			feedbackText,
			feedbackStatus,
			updateFeedback,
			updateCorrectStatus,
		}),
		[
			feedbackVariant,
			feedbackText,
			feedbackStatus,
			updateFeedback,
			updateCorrectStatus,
		],
	);

	return (
		<FeedbackContext.Provider value={contextValue}>
			{children}
		</FeedbackContext.Provider>
	);
};
