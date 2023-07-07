import {
	Box,
	Container,
	Heading,
	Flex,
	Button,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import { PlusIcon } from '@radix-ui/react-icons';
import { LoaderFunction } from 'react-router';
import { json, useLoaderData } from 'react-router-dom';
import FolderCard from '../../ui/Authoring/FolderCard';
import { requireUser } from '../../../utils/user';
import { getFolderList } from '../../../services/authoring';
import { getSubAccount } from '../../../services/utils';

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

	return (
		<Box bg="ampNeutral.100" minHeight="100vh" paddingX={6} paddingY={6}>
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
