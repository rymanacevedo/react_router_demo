import { Avatar, AvatarGroup, Box, HStack, Text } from '@chakra-ui/react';

const ProgressMessageComponent = () => {
	return (
		<Box
			width="100%"
			bg="ampSuccess.50"
			borderRadius={'12px'}
			padding="20px"
			boxSize="borderbox"
			margin="24px">
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
