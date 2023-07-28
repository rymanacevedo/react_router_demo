import {
	Avatar,
	AvatarGroup,
	Box,
	Button,
	Heading,
	HStack,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import RichContentComponent from '../ui/RichContentComponent';
import CompleteIcon from '../ui/Icons/CompleteIcon';
import { ModuleData } from '../../lib/validator';

type ModuleOutroType = {
	moduleData: ModuleData;
	action?: () => void;
};
const ModuleOutro = ({ moduleData, action }: ModuleOutroType) => {
	const { t: i18n } = useTranslation();
	const handleClick = () => {
		if (moduleData.outroLink) {
			window.open(moduleData.outroLink, '_blank');
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
			<Stack py={4}>
				<HStack
					bg={'ampSuccess.50'}
					borderRadius="xl"
					marginBottom={5}
					p={'30px 20px 30px 20px'}>
					<AvatarGroup spacing="4px">
						<Avatar bg={'ampSuccess.500'} icon={<CompleteIcon />}></Avatar>
					</AvatarGroup>
					<Heading fontSize="md">{i18n('completeMod')}</Heading>
				</HStack>
				{moduleData?.outroRc && (
					<RichContentComponent content={moduleData?.outroRc} />
				)}
			</Stack>
			{moduleData?.outroLink?.length && moduleData?.outroButtonText?.length && (
				<Button
					width="200px"
					marginTop={2.5}
					onClick={handleClick}
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
