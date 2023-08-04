import React from 'react';
import { Table } from 'antd';
import { Box, Icon } from '@chakra-ui/react';
import { createQuestionArray } from '../../../utils/logic';
import { RoundData } from '../../../lib/validator';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import '../../../css/Table.css';

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
			render: (text: string) => <Box paddingLeft={4}>{text}</Box>,
		},
		{
			title: i18n('status'),
			dataIndex: 'answered',
			key: 'status',
			render: (answered: boolean) =>
				answered ? i18n('answered') : i18n('notAnswered'),
		},
		{
			title: i18n('flagged'),
			dataIndex: 'flagged',
			key: 'flagged',
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
