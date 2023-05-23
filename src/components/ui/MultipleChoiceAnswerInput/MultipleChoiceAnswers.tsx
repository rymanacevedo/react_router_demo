import { Box, Heading } from '@chakra-ui/react';
import {
	QuestionInFocus,
	SelectedAnswer,
} from '../../pages/AssignmentView/AssignmentTypes';
import MultiChoiceAnswerInput from './MultiChoiceAnswerInput';

export interface Answer {
	answerId: number | string;
	confidence: number;
	selectedOptionId: number;
	self: string;
}

const MultipleChoiceAnswers = ({
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
	clearSelection,
	setClearSelection,
	setIDKResponse,
}: {
	questionInFocus: QuestionInFocus;
	selectedAnswers: any;
	setSelectedAnswers: any;
	clearSelection: any;
	setClearSelection: any;
	setIDKResponse: (Arg0: boolean) => void;
	IDKResponse: boolean;
}) => {
	const addAnswer = (answerObject: SelectedAnswer) => {
		if (answerObject.answerId) {
			setSelectedAnswers((prevAnswers: any[]) => {
				let currentAnswer = prevAnswers.find(
					(answer) => answer.confidence === 100,
				);
				if (answerObject.confidence === 100) {
					return [answerObject];
				} else if (!answerObject.confidence) {
					return prevAnswers.filter(
						(answer) => answer.answerId !== answerObject.answerId,
					);
				} else if (
					currentAnswer?.confidence === 100 &&
					answerObject.confidence === 50
				) {
					let updatedAnswers = prevAnswers.map((answer) => {
						return { ...answer, confidence: 50 };
					});
					return [...updatedAnswers, answerObject];
				} else {
					const updatedAnswers = prevAnswers.filter(
						(answer) => answer.answerId !== answerObject.answerId,
					);
					if (updatedAnswers.length >= 2) {
						updatedAnswers.shift();
					}
					return [...updatedAnswers, answerObject];
				}
			});
			setIDKResponse(false);
		}
	};

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
								<MultiChoiceAnswerInput
									key={answer.id}
									questionText={answer.answerRc}
									questionAnswerId={answer.id}
									addAnswer={addAnswer}
									selectedAnswers={selectedAnswers}
									IDK={false}
									setIDKResponse={setIDKResponse}
								/>
							);
						})}
					<MultiChoiceAnswerInput
						/* eslint-disable */
						questionText={"I don't know yet"}
						/* eslint-enable */
						questionAnswerId={''}
						addAnswer={() => {
							setSelectedAnswers([]);
						}}
						selectedAnswers={selectedAnswers}
						IDK={true}
						clearSelection={clearSelection}
						setClearSelection={setClearSelection}
						setIDKResponse={setIDKResponse}
					/>
				</>
			</Box>
		</Box>
	);
};

export default MultipleChoiceAnswers;
