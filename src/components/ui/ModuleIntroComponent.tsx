import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';
import { useTranslation } from 'react-i18next';
import { estimatedTimeRemaining } from '../../utils/logic';

type ModuleIntroComponentType = {
	moduleData: {
		name: string;
		introductionRc: string;
		outroRc: string;
	};
	numberOfLearningUnits?: number;
	estimatedTimeToComplete?: number;
	action?: () => void;
	review?: boolean;
};
const ModuleIntroComponent = ({
	moduleData,
	numberOfLearningUnits,
	estimatedTimeToComplete,
	action,
	review,
}: ModuleIntroComponentType) => {
	const { t: i18n } = useTranslation();

	return (
		<Box
			style={{
				backgroundColor: 'white',
			}}
			w="990px"
			overflow="hidden"
			margin={'12px auto'}
			borderRadius={24}
			padding={16}
			display={'flex'}
			flexDirection={'column'}>
			<Heading as="h2" fontSize="xl">
				{moduleData?.name}
			</Heading>
			<Stack paddingTop="16px" paddingBottom="16px">
				<RichContentComponent content={moduleData?.introductionRc} />

				<Text fontSize="sm" paddingBottom={5} paddingTop={5}>
					{numberOfLearningUnits}{' '}
					{numberOfLearningUnits && numberOfLearningUnits > 1
						? i18n('Questions')
						: i18n('Question')}
					{/*needed for the space between*/}
					{'    '}
					{estimatedTimeRemaining(
						estimatedTimeToComplete,
						false,
						i18n('hours'),
						i18n('hour'),
						i18n('minutes'),
						i18n('minute'),
					)}
				</Text>
			</Stack>

			<Button onClick={() => action && action()}>
				<Text>{!review ? i18n('letsBegin') : i18n('returnToReview')}</Text>
			</Button>
		</Box>
	);
};

export default ModuleIntroComponent;
