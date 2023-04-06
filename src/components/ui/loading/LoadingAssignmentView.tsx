import {
	Box,
	Container,
	HStack,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Stack,
	useMediaQuery,
} from '@chakra-ui/react';

export default function LoadingAssignmentView() {
	const isSmallerThan1000 = useMediaQuery('(max-width:1000px)');
	return (
		<Container
			id={'loading'}
			margin="0"
			padding="0"
			maxWidth={'100vw'}
			overflowY={'hidden'}
			overflowX={'hidden'}>
			<Stack
				padding={5}
				borderBottom={'1px'}
				borderBottomColor="ampSecondary.300">
				<Skeleton height="20px" width={'235px'} />
				<Skeleton height="20px" width={'110px'} />
			</Stack>
			<HStack width="100%">
				<HStack
					w="100%"
					p="12px"
					justifyContent={'center'}
					flexWrap={isSmallerThan1000 ? 'wrap' : 'nowrap'}>
					<Box
						style={{
							backgroundColor: 'white',
							margin: '6px',
						}}
						boxShadow="2xl"
						w="100%"
						maxWidth={726}
						h={isSmallerThan1000 ? '' : '745px'}
						overflow="hidden"
						borderRadius={24}
						p={'72px'}>
						<Skeleton height="20px" width={'235px'} />
						<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="5" />
					</Box>
					<Box
						style={{
							backgroundColor: 'white',
							margin: '6px',
							minHeight: '745px',
						}}
						boxShadow="2xl"
						h={isSmallerThan1000 ? '' : '100%'}
						display={'flex'}
						flexDirection="column"
						w="100%"
						maxWidth={726}
						overflow="hidden"
						borderRadius={24}
						p={'72px'}>
						<Skeleton height="20px" width={'235px'} />
						<HStack marginTop={5}>
							<SkeletonCircle marginRight={4} size="10" />
							<Box style={{ flex: 1 }}>
								<Skeleton height="20px" width={'250px'} />
							</Box>
						</HStack>
						<HStack marginTop={5}>
							<SkeletonCircle marginRight={4} size="10" />
							<Box style={{ flex: 1 }}>
								<Skeleton height="20px" width={'250px'} />
							</Box>
						</HStack>
						<HStack marginTop={5}>
							<SkeletonCircle marginRight={4} size="10" />
							<Box style={{ flex: 1 }}>
								<Skeleton height="20px" width={'250px'} />
							</Box>
						</HStack>
						<HStack marginTop={5}>
							<SkeletonCircle marginRight={4} size="10" />
							<Box style={{ flex: 1 }}>
								<Skeleton height="20px" width={'250px'} />
							</Box>
						</HStack>
					</Box>
				</HStack>
			</HStack>
		</Container>
	);
}
