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
	const addAnswer = (answer: SelectedAnswer) => {
		if (answer.answerId) {
			setSelectedAnswers((prevAnswers: any[]) => {
				let currentAnswer = prevAnswers.find((a) => a.confidence === 100);
				if (answer.confidence === 100) {
					return [answer];
				} else if (!answer.confidence) {
					return prevAnswers.filter((a) => a.answerId !== answer.answerId);
				} else if (
					currentAnswer?.confidence === 100 &&
					answer.confidence === 50
				) {
					let updatedAnswers = prevAnswers.map((a) => {
						return { ...a, confidence: 50 };
					});
					return [...updatedAnswers, answer];
				} else {
					const updatedAnswers = prevAnswers.filter(
						(a) => a.answerId !== answer.answerId,
					);
					if (updatedAnswers.length >= 2) {
						updatedAnswers.shift();
					}
					return [...updatedAnswers, answer];
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
					{questionInFocus?.answerList?.slice(0, 10).map((answer) => {
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
						questionText={"I don't know yet"}
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
