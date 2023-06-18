import { Box, Heading } from '@chakra-ui/react';
import AnswerFeedback from './MultiSelectAnswerFeedback';
import { useEffect, useState } from 'react';
import { QuestionInFocus } from '../../pages/AssignmentView/AssignmentTypes';
import { useTranslation } from 'react-i18next';

export interface Answer {
	answerId: number | string;
	confidence: number;
	selectedOptionId: number;
	self: string;
}

const MultiSelectFeedback = ({
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
	const { t: i18n } = useTranslation();
	const [wasCorrectAnswerChosen, setWasCorrectAnswerChosen] = useState(false);
	const [wasPartialCorrectAnswerChosen, setWasPartialCorrectAnswerChosen] =
		useState(false);

	useEffect(() => {
		if (currentRoundAnswerOverLayData?.correctAnswerIds && selectedAnswers) {
			const correctAnswerIds = currentRoundAnswerOverLayData?.correctAnswerIds;
			const selectedAnswerIds = selectedAnswers.map(
				(answer) => answer.answerId,
			);
			const allCorrectAnswersChosen = correctAnswerIds.every((id: any) =>
				selectedAnswerIds.includes(id),
			);
			setWasCorrectAnswerChosen(
				allCorrectAnswersChosen &&
					correctAnswerIds.length === selectedAnswerIds.length,
			);

			const partialCorrectAnswerChosen =
				correctAnswerIds.some((id: any) => selectedAnswerIds.includes(id)) &&
				!allCorrectAnswersChosen;
			setWasPartialCorrectAnswerChosen(partialCorrectAnswerChosen);
		}
	}, [currentRoundAnswerOverLayData, revealAnswer]);
	return (
		<Box>
			<Heading as="h3">{i18n('selectAllthatApply')}</Heading>
			<Box
				marginTop="34px"
				display="flex"
				flexDirection={'column'}
				justifyContent="space-between"
				minHeight={350}
				h="100%">
				<>
					{questionInFocus?.answerList
						?.slice(0, 10)
						.map((answer: { answerRc: string; id: string | number }) => {
							return (
								<AnswerFeedback
									questionInFocus={questionInFocus}
									key={answer.id}
									questionText={answer.answerRc}
									questionAnswerId={answer.id}
									selectedAnswers={selectedAnswers}
									currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
									wasCorrectAnswerChosen={wasCorrectAnswerChosen}
									wasPartialCorrectAnswerChosen={wasPartialCorrectAnswerChosen}
									inReview={inReview}
									revealAnswer={revealAnswer}
								/>
							);
						})}
					{selectedAnswers.length === 0 && (
						<AnswerFeedback
							questionText={''}
							questionAnswerId={''}
							selectedAnswers={selectedAnswers}
							IDK={true}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
							wasCorrectAnswerChosen={wasCorrectAnswerChosen}
							inReview={inReview}
							revealAnswer={revealAnswer}
						/>
					)}
				</>
			</Box>
		</Box>
	);
};

export default MultiSelectFeedback;
