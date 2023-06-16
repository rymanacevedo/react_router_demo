import { Container, Heading, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import CourseMenu from '../ui/CourseMenu';
import { LoaderFunction } from 'react-router';
import { requireUser } from '../../utils/user';
import { getCourseList } from '../../services/learning';
import {
	json,
	Outlet,
	useFetcher,
	useLoaderData,
	useNavigate,
} from 'react-router-dom';
import { getSubAccount } from '../../services/utils';
import { useEffect, useState } from 'react';
import { useQuizContext } from '../../hooks/useQuizContext';

export type Course = {
	key: string;
	name: string;
};

export const learningLoader: LoaderFunction = async ({ request }) => {
	const user = requireUser();
	const url = new URL(request.url);
	const selectedCourseKey = url.searchParams.get('selectedCourseKey');
	const { courseRole, subAccount } = getSubAccount(user);
	if (selectedCourseKey) {
		// fetcher runs this route again, so we don't need to fetch the data again
		// TODO: optimize so getCourseList isn't called multiple times
		const {
			data: { items: courseList },
		} = await getCourseList(user, courseRole, subAccount);

		return json({
			courseList,
			selectedCourseKey,
			subAccount,
			courseRole,
		});
	}

	const {
		data: { items: courseList },
	} = await getCourseList(user, courseRole, subAccount);

	if (courseList.length === 0) {
		return json({
			courseList,
			selectedCourseKey: null,
			subAccount,
			courseRole,
		});
	}

	return json({
		courseList,
		selectedCourseKey: courseList[0].key,
		subAccount,
		courseRole,
	});
};

const LearningView = () => {
	const loaderData = useLoaderData() as any;
	const fetcher = useFetcher();
	const data = fetcher.data || loaderData;
	const navigate = useNavigate();
	const { selectedCourseKey, setSelectedCourseKey } = useQuizContext();
	const [title, setTitle] = useState<string>('');
	const [courses, setCourses] = useState<Course[]>([]);
	const { t: i18n } = useTranslation();

	useEffect(() => {
		if (data && !selectedCourseKey) {
			setCourses(data.courseList);
			setTitle(data.courseList[0].name);
			setSelectedCourseKey(data.selectedCourseKey);
			navigate(`/learning/${data.selectedCourseKey}`);
		}

		if (data.courseList && selectedCourseKey) {
			setCourses(data.courseList);
			const course = data.courseList.find(
				(c: Course) => c.key === selectedCourseKey,
			);
			if (course) {
				setTitle(course.name);
				navigate(`/learning/${selectedCourseKey}`);
			}
		}
	}, []);

	useEffect(() => {
		if (fetcher.data && courses) {
			const course = courses.find((c) => c.key === data.selectedCourseKey);
			if (course) {
				setTitle(course.name);
				setSelectedCourseKey(course.key);
				navigate(`/learning/${course.key}`);
			}
		}
	}, [fetcher.data]);

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
			<Heading as="h1" marginBottom="24px" margin="12px">
				{title}
			</Heading>
			<HStack
				justifyContent={'space-between'}
				margin="12px"
				marginBottom="24px"
				width="100%"
				maxWidth={'800px'}>
				<Heading as="h2" size="lg">
					{i18n('yourAssignments')}
				</Heading>
				<CourseMenu
					courses={courses}
					selectedCourseKey={selectedCourseKey}
					courseUpdaterToggle={fetcher}
				/>
			</HStack>
			<Outlet />
		</Container>
	);
};

export default LearningView;
