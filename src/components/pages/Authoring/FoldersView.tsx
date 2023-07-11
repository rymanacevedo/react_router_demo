import { useEffect } from 'react';
import { Grid, GridItem, useToast } from '@chakra-ui/react';
import { LoaderFunction, ActionFunction } from 'react-router';
import { json, useLoaderData, useActionData } from 'react-router-dom';
import FolderCard from '../../ui/Authoring/FolderCard';
import { requireUser } from '../../../utils/user';
import { getFolderList } from '../../../services/authoring';
import { getSubAccount } from '../../../services/utils';
import { createFolder, deleteFolder } from '../../../services/authoring';
import AuthoringHeader from '../../ui/Authoring/AuthoringHeader';
import FolderFilters from '../../ui/Authoring/FolderFilters';
import PageNavigatorFooter from '../../ui/Authoring/PageNavigatorFooter';
import AuthoringLayout from '../../ui/Authoring/AuthoringLayout';

export const folderActions: ActionFunction = async ({ request }) => {
	const user = requireUser();
	let formData = await request.formData();
	let intent = formData.get('intent');

	if (intent === 'createFolder') {
		const name = formData.get('name')?.toString() ?? '';
		const description = formData.get('description')?.toString() ?? '';

		const { response } = await createFolder(user, {
			name,
			description,
		});

		const { status, statusText } = response;

		if (response.status === 201) {
			return json({
				ok: true,
				status,
				statusText,
				toastMessage: 'Folder Created',
			});
		} else {
			return json({
				ok: false,
				status,
				statusText,
				toastMessage: 'Folder Creation Failure',
			});
		}
	} else if (intent === 'deleteFolder') {
		const folderUid = formData.get('folderUid')?.toString();
		if (folderUid) {
			const { response } = await deleteFolder(user, folderUid);
			const { status, statusText } = response;
			if (response.status === 200) {
				return json({
					ok: true,
					status,
					statusText,
					toastMessage: 'Folder Deleted',
				});
			} else {
				return json({
					ok: false,
					status,
					statusText,
					toastMessage: 'Folder Delete Failure',
				});
			}
		} else {
			return json({
				ok: false,
				toastMessage: 'Folder Delete Failure',
			});
		}
	}
};

export const folderLoader: LoaderFunction = async ({ params }) => {
	const user = requireUser();
	const { courseRole, subAccount } = getSubAccount(user);

	const foldersPerPage = 3;
	const currentPage = params['page'] ? +params['page'] : 1;

	const {
		data: { items: folderList, totalCount: foldersTotalCount },
	} = await getFolderList(user, currentPage, foldersPerPage);

	return json({
		folderList,
		foldersTotalCount,
		currentPage,
		pagesTotalCount: Math.floor(
			(foldersTotalCount + foldersPerPage - 1) / foldersPerPage,
		),
		selectedCourseKey: null,
		subAccount,
		courseRole,
	});
};

export interface Folder {
	name: string;
	description?: string;
	uid: string;
	usageCount: number;
}

const FolderView = () => {
	const { folderList, foldersTotalCount, currentPage, pagesTotalCount } =
		useLoaderData() as any;
	const actionData = useActionData() as any;
	const toast = useToast();

	useEffect(() => {
		if (actionData) {
			if (actionData.status === 200 || actionData.status === 201) {
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
			<AuthoringHeader filterComponent={<FolderFilters />} />
			<Grid
				templateColumns="repeat(3, minmax(0, 1fr))"
				gap="calc(1.5rem + 1rem)"
				mb={6}>
				{folderList.map((folder: Folder) => (
					<GridItem colSpan={1} w="100%" color="inherit" key={folder.uid}>
						<FolderCard
							name={folder.name}
							description={folder.description}
							usageCount={folder.usageCount}
							uid={folder.uid}
						/>
					</GridItem>
				))}
			</Grid>
			<PageNavigatorFooter
				currentPage={currentPage}
				pagesTotalCount={pagesTotalCount}
				itemsCurrentCount={folderList.length}
				itemsTotalCount={foldersTotalCount}
				href="/authoring/folders"
			/>
		</AuthoringLayout>
	);
};

export default FolderView;
