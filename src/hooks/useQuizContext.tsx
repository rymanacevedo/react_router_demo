import { createContext, useContext, useMemo, useState } from 'react';

type QuizContextType = {
	message: {
		FIVE_FAST_ANSWERS: number;
		FIVE_CONSEC_SI: number;
		SIX_DK_IN_ROUND: number;
		FIVE_CONSEC_SC: number;
	};
	handleMessage: (messageType: string, reset: boolean) => void;
};

const QuizContext = createContext<QuizContextType>({
	message: {
		FIVE_FAST_ANSWERS: 0,
		FIVE_CONSEC_SI: 0,
		SIX_DK_IN_ROUND: 0,
		FIVE_CONSEC_SC: 0,
	},
	handleMessage: () => {},
});

export const QuizProvider = ({ children }: { children: any }) => {
	const [message, setMessage] = useState<QuizContextType['message']>({
		FIVE_FAST_ANSWERS: 0,
		FIVE_CONSEC_SI: 0,
		SIX_DK_IN_ROUND: 0,
		FIVE_CONSEC_SC: 0,
	});

	const handleMessage = (messageType: string, reset: boolean) => {
		const resetFiveFastAnswers = () => {
			setMessage({
				...message,
				FIVE_FAST_ANSWERS: 0,
			});
		};

		const resetFiveConsecutiveSureCorrect = () => {
			setMessage({
				...message,
				FIVE_CONSEC_SC: 0,
			});
		};

		const resetFiveConsecutiveSureIncorrect = () => {
			setMessage({
				...message,
				FIVE_CONSEC_SI: 0,
			});
		};
		switch (messageType) {
			case 'FIVE_FAST_ANSWERS':
				if (reset || message.FIVE_FAST_ANSWERS === 5) {
					resetFiveFastAnswers();
				} else {
					setMessage({
						...message,
						FIVE_FAST_ANSWERS: message.FIVE_FAST_ANSWERS + 1,
					});
				}
				break;
			case 'FIVE_CONSEC_SI':
				if (reset || message.FIVE_CONSEC_SI === 5) {
					resetFiveConsecutiveSureIncorrect();
				} else {
					setMessage({
						...message,
						FIVE_CONSEC_SI: message.FIVE_CONSEC_SI + 1,
					});
				}
				break;
			case 'SIX_DK_IN_ROUND':
				// handle SIX_DK_IN_ROUND case
				break;
			case 'FIVE_CONSEC_SC':
				if (reset || message.FIVE_CONSEC_SC === 5) {
					resetFiveConsecutiveSureCorrect();
				} else {
					setMessage({
						...message,
						FIVE_CONSEC_SC: message.FIVE_CONSEC_SC + 1,
					});
				}
				break;
			default:
				// handle default case
				break;
		}
	};

	const value = useMemo(
		() => ({ message, handleMessage }),
		[message, handleMessage],
	);

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
export const useQuizContext = () => useContext(QuizContext);