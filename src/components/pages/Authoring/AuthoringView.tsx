import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridItem, useToast } from '@chakra-ui/react';
import { ActionFunction, LoaderFunction } from 'react-router';
import { Cookies } from 'react-cookie-consent';
import { Course } from '../../../store/slices/authoring/coursesSlice';
import { requireUser } from '../../../utils/user';
import { json, useLoaderData, useActionData } from 'react-router-dom';
import CourseCard from '../../ui/Authoring/CourseCard';
import CourseFilter from '../../ui/Authoring/CourseFilters';
import AuthoringHeader from '../../ui/Authoring/AuthoringHeader';
import { deleteCourse, copyCourse } from '../../../services/authoring';
import PageNavigatorFooter from '../../ui/Authoring/PageNavigatorFooter';
import AuthoringLayout from '../../ui/Authoring/AuthoringLayout';
import CourseFolderModal from '../../ui/Authoring/CourseFolderModal';
import {
	fetchCourses,
	selectCourseList,
} from '../../../store/slices/authoring/coursesSlice';
import { store } from '../../../store/store';

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

export const authoringLoader: LoaderFunction = async ({ params, request }) => {
	const currentPage = params.page ? +params.page : 1;
	const sortOrder = new URL(request.url).searchParams.get('sort') || 'a';

	await store.dispatch(fetchCourses({ currentPage, sortOrder }));

	return json({
		sortOrder,
		currentPage,
	});
};

const AuthoringView = () => {
	const actionData = useActionData() as any;
	const courseList = useSelector(selectCourseList);
	const { sortOrder, currentPage } = useLoaderData() as {
		sortOrder: string;
		currentPage: number;
	};
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
		<AuthoringLayout>
			<AuthoringHeader
				filterComponent={
					<CourseFilter
						listView={listView}
						handleListView={handleListFilter}
						sortOrder={sortOrder}
					/>
				}
			/>
			<Grid
				templateColumns={listView ? '1fr' : 'repeat(3, minmax(0, 1fr))'}
				gap={listView ? 2 : 6}
				mb={6}>
				{courseList.items.map((course: Course) => (
					<GridItem colSpan={1} w="100%" color="inherit" key={course.uid}>
						<CourseCard {...course} listView={listView} />
					</GridItem>
				))}
			</Grid>
			<PageNavigatorFooter
				currentPage={currentPage}
				pagesTotalCount={courseList.pagesTotalCount}
				itemsCurrentCount={courseList.items.length}
				itemsTotalCount={courseList.totalCount}
				href="/authoring"
			/>
			<CourseFolderModal />
		</AuthoringLayout>
	);
};

export default AuthoringView;
