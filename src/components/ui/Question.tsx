import { Box, Heading, Stack } from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';

const Question = ({
	title,
	questionStem,
	questionIntro,
}: {
	title: string;
	questionIntro: any;
	questionStem: any;
}) => {
	return (
		<Box
			style={{
				backgroundColor: 'white',
			}}
			boxShadow="2xl"
			maxW="xl"
			minWidth={726}
			overflow="hidden"
			borderRadius={24}
			p={8}>
			<Heading as="h2">{title}</Heading>
			<Stack spacing="20px">
				<RichContentComponent content={questionStem} />
				<RichContentComponent content={questionIntro} />
			</Stack>
		</Box>
	);
};

export default Question;
