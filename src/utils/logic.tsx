import {
	CheckIcon,
	Cross2Icon,
	MinusIcon,
	QuestionMarkIcon,
} from '@radix-ui/react-icons';
import {
	AnswerHistory,
	Confidence,
	Correctness,
	LearningUnitQuestion,
	QuizMessage,
} from '../components/pages/AssignmentView/AssignmentTypes';
import CustomCircle from '../css/CustomCircle';
import NumberCircle from '../css/NumberCircle';

export const findDateData = () => {
	const now = new Date();
	const offset = now.getTimezoneOffset() * -1;
	const offsetHours = Math.floor(offset / 60);
	const offsetMinutes = offset % 60;
	const offsetString = ` ${offset >= 0 ? '+' : '-'}${Math.abs(offsetHours)
		.toString()
		.padStart(2, '0')}${offsetMinutes.toString().padStart(2, '0')}`;
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const day = now.getDate().toString().padStart(2, '0');
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0');
	const seconds = now.getSeconds().toString().padStart(2, '0');

	const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetString}`;
	return dateString;
};

export const getIcons = (answerHistory: AnswerHistory[]) => {
	const final: JSX.Element[] = [];
	const numCircle = (
		<NumberCircle number={(answerHistory.length - 6).toString()} />
	);

	if (answerHistory.length > 6) {
		final.push(numCircle);
	}

	answerHistory.forEach((answer, index) => {
		if (index < 6) {
			switch (answer.confidence) {
				case Confidence.Sure:
					if (answer.correctness === Correctness.Correct) {
						final.push(
							<CustomCircle
								color="ampSuccess.500"
								icon={CheckIcon}
								index={0}
							/>,
						);
					} else {
						final.push(
							<CustomCircle color="#912E21" icon={Cross2Icon} index={1} />,
						);
					}
					break;
				case Confidence.OneAnswerPartSure:
					if (answer.correctness === Correctness.Incorrect) {
						final.push(
							<CustomCircle color="#F8D7D3" icon={Cross2Icon} index={2} />,
						);
					} else {
						final.push(
							<CustomCircle color="#DAE6DA" icon={CheckIcon} index={3} />,
						);
					}
					break;
				case Confidence.NotSure:
					if (answer.correctness === Correctness.NoAnswerSelected) {
						final.push(
							<CustomCircle
								color="#7F8285"
								icon={QuestionMarkIcon}
								index={4}
							/>,
						);
					} else {
						final.push(
							<CustomCircle color="#FDF8EC" icon={MinusIcon} index={5} />,
						);
					}
					break;
			}
		}
	});

	return final;
};

export const truncateText = (str: string) => {
	if (str.length > 100) {
		return str.slice(0, 100) + '...';
	}
	return str;
};

export const extractSrc = (questionRc: string): string | undefined => {
	const srcStartIndex: number = questionRc.indexOf('src="') + 5;
	const srcEndIndex: number = questionRc.indexOf('"', srcStartIndex);
	if (srcStartIndex >= 5 && srcEndIndex !== -1) {
		const src: string = questionRc.substring(srcStartIndex, srcEndIndex);
		return src;
	}
	return undefined;
};

export const createReviewQuestionsArray = (count: number) => {
	return Array.from({ length: count }, (_, index) => index);
};

export const sortReviewQuestions = (
	reviewQuestions: LearningUnitQuestion[],
	quizMessage: QuizMessage,
) => {
	const npaCounts = new Map();
	quizMessage.TWO_NPA_ON_LU.forEach(({ questionId, npaCount }) => {
		npaCounts.set(questionId, npaCount);
	});

	reviewQuestions.sort((a, b) => {
		const npaCountA = npaCounts.get(a.id) || 0;
		const npaCountB = npaCounts.get(b.id) || 0;

		if (npaCountA !== npaCountB) {
			return npaCountB - npaCountA; // Sort by npaCount in descending order
		}

		// If npaCounts are the same, sort by questionRc in ascending order
		const questionRcA = a.questionRc.toLowerCase();
		const questionRcB = b.questionRc.toLowerCase();

		return questionRcA.localeCompare(questionRcB);
	});

	return reviewQuestions;
};
