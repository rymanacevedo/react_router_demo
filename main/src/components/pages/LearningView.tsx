import { Container } from '@chakra-ui/react';
import AssignmentList from '../ui/AssignmentList';
<<<<<<< HEAD

const LearningView = () => {
	return (
		<main id="main-learning">
			<Container
				id={'learning-dash-main'}
				margin="0"
				padding="12px"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<AssignmentList />
			</Container>
		</main>
=======
import { ChevronDownIcon } from '@radix-ui/react-icons';
import useCourseListService from '../../services/useCourseListService';
import { useEffect, useState } from 'react';

const LearningView = () => {
	const { t: i18n } = useTranslation();
	const { fetchCourseList } = useCourseListService();
	const [courseList, setCourseList] = useState([]);

	useEffect(() => {
		const fetchList = async () => {
			let courseListResponse = await fetchCourseList();
			setCourseList(courseListResponse.items);
		};
		fetchList();
	}, []);

	return (
		<Container
			id={'learning-dash-main'}
			margin="24px"
			padding="24px"
			maxW="100%"
			minH="80vh"
			width={''}
			overflowY={'hidden'}
			overflowX={'hidden'}
			borderRadius="24px"
			bg="ampWhite"
			boxShadow={
				'0px 100px 80px rgba(0, 0, 0, 0.04), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0161557), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0112458)'
			}>
			<Text
				fontWeight={'600'}
				fontSize={'38px'}
				marginBottom="24px"
				margin="12px">
				The Science of Learning
			</Text>
			<HStack
				justifyContent={'space-between'}
				margin="12px"
				marginBottom="24px"
				width="100%"
				maxWidth={'800px'}>
				<Text fontWeight={'600'} fontSize={'28px'}>
					{i18n('yourAssignments')}
				</Text>
				<Menu closeOnSelect={false}>
					<MenuButton
						leftIcon={<ChevronDownIcon />}
						as={Button}
						variant="ampOutline">
						<Text>{i18n('changeCourse')}</Text>
					</MenuButton>
					<MenuList minWidth="240px">
						<MenuOptionGroup defaultValue="asc" type="radio">
							{/* TODO: take course list and map it to the menuTimeOptions */}
							<MenuItemOption value="asc">Ascending</MenuItemOption>
							<MenuItemOption value="desc">Descending</MenuItemOption>
						</MenuOptionGroup>
					</MenuList>
				</Menu>
			</HStack>
			<AssignmentList />
		</Container>
>>>>>>> b3d304be0 (Feat: create useCourseListService; and added it to learning view)
	);
};

export default LearningView;
