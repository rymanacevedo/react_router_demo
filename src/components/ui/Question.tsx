import { Heading, Stack } from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';

const Question = ({
	questionInFocus,
}: {
	questionInFocus:
		| { questionRc: any; name?: string; introductionRc?: any }
		| undefined;
}) => {
	return (
		<>
			<Heading as="h2">{questionInFocus?.name}</Heading>
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
