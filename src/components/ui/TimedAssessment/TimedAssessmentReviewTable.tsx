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

export type QuestionStatus = {
	questionData: QuestionInFocus;
	key: string;
	questionIndex: string;
	status: boolean;
	flagged: boolean;
};

const TimedAssessmentReviewTable = ({
	roundData,
}: TimedAssessmentReviewTablePropsType) => {
	const context = useOutletContext<OutletContext>();
	const { flaggedQuestions, answeredQuestions, setQuestionTrigger } = context;

	const { t: i18n } = useTranslation();
	const columns = [
		{
			title: i18n('question'),
			dataIndex: 'questionIndex',
			key: 'questionIndex',
			sorter: (a: QuestionStatus, b: QuestionStatus) =>
				parseInt(a.questionIndex) - parseInt(b.questionIndex),

			render: (text: string) => <Box paddingLeft={4}>{text}</Box>,
		},
		{
			title: i18n('status'),
			dataIndex: 'status',
			key: 'status',
			sorter: (a: QuestionStatus, b: QuestionStatus) =>
				a.status === b.status ? 0 : a.status ? -1 : 1,

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
				questionData: question,
				key: String(index + 1),
				questionIndex: String(index + 1),
				status: answeredQuestions?.has(question.publishedQuestionAuthoringKey),
				flagged: flaggedQuestions.has(question.publishedQuestionAuthoringKey),
			};
		},
	);

	const handleRowMouseEvents = (event: React.MouseEvent<HTMLElement>) => {
		event.currentTarget.style.cursor =
			event.type === 'mouseenter' ? 'pointer' : 'auto';
	};

	return (
		<>
			<Box width={600} marginTop={10}>
				<AmpTable
					columns={columns}
					dataSource={dataSource}
					pagination={false}
					onRow={(record: QuestionStatus) => {
						return {
							onClick: () => {
								setQuestionTrigger(record.questionData);
							},
							onMouseEnter: handleRowMouseEvents,
							onMouseLeave: handleRowMouseEvents,
						};
					}}
				/>
			</Box>
		</>
	);
};

export default TimedAssessmentReviewTable;
