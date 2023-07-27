import { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
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
import {
	folderContentsOrder,
	setFolderContentsOrder,
} from '../../../lib/authoring/cookies';
import BulkEditContainer from '../../ui/Authoring/BulkEditContainer';

export const folderDetailsLoader: LoaderFunction = async ({ params }) => {
	const currentPage = params.page ? +params.page : 1;
	const folderUid = params.folderId as string;

	await store.dispatch(
		fetchFolderDetails({
			currentPage,
			folderUid,
			sortOrder: folderContentsOrder(),
		}),
	);

	return json({
		currentPage,
	});
};

const FolderDetailsView = () => {
	const navigate = useNavigate();
	const { currentPage } = useLoaderData() as {
		currentPage: number;
	};
	const { folderId } = useParams();
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

	const handleChangeFolderContentsOrder = (sortOrder: string) => {
		setFolderContentsOrder(sortOrder);
		navigate(`/authoring/folder/${folderId}`);
	};

	return (
		<AuthoringLayout>
			<AuthoringHeader
				filterComponent={
					<CourseFilter
						listView={listView}
						handleListView={handleListFilter}
						breadCrumb={folderDetails.name}
						sortOrder={folderContentsOrder}
						setSortOrder={handleChangeFolderContentsOrder}
					/>
				}
			/>
			<BulkEditContainer>
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
			</BulkEditContainer>
			<PageNavigatorFooter
				currentPage={currentPage}
				pagesTotalCount={folderDetails.pagesTotalCount}
				itemsCurrentCount={folderDetails.courseContents.length}
				itemsTotalCount={folderDetails.totalCount}
				href={`/authoring/folder/${folderId}`}
			/>
			<CourseFolderModal />
		</AuthoringLayout>
	);
};

export default FolderDetailsView;
