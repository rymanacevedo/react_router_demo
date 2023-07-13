import { Box, Heading, Stack } from '@chakra-ui/react';
import AnswerFeedback from './MultiChoiceAnswerFeedback';
import { useEffect, useState } from 'react';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';
import { useTranslation } from 'react-i18next';

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
	const { t: i18n } = useTranslation();
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
		<Box>
			<Heading as="h3">{i18n('answer')}</Heading>
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
		</Box>
	);
};

export default MultipleChoiceFeedBack;
