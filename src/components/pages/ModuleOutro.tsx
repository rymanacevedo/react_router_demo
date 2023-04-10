import {
	Avatar,
	AvatarGroup,
	Box,
	Button,
	HStack,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import RichContentComponent from '../ui/RichContentComponent';
import CompleteIcon from '../ui/Icons/CompleteIcon';

type ModuleOutroType = {
	moduleData: {
		outroLink: string;
		outroButtonText: string;
		name: string;
		introductionRc: string;
		outroRc: string;
	};
	action?: () => void;
};
const ModuleOutro = ({ moduleData, action }: ModuleOutroType) => {
	console.log('moduleData', moduleData);
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
			<Stack paddingTop="16px" paddingBottom="16px">
				<HStack
					bg={'ampSuccess.50'}
					borderRadius={'12px'}
					marginBottom={'20px'}
					p={'30px 20px 30px 20px'}>
					<AvatarGroup spacing="4px">
						<Avatar bg={'ampSuccess.500'} icon={<CompleteIcon />}></Avatar>
					</AvatarGroup>
					<Text>Congradulations, you've completed this module! </Text>
				</HStack>
				{moduleData?.outroRc && (
					<RichContentComponent content={moduleData?.outroRc} />
				)}
			</Stack>
			{moduleData?.outroLink?.length && moduleData?.outroButtonText?.length && (
				<Button
					width="200px"
					marginTop={'10px'}
					onClick={
						// open url in new tab
						() => window.open(moduleData?.outroLink, '_blank')
					}
					variant={'ampOutline'}>
					<Text>{moduleData?.outroButtonText}</Text>
				</Button>
			)}

			<Button
				width="200px"
				alignSelf={'flex-end'}
				onClick={() => action && action()}
				leftIcon={<ArrowLeftIcon />}>
				<Text>{i18n('courseHome')}</Text>
			</Button>
		</Box>
	);
};

export default ModuleOutro;
