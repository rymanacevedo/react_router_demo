import { Box, Divider, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import ProgressMessageComponent from './ProgressMessageComponent';

const ProgressMenu = () => {
	return (
		<Box
			style={{
				backgroundColor: 'white',
			}}
			boxShadow="2xl"
			h="745px"
			w="345px"
			borderRadius={24}
			boxSizing="border-box">
			<ProgressMessageComponent />
			<Divider borderWidth="1px" width="297px" marginLeft="24px" />
			<Box padding="24px">
				<Text fontSize="21px" fontWeight={'600'}>
					The road to mastery
				</Text>
				<Progress
					colorScheme="green"
					marginTop="12px"
					size="lg"
					height="24px"
					value={20}
					borderRadius="24px"
					variant='ampDarkSuccess'
					bg='ampSuccess.50'
				/>
				<HStack marginTop='12px'>
				<VStack><Text fontSize={'12px'} fontWeight='400'>Mastered</Text> <Text fontSize={'16px'} fontWeight="600" w='100%'>5</Text></VStack>
				<VStack paddingLeft='12px'><Text fontSize={'12px'} fontWeight='400'>Incorect</Text> <Text fontSize={'16px'} fontWeight="600" w='100%'>4</Text></VStack>
				<VStack paddingLeft='12px'><Text fontSize={'12px'} fontWeight='400'>Learning</Text> <Text fontSize={'16px'} fontWeight="600" w='100%'>7</Text></VStack>
				<VStack paddingLeft='12px'><Text fontSize={'12px'} fontWeight='400'>Unseen</Text> <Text fontSize={'16px'} fontWeight="600" w='100%'>18</Text></VStack>
				</HStack>
				
			</Box>
		</Box>
	);
};

export default ProgressMenu;
