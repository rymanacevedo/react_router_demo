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
			m="12px"
			w={'100%'}
			maxWidth={726}
			minWidth={545}
			h="745px"
			overflow="hidden"
			borderRadius={24}
			p={16}>
			<Heading as="h2">{title}</Heading>
			<Stack spacing="20px">
				<RichContentComponent content={questionStem} />
				<RichContentComponent content={questionIntro} />
			</Stack>
		</Box>
	);
};

export default Question;
