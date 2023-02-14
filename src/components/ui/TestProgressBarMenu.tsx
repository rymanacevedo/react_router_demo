import { Box, Button, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import AmpMicroChip from '../../css/AmpMicroChip';
import { useTranslation } from 'react-i18next';
import { EnterIcon, ExitIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useMediaQuery } from '@chakra-ui/react';

type ProgressBarMenu = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	title: string;
	timeLeft: string;
	assignmentType: string;
	progress: number;
	roundNumber: number;
	roundPhase: string;
	totalQuestionCount: any;
};

//refactor to accept assignment type, title, time left, progress props

const TestProgressBarMenu = ({
	isOpen,
	setIsOpen,
	title,
	timeLeft,
	assignmentType,
	progress,
	roundNumber,
	roundPhase,
}: ProgressBarMenu) => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');

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
				justifyContent={isSmallerThan1000 ? '' : 'space-between'}
				paddingLeft="24px"
				paddingRight="24px"
				flexDirection={isSmallerThan1000 ? 'column' : 'initial'}>
				<VStack align={'left'} display={isSmallerThan1000 ? 'none' : 'block'}>
					<Text fontSize={'21px'} fontWeight={'600'}>
						{/* {i18n('theScienceOfLearning')} */}
						{assignmentType}: {title}
					</Text>
					<Text fontSize={'16px'} color="ampNeutral.800">
						{timeLeft}
					</Text>
				</VStack>
				<VStack
					alignSelf={'center'}
					style={{ marginTop: isSmallerThan1000 ? '12px' : '' }}>
					<Text fontSize={'20px'} fontWeight={'600'}>
						{`Round ${roundNumber}: Learning`}
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

				{isSmallerThan1000 ? (
					<Button
						variant={'outline'}
						borderColor={'ampPrimary.300'}
						bg="ampWhite"
						alignSelf={'flex-end'}
						style={{ marginTop: '-40px' }}>
						{<ChevronDownIcon />}
					</Button>
				) : (
					<Button
						variant={'outline'}
						borderColor={'ampPrimary.300'}
						bg="ampWhite"
						width="200px"
						leftIcon={isOpen ? <ExitIcon /> : <EnterIcon />}
						onClick={() => {
							setIsOpen(!isOpen);
						}}>
						<Text fontSize={'16px'} fontWeight="600">
							{isOpen ? i18n('hideProgress') : i18n('showProgress')}
						</Text>
					</Button>
				)}
			</HStack>
			<Progress
				value={progress}
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
