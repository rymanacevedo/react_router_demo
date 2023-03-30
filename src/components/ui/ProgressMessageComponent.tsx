import { Avatar, AvatarGroup, Box, HStack, Text } from '@chakra-ui/react';

const ProgressMessageComponent = () => {
	return (
		<Box bg="ampSuccess.50" borderRadius={'12px'} padding="10px 20px 30px 20px" margin="24px">
			<div className="close"><span style={{fontSize: '20px'}}>&times;</span></div>
			
			<HStack>
				<AvatarGroup spacing="4px">
					<Avatar bg="teal.500" />
				</AvatarGroup>
				<Text fontSize={'16px'}>
					You’re doing a great job at knowing what you are sure and unsure
					about.
				</Text>
			</HStack>
		</Box>
	);
};

export default ProgressMessageComponent;
