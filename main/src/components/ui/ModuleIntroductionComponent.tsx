import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';

interface IModuleIntroductionComponent {
	moduleData: {
		name: string;
		introductionRc: any;
	};
	beginAssignment: () => void;
}
const ModuleIntroductionComponent = ({
	moduleData,
	beginAssignment,
}: IModuleIntroductionComponent) => {
	return (
		<Box
			style={{
				backgroundColor: 'white',
			}}
			w="990px"
			overflow="hidden"
			margin={'12px auto'}
			borderRadius={24}
			padding={16}>
			<Heading as="h2">{moduleData?.name}</Heading>
			<Stack paddingTop="16px" paddingBottom="16px">
				<RichContentComponent content={moduleData?.introductionRc} />
			</Stack>
			<Button onClick={() => beginAssignment()}>
				<Text>Let's Begin</Text>
			</Button>
		</Box>
	);
};

export default ModuleIntroductionComponent;
