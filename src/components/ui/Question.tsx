import { Heading, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import RichContentComponent from './RichContentComponent';

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
