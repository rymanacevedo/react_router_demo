import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { QuestionInFocus, RoundData } from '../../../lib/validator';
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { AmpTable } from '../../../css/theme';
import { Confidence } from '../../pages/AssignmentView/AssignmentTypes';
import useArray from '../../../hooks/useArray';

type TimedAssessmentReviewTablePropsType = {
	roundData: RoundData;
};

export type QuestionStatus = {
	key: string;
	question: string;
	status: boolean;
	flagged: boolean;
};

export type Columns = {
	title: string;
	dataIndex: string;
	key: string;
	render?: (value: string | boolean) => React.ReactElement | null;
};

const TimedAssessmentReviewTable = ({
	roundData,
}: TimedAssessmentReviewTablePropsType) => {
	const { t: i18n } = useTranslation();
	const columns = useArray<Columns>([
		{
			title: i18n('question'),
			dataIndex: 'question',
			key: 'question',
			render: (text) => <Box paddingLeft={4}>{text}</Box>,
		},
		{
			title: i18n('status'),
			dataIndex: 'status',
			key: 'status',
			render: (answered) => (answered ? i18n('answered') : i18n('notAnswered')),
		},
		{
			title: i18n('flagged'),
			dataIndex: 'flagged',
			key: 'flagged',
			render: (flagged) =>
				flagged ? (
					<Icon as={BookmarkFilledIcon} w={6} h={6} color="ampSecondary.500" />
				) : null,
		},
	]);

	const dataSource = useArray<QuestionStatus>(
		roundData.questionList.map((question: QuestionInFocus, index: number) => {
			return {
				key: String(index + 1),
				question: String(index + 1),
				status: question.confidence !== Confidence.NA,
				flagged: question.flagged,
			};
		}),
	);

	return (
		<Box width={600} marginTop={10}>
			<AmpTable
				columns={columns.array}
				dataSource={dataSource.array}
				pagination={false}
			/>
		</Box>
	);
};

export default TimedAssessmentReviewTable;