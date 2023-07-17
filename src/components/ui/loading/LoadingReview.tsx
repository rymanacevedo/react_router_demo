import {
	Box,
	Container,
	Skeleton,
	SkeletonText,
	Stack,
	useMediaQuery,
} from '@chakra-ui/react';

const LoadingReview = () => {
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
				w="100%"
				p="12px"
				direction={['column', 'column', 'row', 'row', 'row', 'row']}
				justifyContent={'center'}
				alignItems={'center'}>
				<Box
					backgroundColor="white"
					margin="6px"
					h={isSmallerThan1000 ? '745px' : '100%'}
					boxShadow="2xl"
					w="100%"
					overflow="hidden"
					borderRadius={24}
					p={12}>
					<Skeleton height="20px" width={'235px'} />
					<SkeletonText
						mt="4"
						noOfLines={14}
						spacing="4"
						skeletonHeight="5"
						width={'1000px'}
					/>
				</Box>
			</Stack>
		</Container>
	);
};

export default LoadingReview;
