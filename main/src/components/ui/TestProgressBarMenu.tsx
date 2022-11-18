import { Box, Button, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import AmpMiniChip from '../../css/AmpMiniChip';

const TestProgressBarMenu = () => {
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
						The Science of Learning
					</Text>
					<Text fontSize={'16px'} color="ampNeutral.400">
						About 24 mins left
					</Text>
				</VStack>
				<VStack>
					<Text fontSize={'20px'} fontWeight={'600'}>
						Round 1: Questions
					</Text>
					<HStack>
						<AmpMiniChip variant="ampDarkSuccess" />
						<AmpMiniChip variant="ampDarkSuccess" />
						<AmpMiniChip variant="ampDarkSuccess" />
						<AmpMiniChip variant="ampDarkErrorOutline" />
						<AmpMiniChip variant="ampDarkError" />
						<AmpMiniChip variant="ampSecondaryDot" />
						<AmpMiniChip variant="ampNeutralUnfilled" />
					</HStack>
				</VStack>
				<Button variant={'outline'} borderColor={'ampPrimary.300'}>
					<Text fontSize={'16px'}>Show Progress</Text>
				</Button>
			</HStack>
			<Progress
				value={80}
				height={'80px'}
				colorScheme="linkedin"
				zIndex={'1'}
				width="100%"
			/>
		</Box>
	);
};

export default TestProgressBarMenu;
