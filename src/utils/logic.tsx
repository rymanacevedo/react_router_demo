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
	Item,
	LearningUnitQuestion,
	QuizMessage,
	TransformedQuestion,
} from '../components/pages/AssignmentView/AssignmentTypes';
import CustomCircle from '../css/CustomCircle';
import NumberCircle from '../css/NumberCircle';
import { RootData, RoundData, QuestionInFocus } from '../lib/validator';

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

export const getIcons = (
	answerHistory: AnswerHistory[],
	isExpanded: boolean,
) => {
	const final: JSX.Element[] = [];

	if (!isExpanded) {
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
								<CustomCircle
									color="#F8D7D3"
									icon={Cross2Icon}
									index={2}
									iconColor={'#912E21'}
									borderColor={'#912E21'}
								/>,
							);
						} else {
							final.push(
								<CustomCircle
									color="#DAE6DA"
									icon={CheckIcon}
									index={3}
									iconColor={'#468446'}
									borderColor={'#468446'}
								/>,
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
							// TODO: add to chakra-ui theme file for color scheme
							final.push(
								<CustomCircle
									color="#FDF8EC"
									borderColor={'#C29838'}
									iconColor={'#C29838'}
									icon={MinusIcon}
									index={5}
								/>,
							);
						}
						break;
				}
			}
		});
	} else {
		answerHistory.forEach((answer) => {
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
							<CustomCircle
								color="#F8D7D3"
								icon={Cross2Icon}
								index={2}
								iconColor={'#912E21'}
								borderColor={'#912E21'}
							/>,
						);
					} else {
						final.push(
							<CustomCircle
								color="#DAE6DA"
								icon={CheckIcon}
								index={3}
								iconColor={'#468446'}
								borderColor={'#468446'}
							/>,
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
							<CustomCircle
								color="#FDF8EC"
								borderColor={'#C29838'}
								iconColor={'#C29838'}
								icon={MinusIcon}
								index={5}
							/>,
						);
					}
					break;
			}
		});
	}

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

export const convertSecondsToTime = (timerSeconds: number): string => {
	const hours = Math.floor(timerSeconds / 3600);
	const minutes = Math.floor((timerSeconds - hours * 3600) / 60);
	const convertedSeconds = timerSeconds - hours * 3600 - minutes * 60;

	return `${hours.toString().padStart(2, '0')}:${minutes
		.toString()
		.padStart(2, '0')}:${convertedSeconds.toString().padStart(2, '0')}`;
};

export const transformQuestion = (
	question: LearningUnitQuestion,
	answerHistoryArray: Item[] | null,
): TransformedQuestion => {
	const uuid = question.uid;
	const target = answerHistoryArray?.find((item) =>
		item.publishedQuestionUri.includes(uuid),
	);
	if (target) {
		return {
			...question,
			answerHistory: target.answerHistory,
		};
	}
	return {
		...question,
		answerHistory: [],
	};
};

export const formatTime = (minutes: number) => {
	if (minutes < 60) {
		return `${minutes}m`;
	}

	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	if (remainingMinutes === 0) {
		return `${hours}hr`;
	}

	return `${hours}hr ${remainingMinutes}m`;
};

export const roundNumber = (number: number): string => {
	if (Number.isInteger(number)) {
		return String(number);
	} else {
		return number.toFixed(1);
	}
};

export const estimatedTimeRemaining = (
	time: number | undefined,
	hoursTranslation: string,
	hourTranslation: string,
	minutesTranslation: string,
	minuteTranslation: string,
) => {
	let hour = 0;
	let min = 0;

	if (time == null || time <= 0) {
		return '';
	}

	if (time >= 3600) {
		hour = Math.floor(time / 3600); // Use Math.floor to get the whole number of hours
		min = Math.ceil((time % 3600) / 60);
		const hourText = hour > 1 ? hoursTranslation : hourTranslation;
		const minText = min > 1 ? minutesTranslation : minuteTranslation;
		return `${hour} ${hourText} ${min} ${minText}`;
	} else {
		min = Math.ceil(time / 60);
		const minText = min > 1 ? minutesTranslation : minuteTranslation;
		return `${min} ${minText}`;
	}
};

export const formatTimestamp = (timestamp: number): string => {
	const date = new Date(timestamp);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return date.toLocaleDateString('en-US', options);
};

export const calculateLearningTimeLeft = (data: RootData) => {
	let totalTime = 0;

	data.displayCurriculum.children.forEach((module) => {
		module.assignments?.forEach((assignment) => {
			if (assignment.assignmentType === 'Learning') {
				totalTime += assignment.estimatedTimeToComplete;
			}
		});
	});

	return totalTime;
};

export const computeTime = (estimatedTimeToComplete: number) => {
	return Math.floor(estimatedTimeToComplete / 60) >= 1
		? Math.floor(estimatedTimeToComplete / 60)
		: '1';
};

export const computeTimeString = (
	estimatedTimeToComplete: number,
	minutesTranslation: string,
	minuteTranslation: string,
) => {
	return Math.floor(estimatedTimeToComplete / 60) > 1
		? minutesTranslation
		: minuteTranslation;
};

export type QuestionStatus = {
	key: string;
	question: string;
	status: boolean;
	flagged: boolean;
};

export const createQuestionArray = (data: RoundData): QuestionStatus[] => {
	return data.questionList.map(
		(question: QuestionInFocus, index: number): QuestionStatus => {
			return {
				key: String(index + 1),
				question: String(index + 1),
				status: question.answered,
				flagged: question.flagged,
			};
		},
	);
};
