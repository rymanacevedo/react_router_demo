import {
	Box,
	Container,
	Stack,
	useMediaQuery,
	Heading,
	Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useModuleContentService from '../../services/coursesServices/useModuleContentService';
import LoadingReview from '../ui/loading/LoadingReview';

const Review = () => {
	const [data, setData] = useState({
		name: '',
		introductionRc: '',
		outroRc: '',
		learningUnits: [],
	});
	const { t: i18n } = useTranslation();
	const { assignmentKey } = useParams();
	const isSmallerThan1000 = useMediaQuery('(max-width:1000px)');
	const { fetchModuleQuestions } = useModuleContentService();

	useEffect(() => {
		const fetchData = async () => {
			let response = await fetchModuleQuestions(assignmentKey);
			if (response) {
				setData(response);
			}
		};
		if (assignmentKey) {
			fetchData();
		}
	}, [assignmentKey]);

	return (
		<Container
			id={'review'}
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
				{data.learningUnits.length ? (
					<Box
						backgroundColor="white"
						margin="6px"
						h={isSmallerThan1000 ? '745px' : '100%'}
						boxShadow="2xl"
						w="100%"
						overflow="hidden"
						borderRadius={24}
						p={'72px'}
						display="flex"
						flexDirection="column">
						<Heading as="h1" margin="12px">
							{data.name}
						</Heading>
						<Text marginTop={34} fontSize={28} color={'#7E8A9B'}>
							{data.learningUnits.length} {i18n('questions')}
						</Text>
					</Box>
				) : (
					<LoadingReview />
				)}
			</Stack>
		</Container>
	);
};

export default Review;
