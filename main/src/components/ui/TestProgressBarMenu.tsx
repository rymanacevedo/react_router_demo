import { useState } from 'react';
import {
	Box,
	Button,
	HStack,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Progress,
	Text,
	VStack,
} from '@chakra-ui/react';
import AmpMicroChip from '../../css/AmpMicroChip';
import { useTranslation } from 'react-i18next';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons';

const TestProgressBarMenu = () => {
	const { t: i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box width="100vw" boxSizing="border-box">
			<HStack
				borderBottom={'1px'}
				borderBottomColor="ampSecondary.300"
				zIndex="2"
				position={'absolute'}
				width="100%"
				height={'80px'}
				bg={'transparent'}
				justify="space-between"
				paddingLeft="24px"
				paddingRight="24px">
				<VStack align={'left'}>
					<Text fontSize={'21px'} fontWeight={'600'}>
						{i18n('theScienceOfLearning')}
					</Text>
					<Text fontSize={'16px'} color="ampNeutral.800">
						{`${i18n('about')} 24 ${i18n('minsLeft')}`}
					</Text>
				</VStack>
				<VStack>
					<Text fontSize={'20px'} fontWeight={'600'}>
						{`Round 1: ${i18n('questions')}`}
					</Text>
					<HStack>
						<AmpMicroChip variant="ampDarkSuccess" />
						<AmpMicroChip variant="ampDarkSuccess" />
						<AmpMicroChip variant="ampDarkSuccess" />
						<AmpMicroChip variant="ampDarkErrorOutline" />
						<AmpMicroChip variant="ampDarkError" />
						<AmpMicroChip variant="ampSecondaryDot" />
						<AmpMicroChip variant="ampNeutralUnfilled" />
					</HStack>
				</VStack>
				<Popover>
					<PopoverTrigger>
						<Button
							variant={'outline'}
							borderColor={'ampPrimary.300'}
							bg="ampWhite"
							width="200px"
							leftIcon={isOpen ? <ExitIcon /> : <EnterIcon />}
							onClick={() => setIsOpen(!isOpen)}>
							<Text fontSize={'16px'} fontWeight="600">
								{isOpen ? i18n('hideProgress') : i18n('showProgress')}
							</Text>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						padding={'24px'}
						borderRadius={'24px'}
						width={'375px'}>
						<Button
							variant={'outline'}
							borderColor={'ampPrimary.300'}
							bg="ampWhite"
							width="325px"
							height="40px">
							<Text fontSize={'16px'} fontWeight="600">
								{i18n('viewMoreProgress')}
							</Text>
						</Button>
					</PopoverContent>
				</Popover>
			</HStack>
			<Progress
				value={80}
				height={'80px'}
				colorScheme="gray"
				zIndex={'1'}
				width="100%"
				bg="ampNeutral.50"
			/>
		</Box>
	);
};

export default TestProgressBarMenu;
