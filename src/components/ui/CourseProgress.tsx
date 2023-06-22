import { Box, Divider, Flex, Text } from '@chakra-ui/react';

type CourseProgressProps = {
	courseStats: any; //TODO: add a type for this
};

const CourseProgress = ({ courseStats }: CourseProgressProps) => {
	console.log(courseStats);
	// TODO: add translations
	// clean up the <Text> attributes
	return (
		<>
			<Box w={435} bg="#F5F5F5" borderRadius="12px" p={4}>
				<Text
					margin={'8px'}
					fontSize="21px"
					fontWeight={600}
					lineHeight="133%"
					letterSpacing="-0.105px">
					Course Progress
				</Text>
				<Box
					fontSize="12px"
					fontWeight={600}
					lineHeight="130%"
					display="flex"
					flexDirection="row"
					alignItems="center"
					marginTop="16px">
					<Text marginLeft={'auto'}>You</Text>
					<Text
						color="var(--text-dark-secondary, #283C58)"
						textAlign="right"
						width="80px"
						marginRight="8px"
						flexShrink={0}>
						Peers
					</Text>
				</Box>
				<Divider marginTop="8px" />
				<Flex alignItems="center" marginTop="8px">
					<Text margin={'8px'} flex="1" fontSize="16px" lineHeight="125%">
						Progress
					</Text>
					<Text>44%</Text>
					<Text marginLeft="40px">44%</Text>
				</Flex>
				<Flex alignItems="center" marginTop="8px">
					<Text
						margin={'8px'}
						flex="2"
						display="flex"
						width="219px"
						flexDirection="column"
						fontSize="16px"
						lineHeight="125%"
						marginTop="8px">
						Time spent
					</Text>
					<Text>1hr47m</Text>
					<Text marginLeft="40px">48m</Text>
				</Flex>

				<Flex alignItems="center" marginTop="8px">
					<Text
						margin={'8px'}
						flex="2"
						display="flex"
						width="219px"
						flexDirection="column"
						fontSize="16px"
						lineHeight="125%"
						marginTop="8px">
						Starting Knowledge
					</Text>
					<Text>48%</Text>
					<Text marginLeft="40px">52%</Text>
				</Flex>
				<Flex alignItems="center" marginTop="8px">
					<Text
						margin={'8px'}
						flex="2"
						display="flex"
						width="219px"
						flexDirection="column"
						fontSize="16px"
						lineHeight="125%"
						marginTop="8px">
						Refreshers Taken
					</Text>
					<Text marginRight="10px">2</Text>
					<Text marginLeft="40px">2.4</Text>
				</Flex>
			</Box>
		</>
	);
};

export default CourseProgress;
