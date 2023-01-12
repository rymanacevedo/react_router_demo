import { Container, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import AssignmentList from '../ui/AssignmentList';
import useCourseListService from '../../services/coursesServices/useCourseListService';
import { useEffect, useState } from 'react';
import CourseMenu from '../ui/CourseMenu';

export type CourseListType = [
	{
		key: string;
		name: string;
	},
];

const LearningView = () => {
	const { t: i18n } = useTranslation();
	const { fetchCourseList } = useCourseListService();
	const [courseList, setCourseList] = useState<CourseListType>([
		{
			key: '',
			name: '',
		},
	]);
	const [selectedCourseKey, setSelectedCourseKey] = useState<string>('');
	const [courseTitle, setCourseTitle] = useState<string>('');

	const fetchCourseListData = async () => {
		let courseListResponse = await fetchCourseList();
		setCourseList(courseListResponse?.items);
		setSelectedCourseKey(courseListResponse?.items[0]?.key);
		setCourseTitle(courseListResponse?.items[0]?.name);
	};

	useEffect(() => {
		fetchCourseListData();
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
				{courseTitle}
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
				<CourseMenu
					courseList={courseList}
					selectedCourseKey={selectedCourseKey}
					setSelectedCourseKey={setSelectedCourseKey}
					setCourseTitle={setCourseTitle}
				/>
			</HStack>
			<AssignmentList selectedCourseKey={selectedCourseKey} />
		</Container>
	);
};

export default LearningView;
