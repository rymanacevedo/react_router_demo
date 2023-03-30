import React, { createContext } from 'react';

const QuizContext = createContext({
    message: {
		FIVE_FAST_ANSWERS: 0,
		FIVE_CONSEC_SI: 0,
		SIX_DK_IN_ROUND: 0,
		FIVE_CONSEC_SC: 0
	},
    handleMessage: (message: string) => {},
})

export default QuizContext;