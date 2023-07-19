import { useState } from 'react';
import { json } from 'react-router-dom';
import { LoaderFunction } from 'react-router';
import { useLoaderData, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie-consent';
import { Grid, GridItem } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import AuthoringLayout from '../../ui/Authoring/AuthoringLayout';
import AuthoringHeader from '../../ui/Authoring/AuthoringHeader';
import CourseFilter from '../../ui/Authoring/CourseFilters';
import CourseCard from '../../ui/Authoring/CourseCard';
import PageNavigatorFooter from '../../ui/Authoring/PageNavigatorFooter';
import CourseFolderModal from '../../ui/Authoring/CourseFolderModal';
import {
	fetchFolderDetails,
	selectFolderDetails,
} from '../../../store/slices/authoring/foldersSlice';
import { store } from '../../../store/store';
import { CourseContent } from '../../../store/slices/authoring/coursesViewSlice';

export const folderDetailsLoader: LoaderFunction = async ({
	params,
	request,
}) => {
	const currentPage = params.page ? +params.page : 1;
	const sortOrder = new URL(request.url).searchParams.get('sort') || 'a';
	const folderUid = params.id as string;

	await store.dispatch(
		fetchFolderDetails({ currentPage, folderUid, sortOrder }),
	);

	return json({
		currentPage,
		sortOrder,
	});
};

const FolderDetailsView = () => {
	const { currentPage, sortOrder } = useLoaderData() as {
		currentPage: number;
		sortOrder: string;
	};
	const { id } = useParams();
	const folderDetails = useSelector(selectFolderDetails);
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
						breadCrumb={folderDetails.name}
					/>
				}
			/>
			<Grid
				templateColumns={listView ? '1fr' : 'repeat(3, minmax(0, 1fr))'}
				gap={listView ? 2 : 6}
				mb={6}>
				{folderDetails.courseContents.map((course: CourseContent) => (
					<GridItem colSpan={1} w="100%" color="inherit" key={course.uid}>
						<CourseCard
							courseContent={course}
							listView={listView}
							folderUid={folderDetails.uid}
						/>
					</GridItem>
				))}
			</Grid>
			<PageNavigatorFooter
				currentPage={currentPage}
				pagesTotalCount={folderDetails.pagesTotalCount}
				itemsCurrentCount={folderDetails.courseContents.length}
				itemsTotalCount={folderDetails.totalCount}
				href={`/authoring/folders/folder/${id}`}
			/>
			<CourseFolderModal />
		</AuthoringLayout>
	);
};

export default FolderDetailsView;
