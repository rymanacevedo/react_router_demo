import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { BadgeVariantValues } from '../components/ui/RefactorAnswerFeedback/AnswerFeedbackBadge';

type FeedbackContextValue = {
	feedbackVariant: BadgeVariantValues | undefined;
	feedbackStatus: string;
	feedbackText: string;
	setFeedbackVariant: (value: BadgeVariantValues) => void;
	setFeedbackText: (value: string) => void;
	setFeedbackStatus: (value: string) => void;
};

const FeedbackContext = createContext<FeedbackContextValue>({
	feedbackVariant: undefined,
	feedbackStatus: '',
	feedbackText: '',
	setFeedbackVariant: () => {},
	setFeedbackText: () => {},
	setFeedbackStatus: () => {},
});

type Props = {
	children: ReactNode;
};

export const FeedbackProvider = ({ children }: Props) => {
	const [feedbackVariant, setFeedbackVariant] = useState<
		BadgeVariantValues | undefined
	>(undefined);
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
