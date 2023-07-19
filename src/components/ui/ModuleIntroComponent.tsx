import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';
import { useTranslation } from 'react-i18next';

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
	const estimatedTimeRemaining = () => {
		const time = estimatedTimeToComplete;
		let hour = 0;
		let min = 0;

		if (time == null || time <= 0) {
			return '';
		}

		if (time >= 3600) {
			// over an hour
			hour = time / 3600;
			min = Math.ceil((time % 3600) / 60);
			const hourText = hour > 1 ? i18n('hours') : i18n('hour');
			const minText = min > 1 ? i18n('minutes') : i18n('minute');
			return `About ${hour} ${hourText} ${min} ${minText}`;
		} else {
			// under one hour
			min = Math.ceil(time / 60);
			const minText = min > 1 ? i18n('minutes') : i18n('minute');
			return `About ${min} ${minText}`;
		}
	};
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
					{estimatedTimeRemaining()}
				</Text>
			</Stack>

			<Button onClick={() => action && action()}>
				<Text>{!review ? i18n('letsBegin') : i18n('returnToReview')}</Text>
			</Button>
		</Box>
	);
};

export default ModuleIntroComponent;
