import { Heading, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ReviewContentRender from './Review/ReviewContentRender';
// import RichContentComponent from './RichContentComponent';

const Question = ({
	questionInFocus,
	review,
	numberOfQInReview,
	questionIndex,
}: {
	review?: boolean;
	numberOfQInReview?: number;
	questionInFocus:
		| { questionRc: any; name?: string; introductionRc?: any }
		| undefined;
	questionIndex?: number;
}) => {
	const { t: i18n } = useTranslation();
	//TODO: when moving to next question add logic to update what number question you are on.
	return (
		<>
			{review ? (
				<Heading as="h3">
					{i18n('ReviewQ')} {questionIndex} {i18n('of')} {numberOfQInReview}{' '}
				</Heading>
			) : (
				<Heading as="h3">Question</Heading>
			)}
			{questionInFocus?.introductionRc ? (
				<Stack spacing="20px" marginTop="34px">
					<ReviewContentRender content={questionInFocus.introductionRc} />
				</Stack>
			) : null}
			<Stack spacing="20px" marginTop="34px">
				<ReviewContentRender content={questionInFocus?.questionRc} />
			</Stack>
		</>
	);
};

export default Question;
