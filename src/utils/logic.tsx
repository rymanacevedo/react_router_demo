import { Circle } from '@chakra-ui/react';
import { CheckIcon, Cross2Icon, MinusIcon } from '@radix-ui/react-icons';
import {
	AnswerHistory,
	Confidence,
	Correctness,
	Item,
} from '../components/pages/AssignmentView/AssignmentTypes';
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

export const extractUUIDs = (data: Item[] | null): string[] => {
	if (!data) {
		return [];
	}

	return data.map((item) => {
		const regex = /questions\/(.+?)\//;
		const match = item.publishedQuestionUri.match(regex);
		if (match) {
			return match[1];
		} else {
			return '';
		}
	});
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
							<Circle
								key={index}
								size="24px"
								bg="ampSuccess.500"
								color="white"
								margin="2px">
								<CheckIcon />
							</Circle>,
						);
					} else {
						final.push(
							<Circle
								key={index}
								size="24px"
								bg="#912E21"
								border="2px solid #912E21"
								display="flex"
								alignItems="center"
								justifyContent="center"
								margin="2px">
								<Cross2Icon color="white" />
							</Circle>,
						);
					}
					break;
				case Confidence.OneAnswerPartSure:
					if (answer.correctness === Correctness.Incorrect) {
						final.push(
							<Circle
								key={index}
								size="24px"
								bg="#F8D7D3"
								border="2px solid #912E21"
								display="flex"
								alignItems="center"
								justifyContent="center"
								margin="2px">
								<Cross2Icon color="#912E21" />
							</Circle>,
						);
					} else {
						final.push(
							<Circle
								key={index}
								size="24px"
								bg="#DAE6DA"
								border="2px solid #468446"
								display="flex"
								alignItems="center"
								justifyContent="center"
								margin="2px">
								<CheckIcon color="#468446" />
							</Circle>,
						);
					}
					break;
				case Confidence.NotSure:
					final.push(
						<Circle
							key={index}
							size="24px"
							bg="#FDF8EC"
							border="2px solid #C29838"
							display="flex"
							alignItems="center"
							justifyContent="center"
							margin="2px">
							<MinusIcon color="#C29838" />
						</Circle>,
					);
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
