import { Stack } from '@chakra-ui/react';
import AnswerFeedback from './MultiChoiceAnswerFeedback';
import { useEffect, useState } from 'react';
import { QuestionInFocus } from '../../../lib/validator';

export interface Answer {
	answerId: number | string;
	confidence: number;
	selectedOptionId: number;
	self: string;
}

const MultipleChoiceFeedBack = ({
	isInReviewView,
	questionInFocus,
	selectedAnswers,
	currentRoundAnswerOverLayData,
	inReview,
	revealAnswer,
}: {
	isInReviewView?: boolean;
	questionInFocus: QuestionInFocus;
	selectedAnswers: any[];
	setSelectedAnswers: any;
	clearSelection?: any;
	setClearSelection?: any;
	currentRoundAnswerOverLayData?: any;
	inReview?: boolean;
	revealAnswer?: boolean;
}) => {
	const [wasCorrectAnswerChosen, setWasCorrectAnswerChosen] = useState(false);
	useEffect(() => {
		if (isInReviewView) {
			setWasCorrectAnswerChosen(true);
		} else if (
			currentRoundAnswerOverLayData?.correctAnswerIds &&
			selectedAnswers
		) {
			setWasCorrectAnswerChosen(
				Boolean(
					selectedAnswers.find(
						(answer: any) =>
							answer.answerId ===
							currentRoundAnswerOverLayData?.correctAnswerIds[0],
					),
				),
			);
		}
	}, [currentRoundAnswerOverLayData, revealAnswer]);
	return (
		<Stack minHeight={350} h="100%" marginTop={8}>
			{questionInFocus?.answerList?.slice(0, 10).map((answer) => {
				return (
					<AnswerFeedback
						isInReviewView={isInReviewView}
						key={answer.id}
						questionText={answer.answerRc}
						questionAnswerId={answer.id}
						selectedAnswers={selectedAnswers}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						wasCorrectAnswerChosen={wasCorrectAnswerChosen}
						inReview={inReview}
						revealAnswer={revealAnswer}
					/>
				);
			})}
			<AnswerFeedback
				questionText={"I don't know yet"}
				questionAnswerId={''}
				selectedAnswers={selectedAnswers}
				IDK={true}
				currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
				wasCorrectAnswerChosen={wasCorrectAnswerChosen}
				inReview={inReview}
				revealAnswer={revealAnswer}
			/>
		</Stack>
	);
};

export default MultipleChoiceFeedBack;
