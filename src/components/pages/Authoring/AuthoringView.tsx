import { useState, useEffect } from 'react';
import { Grid, GridItem, useToast } from '@chakra-ui/react';
import { ActionFunction, LoaderFunction } from 'react-router';
import { Cookies } from 'react-cookie-consent';
import { requireUser } from '../../../utils/user';
import { getCourseList } from '../../../services/authoring';
import { getSubAccount } from '../../../services/utils';
import { json, useLoaderData, useActionData } from 'react-router-dom';
import CourseCard from '../../ui/Authoring/CourseCard';
import CourseFilter from '../../ui/Authoring/CourseFilters';
import AuthoringHeader from '../../ui/Authoring/AuthoringHeader';
import { deleteCourse, copyCourse } from '../../../services/authoring';
import PageNavigatorFooter from '../../ui/Authoring/PageNavigatorFooter';
import AuthoringLayout from '../../ui/Authoring/AuthoringLayout';

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

export const authoringLoader: LoaderFunction = async ({ params }) => {
	const user = requireUser();
	const { courseRole, subAccount } = getSubAccount(user);

	const coursesPerPage = 24;
	const currentPage = params.page ? +params.page : 1;

	const {
		data: { items: courseList, totalCount: coursesTotalCount },
	} = await getCourseList(user, currentPage, coursesPerPage);

	return json({
		courseList,
		coursesTotalCount,
		currentPage,
		pagesTotalCount: Math.floor(
			(coursesTotalCount + coursesPerPage - 1) / coursesPerPage,
		),
		selectedCourseKey: null,
		subAccount,
		courseRole,
	});
};

const AuthoringView = () => {
	const actionData = useActionData() as any;
	const { courseList, coursesTotalCount, currentPage, pagesTotalCount } =
		useLoaderData() as any;
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
					<CourseFilter listView={listView} handleListView={handleListFilter} />
				}
			/>
			<Grid
				templateColumns={listView ? '1fr' : 'repeat(3, minmax(0, 1fr))'}
				gap={listView ? 2 : 6}
				mb={6}>
				{courseList.map((course: any) => (
					<GridItem colSpan={1} w="100%" color="inherit" key={course.uid}>
						<CourseCard {...course} listView={listView} />
					</GridItem>
				))}
			</Grid>
			<PageNavigatorFooter
				currentPage={currentPage}
				pagesTotalCount={pagesTotalCount}
				itemsCurrentCount={courseList.length}
				itemsTotalCount={coursesTotalCount}
				href="/authoring"
			/>
		</AuthoringLayout>
	);
};

export default AuthoringView;
