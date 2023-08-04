import React from 'react';
import { Table } from 'antd';
import { Box, Icon } from '@chakra-ui/react';
import { createQuestionArray, QuestionStatus } from '../../../utils/logic';
import { RoundData } from '../../../lib/validator';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

type TimedAssessmentReviewTablePropsType = {
	roundData: RoundData;
};

const TimedAssessmentReviewTable = ({
	roundData,
}: TimedAssessmentReviewTablePropsType) => {
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
			dataIndex: 'answered',
			key: 'status',
			sorter: (a: QuestionStatus, b: QuestionStatus) =>
				a.status === b.status ? 0 : a.status ? 1 : -1,
			render: (answered: boolean) => (answered ? 'Answered' : 'Not Answered'),
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
				) : (
					''
				),
		},
	];

	return (
		<Box width={600} marginTop={10}>
			<Table
				columns={columns}
				dataSource={createQuestionArray(roundData)}
				pagination={false}
				className="review-table"
			/>
		</Box>
	);
};

export default TimedAssessmentReviewTable;
