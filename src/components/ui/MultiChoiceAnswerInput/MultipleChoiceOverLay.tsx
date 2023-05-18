import { Box, Heading } from '@chakra-ui/react';
import AnswerFeedback from './MultiChoiceAnswerFeedback';
import { useEffect, useState } from 'react';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';

export interface Answer {
	answerId: number | string;
	confidence: number;
	selectedOptionId: number;
	self: string;
}

const MultipleChoiceOverLay = ({
	questionInFocus,
	selectedAnswers,
	currentRoundAnswerOverLayData,
	inReview,
	revealAnswer,
}: {
	questionInFocus: QuestionInFocus;
	selectedAnswers: any[];
	setSelectedAnswers: any;
	clearSelection: any;
	setClearSelection: any;
	currentRoundAnswerOverLayData?: any;
	inReview?: boolean;
	revealAnswer?: boolean;
}) => {
	const [wasCorrectAnswerChosen, setWasCorrectAnswerChosen] = useState(false);
	useEffect(() => {
		if (currentRoundAnswerOverLayData?.correctAnswerIds && selectedAnswers) {
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
		<Box>
			<Heading as="h3">Answer</Heading>
			<Box
				marginTop="34px"
				display="flex"
				flexDirection={'column'}
				minHeight={350}
				h="100%">
				<>
					{questionInFocus?.answerList
						?.slice(0, 10)
						.map((answer: { answerRc: string; id: string | number }) => {
							return (
								<AnswerFeedback
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
						/* eslint-disable */
						questionText={"I don't know yet"}
						/* eslint-enable */
						questionAnswerId={''}
						selectedAnswers={selectedAnswers}
						IDK={true}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						wasCorrectAnswerChosen={wasCorrectAnswerChosen}
						inReview={inReview}
						revealAnswer={revealAnswer}
					/>
				</>
			</Box>
		</Box>
	);
};

export default MultipleChoiceOverLay;
