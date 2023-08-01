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
				<Skeleton height={5} width={'235px'} />
				<Skeleton height={5} width={'110px'} />
			</Stack>
			<Stack
				w="100%"
				p={3}
				direction={['column', 'column', 'row', 'row', 'row', 'row']}
				justifyContent={'center'}
				alignItems={'center'}>
				<Box
					backgroundColor="white"
					margin={1.5}
					h={isSmallerThan1000 ? '745px' : '100%'}
					boxShadow="2xl"
					w="100%"
					maxWidth={726}
					overflow="hidden"
					borderRadius={24}
					p={12}>
					<Skeleton height={5} width={'235px'} />
					<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="5" />
				</Box>
				<Box
					backgroundColor="white"
					margin={1.5}
					h={isSmallerThan1000 ? '745px' : '100%'}
					boxShadow="2xl"
					display={'flex'}
					flexDirection="column"
					w="100%"
					maxWidth={726}
					overflow="hidden"
					borderRadius={24}
					p={12}>
					<Skeleton height={5} width={'235px'} />
					<HStack marginTop={5}>
						<SkeletonCircle marginRight={4} size="10" />
						<Box style={{ flex: 1 }}>
							<Skeleton height={5} width={'250px'} />
						</Box>
					</HStack>
					<HStack marginTop={5}>
						<SkeletonCircle marginRight={4} size="10" />
						<Box style={{ flex: 1 }}>
							<Skeleton height={5} width={'250px'} />
						</Box>
					</HStack>
					<HStack marginTop={5}>
						<SkeletonCircle marginRight={4} size="10" />
						<Box style={{ flex: 1 }}>
							<Skeleton height={5} width={'250px'} />
						</Box>
					</HStack>
					<HStack marginTop={5}>
						<SkeletonCircle marginRight={4} size="10" />
						<Box style={{ flex: 1 }}>
							<Skeleton height={5} width={'250px'} />
						</Box>
					</HStack>
				</Box>
			</Stack>
		</Container>
	);
}
