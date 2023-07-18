import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridItem } from '@chakra-ui/react';
import { LoaderFunction } from 'react-router';
import { Cookies } from 'react-cookie-consent';
import {
	CourseContent,
	fetchCourses,
	selectCourseList,
} from '../../../store/slices/authoring/coursesViewSlice';
import { json, useLoaderData } from 'react-router-dom';
import CourseCard from '../../ui/Authoring/CourseCard';
import CourseFilter from '../../ui/Authoring/CourseFilters';
import AuthoringHeader from '../../ui/Authoring/AuthoringHeader';
import PageNavigatorFooter from '../../ui/Authoring/PageNavigatorFooter';
import AuthoringLayout from '../../ui/Authoring/AuthoringLayout';
import CourseFolderModal from '../../ui/Authoring/CourseFolderModal';
import { store } from '../../../store/store';

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
	const courseList = useSelector(selectCourseList);
	const { sortOrder, currentPage } = useLoaderData() as {
		sortOrder: string;
		currentPage: number;
	};
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
				{courseList.courseContents.map((courseContent: CourseContent) => (
					<GridItem
						colSpan={1}
						w="100%"
						color="inherit"
						key={courseContent.uid}>
						<CourseCard courseContent={courseContent} listView={listView} />
					</GridItem>
				))}
			</Grid>
			<PageNavigatorFooter
				currentPage={currentPage}
				pagesTotalCount={courseList.pagesTotalCount}
				itemsCurrentCount={courseList.courseContents.length}
				itemsTotalCount={courseList.totalCount}
				href="/authoring"
			/>
			<CourseFolderModal />
		</AuthoringLayout>
	);
};

export default AuthoringView;
