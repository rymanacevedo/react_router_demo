import { useEffect } from 'react';
import { Box, Container, Grid, GridItem, useToast } from '@chakra-ui/react';
import { LoaderFunction, ActionFunction } from 'react-router';
import { json, useLoaderData, useActionData } from 'react-router-dom';
import FolderCard from '../../ui/Authoring/FolderCard';
import { requireUser } from '../../../utils/user';
import { getFolderList } from '../../../services/authoring';
import { getSubAccount } from '../../../services/utils';
import { createFolder } from '../../../services/authoring';
import AuthoringHeader from '../../ui/Authoring/AuthoringHeader';
import FolderFilters from '../../ui/Authoring/FolderFilters';

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
	}
};

export const folderLoader: LoaderFunction = async () => {
	const user = requireUser();
	const { courseRole, subAccount } = getSubAccount(user);

	const {
		data: { items: folderList },
	} = await getFolderList(user);

	return json({
		folderList,
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
	const { folderList } = useLoaderData() as any;
	const actionData = useActionData() as any;
	const toast = useToast();

	useEffect(() => {
		if (actionData) {
			if (actionData.status === 201) {
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
		<Box bg="ampNeutral.100" minHeight="100vh" paddingX={6} paddingY={6}>
			<Container
				maxW={1440}
				bg="ampWhite"
				borderRadius="xl"
				paddingY={16}
				paddingX={24}>
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
							/>
						</GridItem>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default FolderView;
