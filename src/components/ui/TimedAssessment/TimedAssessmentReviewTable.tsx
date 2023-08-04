import React from 'react';
import { Table } from 'antd';
import { Box, Icon } from '@chakra-ui/react';
import { createQuestionArray, QuestionStatus } from '../../../utils/logic';
import { RoundData } from '../../../lib/validator';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';

type TimedAssessmentReviewTablePropsType = {
	roundData: RoundData;
};

const TimedAssessmentReviewTable = ({
	roundData,
}: TimedAssessmentReviewTablePropsType) => {
	const columns = [
		{
			title: '  Question',
			dataIndex: 'question',
			key: 'question',
			sorter: (a: QuestionStatus, b: QuestionStatus) =>
				a.question.localeCompare(b.question),
			render: (text: string) => <Box paddingLeft={4}>{text}</Box>,
		},
		{
			title: 'Status',
			dataIndex: 'answered',
			key: 'status',
			sorter: (a: QuestionStatus, b: QuestionStatus) =>
				a.status === b.status ? 0 : a.status ? 1 : -1,
			render: (answered: boolean) => (answered ? 'Answered' : 'Not Answered'),
		},
		{
			title: 'Flagged',
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
