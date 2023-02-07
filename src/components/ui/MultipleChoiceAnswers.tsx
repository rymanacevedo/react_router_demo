import { useState } from 'react';
import { Box, Heading, Divider } from '@chakra-ui/react';
import AnswerInput from './AnswerInput/AnswerInput';
import { AnswerObject } from '../pages/AssignmentView';

interface Answer {
	answerId: number | string;
	confidence: number;
	selectedOptionId: number;
	self: any;
}

interface AnswerData {
	answerDate: string;
	answerList: Answer[];
	avatarMessage: any;
	completionAlgorithmType: any;
	completionPercentage: number;
	confidence: any;
	correctAnswerIds: any;
	correctness: any;
	informedCount: number;
	masteredQuestionCount: number;
	misinformedCount: number;
	moduleComplete: boolean;
	notSureCount: number;
	onceCorrectCount: number;
	questionSeconds: number;
	questionsMastered: number;
	reviewSeconds: number;
	self: any;
	totalQuestionCount: number;
	twiceCorrectCount: number;
	uninformedCount: number;
	unseenCount: number;
}

const MultipleChoiceAnswers = ({
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
	clearSelection,
	setClearSelection,
}: {
	questionInFocus: {
		questionRc: any;
		answers: { answerRc: string; id: number | string }[];
	};
	selectedAnswers: any;
	setSelectedAnswers: any;
	clearSelection: any;
	setClearSelection: any;
}) => {
	// will be needed for next story
/* eslint-disable */
	const [answerData, setAnswerData] = useState<AnswerData>({
		answerDate: '',
		answerList: [],
		avatarMessage: null,
		completionAlgorithmType: null,
		completionPercentage: 0,
		confidence: null,
		correctAnswerIds: null,
		correctness: null,
		informedCount: 0,
		masteredQuestionCount: 0,
		misinformedCount: 0,
		moduleComplete: false,
		notSureCount: 0,
		onceCorrectCount: 0,
		questionSeconds: 0,
		questionsMastered: 0,
		reviewSeconds: 0,
		self: null,
		totalQuestionCount: 0,
		twiceCorrectCount: 0,
		uninformedCount: 0,
		unseenCount: 0,
	});
	/* eslint-enable */

	const addAnswer = (answerObject: AnswerObject) => {
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
		}
	};

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
					{questionInFocus?.answers
						?.slice(0, 10)
						.map((answer: { answerRc: string; id: string | number }) => {
							return (
								<AnswerInput
									key={answer.id}
									questionText={answer.answerRc}
									questionAnswerId={answer.id}
									addAnswer={addAnswer}
									selectedAnswers={selectedAnswers}
									IDK={false}
								/>
							);
						})}
					<AnswerInput
						/* eslint-disable */
						questionText={'I don\'t know yet'}
						/* eslint-enable */
						questionAnswerId={''}
						addAnswer={() => {
							setSelectedAnswers([]);
						}}
						selectedAnswers={selectedAnswers}
						IDK={true}
						clearSelection={clearSelection}
						setClearSelection={setClearSelection}
					/>
				</>
			</Box>
			<Divider marginTop="43px" />
		</Box>
	);
};

export default MultipleChoiceAnswers;
