import { Box, Heading, Stack } from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';
import { useMediaQuery } from '@chakra-ui/react';

const Question = ({
	title,
	questionStem,
	questionIntro,
}: {
	title: string;
	questionIntro: any;
	questionStem: any;
}) => {
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');

	return (
		<Box
			style={{
				backgroundColor: 'white',
			}}
			boxShadow="2xl"
			maxW="xl"
			m="12px"
			w="100%"
			maxWidth={726}
			h={isSmallerThan1000 ? '' : '745px'}
			overflow="hidden"
			borderRadius={24}
			p={'72px'}>
			<Heading as="h2">{title}</Heading>
			<Stack spacing="20px" marginTop="34px">
				<RichContentComponent content={questionStem} />
				<RichContentComponent content={questionIntro} />
			</Stack>
		</Box>
	);
};

export default Question;
