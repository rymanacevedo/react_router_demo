import { Box, Heading, HStack, Text, Button, Stack } from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';

const ModuleIntroductionComponent = ({
	moduleName,
	introductionRc,
	descriptionRc,
	numOfQuestionsText,
	testTimeText,
	proceedBtnText,
}: {
	moduleName: string;
	introductionRc: any;
	descriptionRc: any;
	numOfQuestionsText?: string;
	testTimeText?: string;
	proceedBtnText?: String;
}) => {
	return (
		<Box
			style={{
				backgroundColor: 'white',
			}}
			boxShadow="2xl"
			w="100%"
			minH="60vh"
			overflow="hidden"
			borderRadius={24}
			p={8}>
			<Heading as="h2">{moduleName}</Heading>
			<Stack>
				<RichContentComponent content={introductionRc} />
				<RichContentComponent content={descriptionRc} />
			</Stack>
			<HStack spacing="20px">
				<Text float="left" fontSize="12px">
					{numOfQuestionsText}
				</Text>
				<Text float="right" fontSize="12px">
					{testTimeText}
				</Text>
			</HStack>
			{proceedBtnText && <Button>{proceedBtnText}</Button>}
		</Box>
	);
};

export default ModuleIntroductionComponent;
