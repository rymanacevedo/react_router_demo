import { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Heading,
	Flex,
	Button,
	Grid,
	GridItem,
	useToast,
} from '@chakra-ui/react';
import { PlusIcon } from '@radix-ui/react-icons';
import { ActionFunction, LoaderFunction } from 'react-router';
import { Cookies } from 'react-cookie-consent';
import { requireUser } from '../../utils/user';
import { getCourseList } from '../../services/authoring';
import { getSubAccount } from '../../services/utils';
import { json, useLoaderData, useActionData } from 'react-router-dom';
import CourseCard from '../ui/Authoring/CourseCard';
import CourseFilter from '../ui/Authoring/CourseFilters';
import { deleteCourse, copyCourse } from '../../services/authoring';

export const authoringActions: ActionFunction = async ({ request }) => {
	const user = requireUser();
	let formData = await request.formData();
	let intent = formData.get('intent');
	const courseId = formData.get('courseId')?.toString() ?? '';

	if (intent === 'delete') {
		const { response } = await deleteCourse(user, courseId);
		const { status, statusText } = response;
		if (response.status === 200) {
			return json({
				ok: true,
				status,
				statusText,
				toastMessage: 'Course Deleted',
			});
		} else {
			return json({
				ok: false,
				status,
				statusText,
				toastMessage: 'Course Delete Failure',
			});
		}
	} else if (intent === 'copyNew' || intent === 'copyShare') {
		const share = intent === 'copyShare' ? true : false;
		const { response } = await copyCourse(user, courseId, share);
		const { status, statusText } = response;
		if (status === 200) {
			return json({
				ok: true,
				status,
				statusText,
				toastMessage: 'Course Copied',
			});
		} else {
			return json({
				ok: false,
				status,
				statusText,
				toastMessage: 'Course Copy Failure',
			});
		}
	}
};

export const authoringLoader: LoaderFunction = async () => {
	const user = requireUser();
	const { courseRole, subAccount } = getSubAccount(user);

	const {
		data: { items: courseList },
	} = await getCourseList(user);

	return json({
		courseList,
		selectedCourseKey: null,
		subAccount,
		courseRole,
	});
};

const AuthoringView = () => {
	const actionData = useActionData() as any;
	const { courseList } = useLoaderData() as any;
	const toast = useToast();
	const [listView, setListView] = useState<boolean>(
		Boolean(Cookies.get('authoring_list_view')),
	);

	const handleListFilter = () => {
		setListView(!listView);
		if (listView) {
			Cookies.remove('authoring_list_view');
		} else {
			Cookies.set('authoring_list_view', 'true');
		}
	};

	useEffect(() => {
		if (actionData) {
			if (actionData.status === 200) {
				toast({
					title: actionData.toastMessage,
					status: 'success',
					duration: 4000,
				});
			} else {
				toast({
					title: actionData.toastMessage,
					status: 'error',
					duration: 4000,
				});
			}
		}
	}, [actionData]);

	return (
		<Box bg="ampNeutral.100" minHeight="100vh" paddingX={6} paddingTop={6}>
			<Container
				maxW={1440}
				bg="ampWhite"
				borderRadius="xl"
				paddingY={16}
				paddingX={24}>
				<Flex justifyContent="space-between" marginBottom={10}>
					<Heading>Courses</Heading>
					<Button leftIcon={<PlusIcon />}>New Course</Button>
				</Flex>
				<CourseFilter listView={listView} handleListView={handleListFilter} />
				<Grid
					templateColumns={listView ? '1fr' : 'repeat(3, minmax(0, 1fr))'}
					gap={listView ? 2 : 6}>
					{courseList.map((course: any) => (
						<GridItem colSpan={1} w="100%" color="inherit" key={course.uid}>
							<CourseCard {...course} listView={listView} />
						</GridItem>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default AuthoringView;
