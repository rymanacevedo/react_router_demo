import { Box, Heading, Stack } from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';
import { useMediaQuery } from '@chakra-ui/react';

const Question = ({
	questionInFocus,
}: {
	questionInFocus: { questionRc: any };
}) => {
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const title = 'Question';

	return (
		<Box
			style={{
				backgroundColor: 'white',
				margin: '6px',
				minHeight: '745px',
			}}
			boxShadow="2xl"
			maxW="xl"
			w="100%"
			maxWidth={726}
			h={isSmallerThan1000 ? '' : '100%'}
			overflow="hidden"
			borderRadius={24}
			p={'72px'}>
			<Heading as="h2">{title}</Heading>
			<Stack spacing="20px" marginTop="34px">
				<RichContentComponent content={questionInFocus?.questionRc} />
			</Stack>
		</Box>
	);
};

export default Question;
