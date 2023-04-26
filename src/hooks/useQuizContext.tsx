import {
	createContext,
	useContext,
	useMemo,
	useState,
	useCallback,
} from 'react';

type QuizContextType = {
	message: {
		FIVE_FAST_ANSWERS: number;
		FIVE_CONSEC_SI: number;
		SIX_DK_IN_ROUND: number;
		FIVE_CONSEC_SC: number;
		FULL_ROUND_OF_SC: number;
		FIVE_FAST_REVIEWS: number;
		TWO_FAST_REVIEWS_IN_LU: {
			questionId: number;
			fastReviewsOnQuestion: number;
		}[];
		TEN_LONG_REVIEWS: number;
		TWO_IDENTICAL_SI: { questionId: number; siCount: number }[];
		TWO_NPA_IN_ROUND: {
			questionId: number;
			npaCount: number;
			seenCount: number;
			roundNumber: number;
		}[];
	};
	handleMessage: (
		messageType: string,
		reset: boolean,
		questionId?: number,
		roundNumber?: number,
	) => void;
	selectedCourseKey: string;
	setSelectedCourseKey: (selectedCourseKey: string) => void;
	incrimentTwoFastReviewsInLu: () => void;
};

const QuizContext = createContext<QuizContextType>({
	message: {
		FIVE_FAST_ANSWERS: 0,
		FIVE_CONSEC_SI: 0,
		SIX_DK_IN_ROUND: 0,
		FIVE_CONSEC_SC: 0,
		FULL_ROUND_OF_SC: 0,
		FIVE_FAST_REVIEWS: 0,
		TWO_FAST_REVIEWS_IN_LU: [{ questionId: 0, fastReviewsOnQuestion: 0 }],
		TEN_LONG_REVIEWS: 0,
		TWO_IDENTICAL_SI: [],
		TWO_NPA_IN_ROUND: [],
	},
	handleMessage: () => {},
	selectedCourseKey: '',
	setSelectedCourseKey: () => {},
	incrimentTwoFastReviewsInLu: () => {},
});

export const QuizProvider = ({ children }: { children: any }) => {
	const [message, setMessage] = useState<QuizContextType['message']>({
		FIVE_FAST_ANSWERS: 0,
		FIVE_CONSEC_SI: 0,
		SIX_DK_IN_ROUND: 0,
		FIVE_CONSEC_SC: 0,
		FULL_ROUND_OF_SC: 0,
		FIVE_FAST_REVIEWS: 0,
		TWO_FAST_REVIEWS_IN_LU: [{ questionId: 0, fastReviewsOnQuestion: 0 }],
		TEN_LONG_REVIEWS: 0,
		TWO_NPA_IN_ROUND: [],
		TWO_IDENTICAL_SI: [],
	});

	const [selectedCourseKey, setSelectedCourseKey] = useState('');

	const incrimentTwoFastReviewsInLu = () => {
		//take the TWO_FAST_REVIEWS_IN_LU array and for each questionId, incriment the fastReviewsOnQuestion by 1
		//then update the state with the new array
		const updatedTwoFastReviewsInLu = message.TWO_FAST_REVIEWS_IN_LU.map(
			(question) => {
				return {
					...question,
					fastReviewsOnQuestion: question.fastReviewsOnQuestion + 1,
				};
			},
		);

		setMessage((prevMessage) => ({
			...prevMessage,
			TWO_FAST_REVIEWS_IN_LU: updatedTwoFastReviewsInLu,
		}));
	};

	const handleMessage = useCallback(
		(
			messageType: string,
			reset: boolean,
			questionId?: number,
			roundNumber?: number,
		) => {
			const resetFiveFastAnswers = () => {
				setMessage((prevMessage) => ({
					...prevMessage,
					FIVE_FAST_ANSWERS: 0,
				}));
			};

			const resetFiveConsecutiveSureCorrect = () => {
				setMessage((prevMessage) => ({
					...prevMessage,
					FIVE_CONSEC_SC: 0,
				}));
			};

			const resetFiveConsecutiveSureIncorrect = () => {
				setMessage((prevMessage) => ({
					...prevMessage,
					FIVE_CONSEC_SI: 0,
				}));
			};

			const resetSixDontKnowInRound = () => {
				setMessage((prevMessage) => ({
					...prevMessage,
					SIX_DK_IN_ROUND: 0,
				}));
			};

			const resetFullRoundOfSureCorrect = () => {
				setMessage((prevMessage) => ({
					...prevMessage,
					FULL_ROUND_OF_SC: 0,
				}));
			};

			const resetFiveFastReviews = () => {
				setMessage((prevMessage) => ({
					...prevMessage,
					FIVE_FAST_REVIEWS: 0,
				}));
			};

			const resetTenLongReviews = () => {
				setMessage({
					...message,
					TEN_LONG_REVIEWS: 0,
				});
			};

			const resetTwoFastReviewsInLu = () => {
				const updatedTwoFastReviewsInLu = message.TWO_FAST_REVIEWS_IN_LU.filter(
					(question) => {
						console.log('@@@@@@@@@@@@', question, questionId);
						return question.questionId !== questionId;
					},
				);
				console.log(
					'delete',
					message.TWO_FAST_REVIEWS_IN_LU,
					updatedTwoFastReviewsInLu,
				);

				setMessage((prevMessage) => ({
					...prevMessage,
					TWO_FAST_REVIEWS_IN_LU: updatedTwoFastReviewsInLu,
				}));
			};

			const resetTwoIdenticalSureIncorrects = () => {
				const updatedTwoIdenticalSureIncorrects =
					message.TWO_IDENTICAL_SI.filter(
						(question) => question.questionId !== questionId,
					);

				setMessage((prevMessage) => ({
					...prevMessage,
					TWO_IDENTICAL_SI: updatedTwoIdenticalSureIncorrects,
				}));
			};

			const resetTwoNpaInRound = () => {
				const updatedTwoNPAInRound = message.TWO_NPA_IN_ROUND.filter(
					(question) => question.questionId !== questionId,
				);
				setMessage((prevMessage) => ({
					...prevMessage,
					TWO_NPA_IN_ROUND: updatedTwoNPAInRound,
				}));
			};

			switch (messageType) {
				case 'FIVE_FAST_ANSWERS':
					if (reset || message.FIVE_FAST_ANSWERS === 5) {
						resetFiveFastAnswers();
					} else {
						setMessage((prevMessage) => ({
							...prevMessage,
							FIVE_FAST_ANSWERS: prevMessage.FIVE_FAST_ANSWERS + 1,
						}));
					}
					break;
				case 'FIVE_CONSEC_SI':
					if (reset || message.FIVE_CONSEC_SI === 5) {
						resetFiveConsecutiveSureIncorrect();
					} else {
						setMessage((prevMessage) => ({
							...prevMessage,
							FIVE_CONSEC_SI: prevMessage.FIVE_CONSEC_SI + 1,
						}));
					}
					break;
				case 'SIX_DK_IN_ROUND':
					if (reset || message.SIX_DK_IN_ROUND === 6) {
						resetSixDontKnowInRound();
					} else {
						setMessage((prevMessage) => ({
							...prevMessage,
							SIX_DK_IN_ROUND: prevMessage.SIX_DK_IN_ROUND + 1,
						}));
					}
					break;
				case 'FIVE_CONSEC_SC':
					if (reset || message.FIVE_CONSEC_SC === 5) {
						resetFiveConsecutiveSureCorrect();
					} else {
						setMessage((prevMessage) => ({
							...prevMessage,
							FIVE_CONSEC_SC: prevMessage.FIVE_CONSEC_SC + 1,
						}));
					}
					break;
				case 'FULL_ROUND_OF_SC':
					if (reset) {
						resetFullRoundOfSureCorrect();
					} else {
						setMessage((prevMessage) => ({
							...prevMessage,
							FULL_ROUND_OF_SC: prevMessage.FULL_ROUND_OF_SC + 1,
						}));
					}
					break;
				case 'BOTH_SC':
					setMessage((prevMessage) => ({
						...prevMessage,
						FULL_ROUND_OF_SC: prevMessage.FULL_ROUND_OF_SC + 1,
						FIVE_CONSEC_SC: prevMessage.FIVE_CONSEC_SC + 1,
					}));
					break;
				case 'FIVE_FAST_REVIEWS':
					if (reset || message.FIVE_FAST_REVIEWS === 5) {
						resetFiveFastReviews();
					} else {
						setMessage((prevMessage) => ({
							...prevMessage,
							FIVE_FAST_REVIEWS: prevMessage.FIVE_FAST_REVIEWS + 1,
						}));
					}
					break;
				case 'TWO_FAST_REVIEWS_IN_LU':
					if (reset) {
						resetTwoFastReviewsInLu();
					} else if (questionId) {
						const isQuestionInArray = message.TWO_FAST_REVIEWS_IN_LU.some(
							(question) => question.questionId === questionId,
						);
						if (isQuestionInArray) {
							setMessage((prevMessage) => ({
								...prevMessage,
								TWO_FAST_REVIEWS_IN_LU: prevMessage.TWO_FAST_REVIEWS_IN_LU.map(
									(question) => {
										if (question.questionId === questionId) {
											return {
												...question,
												fastReviewsOnQuestion:
													question.fastReviewsOnQuestion + 1,
											};
										}
										return question;
									},
								),
							}));
						} else {
							setMessage((prevMessage) => ({
								...prevMessage,
								TWO_FAST_REVIEWS_IN_LU: [
									...prevMessage.TWO_FAST_REVIEWS_IN_LU,
									{ questionId: Number(questionId), fastReviewsOnQuestion: 0 },
								],
							}));
						}
					}
					break;
				case 'TEN_LONG_REVIEWS':
					if (reset || message.TEN_LONG_REVIEWS === 10) {
						resetTenLongReviews();
					} else {
						setMessage((prevMessage) => ({
							...prevMessage,
							TEN_LONG_REVIEWS: prevMessage.TEN_LONG_REVIEWS + 1,
						}));
					}
					break;
				case 'TWO_IDENTICAL_SI':
					if (reset && questionId) {
						resetTwoIdenticalSureIncorrects();
					} else if (questionId) {
						const index = message.TWO_IDENTICAL_SI.findIndex(
							(obj) => obj.questionId === questionId,
						);

						const newSiEntry = [
							...message.TWO_IDENTICAL_SI,
							{ questionId: Number(questionId), siCount: 1 },
						];

						if (index === -1) {
							setMessage((prevMessage) => ({
								...prevMessage,
								TWO_IDENTICAL_SI: newSiEntry,
							}));
						} else {
							const updatedSiArray = [...message.TWO_IDENTICAL_SI];
							updatedSiArray[index] = {
								...updatedSiArray[index],
								siCount: updatedSiArray[index].siCount + 1,
							};
							setMessage((prevMessage) => ({
								...prevMessage,
								TWO_IDENTICAL_SI: updatedSiArray,
							}));
						}
					}
					break;

				case 'TWO_NPA_IN_ROUND':
					if (reset && questionId) {
						resetTwoNpaInRound();
					} else if (questionId && roundNumber) {
						const index = message.TWO_NPA_IN_ROUND.findIndex(
							(obj) => obj.questionId === questionId,
						);

						const newTwoNpaEntry = [
							...message.TWO_NPA_IN_ROUND,
							{
								questionId: Number(questionId),
								seenCount: 1,
								npaCount: 0,
								roundNumber,
							},
						];

						if (index === -1) {
							setMessage((prevMessage) => ({
								...prevMessage,
								TWO_NPA_IN_ROUND: newTwoNpaEntry,
							}));
						} else {
							const updatedTwoNpaArray = [...message.TWO_NPA_IN_ROUND];
							const npaCountIncrement =
								updatedTwoNpaArray[index].roundNumber === roundNumber ? 1 : 0;
							updatedTwoNpaArray[index] = {
								...updatedTwoNpaArray[index],
								seenCount: updatedTwoNpaArray[index].seenCount + 1,
								npaCount:
									updatedTwoNpaArray[index].npaCount + npaCountIncrement,
								roundNumber,
							};
							setMessage((prevMessage) => ({
								...prevMessage,
								TWO_NPA_IN_ROUND: updatedTwoNpaArray,
							}));
						}
					}
					break;
				default:
					// handle default case
					break;
			}
		},
		[message],
	);

	const value = useMemo(
		() => ({
			message,
			handleMessage,
			selectedCourseKey,
			setSelectedCourseKey,
			incrimentTwoFastReviewsInLu,
		}),
		[
			message,
			handleMessage,
			selectedCourseKey,
			setSelectedCourseKey,
			incrimentTwoFastReviewsInLu,
		],
	);

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
export const useQuizContext = () => useContext(QuizContext);
