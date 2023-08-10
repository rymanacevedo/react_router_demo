import { Stack } from '@chakra-ui/react';
import MultipleChoiceInput from './MultipleChoiceInput';
import { Answer, QuestionInFocus } from '../../../lib/validator';
import { useTranslation } from 'react-i18next';

const MultipleChoiceAnswers = ({
	questionInFocus,
	selectedAnswers,
	setSelectedAnswers,
	clearSelection,
	setClearSelection,
	setIDKResponse,
}: {
	questionInFocus: QuestionInFocus;
	selectedAnswers: Answer[];
	setSelectedAnswers: (
		value: Answer[] | ((prevState: Answer[]) => Answer[]),
	) => void;
	clearSelection: boolean;
	setClearSelection: (
		value: ((prevState: boolean) => boolean) | boolean,
	) => void;
	setIDKResponse: (Arg0: boolean) => void;
	IDKResponse: boolean;
}) => {
	const { t: i18n } = useTranslation();
	const addAnswer = (answer: Answer) => {
		if (answer.answerId) {
			setSelectedAnswers((prevAnswers: Answer[]) => {
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
		<Stack minHeight={350} h="100%" marginTop={8}>
			{questionInFocus?.answerList?.slice(0, 10).map((answer) => {
				return (
					<MultipleChoiceInput
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
			<MultipleChoiceInput
				questionText={i18n('iDontKnowYet')}
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
		</Stack>
	);
};

export default MultipleChoiceAnswers;
