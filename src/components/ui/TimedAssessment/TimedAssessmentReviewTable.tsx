import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { QuestionInFocus, RoundData } from '../../../lib/validator';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { AmpTable } from '../../../css/theme';
import { useOutletContext } from 'react-router';
import { OutletContext } from '../../../routes/TimedAssessment';

type TimedAssessmentReviewTablePropsType = {
	roundData: RoundData;
};

type QuestionStatus = {
	key: string;
	question: string;
	status: boolean;
	flagged: boolean;
};

export type Columns = {
	title: string;
	dataIndex: string;
	key: string;
	sorter?: (a: QuestionStatus, b: QuestionStatus) => number;
	render?: (value: string | boolean) => React.ReactElement | null;
};

const TimedAssessmentReviewTable = ({
	roundData,
}: TimedAssessmentReviewTablePropsType) => {
	const context = useOutletContext<OutletContext>();
	const { flaggedQuestions, answeredQuestions } = context;

	const { t: i18n } = useTranslation();
	const columns = [
		{
			title: i18n('question'),
			dataIndex: 'question',
			key: 'question',
			sorter: (a: QuestionStatus, b: QuestionStatus) =>
				a.question.localeCompare(b.question),
			render: (text: string) => <Box paddingLeft={4}>{text}</Box>,
		},
		{
			title: i18n('status'),
			dataIndex: 'status',
			key: 'status',
			sorter: (a: QuestionStatus, b: QuestionStatus) =>
				a.status === b.status ? 0 : a.status ? 1 : -1,
			render: (answered: boolean) =>
				answered ? i18n('answered') : i18n('notAnswered'),
		},
		{
			title: i18n('flagged'),
			dataIndex: 'flagged',
			key: 'flagged',
			sorter: (a: QuestionStatus, b: QuestionStatus) =>
				a.flagged === b.flagged ? 0 : a.flagged ? 1 : -1,
			render: (flagged: boolean) =>
				flagged ? (
					<Icon as={BookmarkFilledIcon} w={6} h={6} color="ampSecondary.500" />
				) : null,
		},
	];

	const dataSource = roundData.questionList.map(
		(question: QuestionInFocus, index: number): QuestionStatus => {
			return {
				key: String(index + 1),
				question: String(index + 1),
				status: answeredQuestions?.has(question.publishedQuestionAuthoringKey),
				flagged: flaggedQuestions.has(question.publishedQuestionAuthoringKey),
			};
		},
	);

	return (
		<>
			<Box width={600} marginTop={10}>
				<AmpTable
					columns={columns}
					dataSource={dataSource}
					pagination={false}
				/>
			</Box>
		</>
	);
};

export default TimedAssessmentReviewTable;
