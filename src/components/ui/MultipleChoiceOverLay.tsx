import { Box, Heading, Divider } from '@chakra-ui/react';
import AnswerOverLay from './AnswerInput/AnswerOverLay';
import { useEffect, useState } from 'react';

export interface Answer {
	answerId: number | string;
	confidence: number;
	selectedOptionId: number;
	self: any;
}

const MultipleChoiceOverLay = ({
	questionInFocus,
	selectedAnswers,
	currentRoundAnswerOverLayData,
	inReview,
}: {
	questionInFocus:
		| {
				id: string | any;
				questionRc: any;
				name?: string | undefined;
				introductionRc?: any;
				answerList: {
					answerRc: string;
					id: string | number;
				}[];
		  }
		| undefined;
	selectedAnswers: any[];
	setSelectedAnswers: any;
	clearSelection: any;
	setClearSelection: any;
	currentRoundAnswerOverLayData?: any;
	inReview?: boolean;
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
	}, [currentRoundAnswerOverLayData]);
	return (
		<Box>
			<Heading as="h2">{'Answer'}</Heading>
			<Box
				marginTop="34px"
				display="flex"
				flexDirection={'column'}
				justifyContent="space-between"
				h="100%">
				<>
					{questionInFocus?.answerList
						?.slice(0, 10)
						.map((answer: { answerRc: string; id: string | number }) => {
							return (
								<AnswerOverLay
									key={answer.id}
									questionText={answer.answerRc}
									questionAnswerId={answer.id}
									selectedAnswers={selectedAnswers}
									currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
									wasCorrectAnswerChosen={wasCorrectAnswerChosen}
									inReview={inReview}
								/>
							);
						})}
					<AnswerOverLay
						/* eslint-disable */
						questionText={"I don't know yet"}
						/* eslint-enable */
						questionAnswerId={''}
						selectedAnswers={selectedAnswers}
						IDK={true}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
						wasCorrectAnswerChosen={wasCorrectAnswerChosen}
						inReview={inReview}
					/>
				</>
			</Box>
			<Divider marginTop="43px" />
		</Box>
	);
};

export default MultipleChoiceOverLay;
