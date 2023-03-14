import { Heading, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import RichContentComponent from './RichContentComponent';
import { CurrentRoundQuestionListData } from '../pages/AssignmentView/AssignmentTypes';

const Question = ({
	questionInFocus,
	review,
	currentRoundQuestionListData,
}: {
	review?: boolean;
	currentRoundQuestionListData?: CurrentRoundQuestionListData;
	questionInFocus:
		| { questionRc: any; name?: string; introductionRc?: any }
		| undefined;
}) => {
	const { t: i18n } = useTranslation();
	//TODO: when moving to next question add logic to update what number question you are on.
	return (
		<>
			{review ? (
				<Heading as="h2">
					{i18n('ReviewQ')} 1 {i18n('of')}{' '}
					{currentRoundQuestionListData?.questionList?.length}{' '}
				</Heading>
			) : (
				<Heading as="h2">Question</Heading>
			)}
			<Stack spacing="20px" marginTop="34px">
				<RichContentComponent content={questionInFocus?.introductionRc} />
			</Stack>
			<Stack spacing="20px" marginTop="34px">
				<RichContentComponent content={questionInFocus?.questionRc} />
			</Stack>
		</>
	);
};

export default Question;
