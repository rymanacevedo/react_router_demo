import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type FeedbackContextValue = {
	feedbackStatus: string;
	feedbackVariant: string;
	feedbackText: string;
	setFeedbackVariant: (value: string) => void;
	setFeedbackText: (value: string) => void;
	setFeedbackStatus: (value: string) => void;
};

const FeedbackContext = createContext<FeedbackContextValue>({
	feedbackStatus: '',
	feedbackVariant: '',
	feedbackText: '',
	setFeedbackVariant: () => {},
	setFeedbackText: () => {},
	setFeedbackStatus: () => {},
});

type Props = {
	children: ReactNode;
};

export const FeedbackProvider = ({ children }: Props) => {
	const [feedbackVariant, setFeedbackVariant] = useState<string>('');
	const [feedbackText, setFeedbackText] = useState<string>('');
	const [feedbackStatus, setFeedbackStatus] = useState<string>('');

	const contextValue = useMemo(
		() => ({
			feedbackVariant,
			feedbackText,
			feedbackStatus,
			setFeedbackVariant,
			setFeedbackText,
			setFeedbackStatus,
		}),
		[
			feedbackVariant,
			feedbackText,
			feedbackStatus,
			setFeedbackVariant,
			setFeedbackText,
			setFeedbackStatus,
		],
	);

	return (
		<FeedbackContext.Provider value={contextValue}>
			{children}
		</FeedbackContext.Provider>
	);
};

export const useFeedback = () => {
	return useContext(FeedbackContext);
};
