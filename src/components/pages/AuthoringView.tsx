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
import { requireUser } from '../../utils/user';
import { getCourseList } from '../../services/authoring';
import { getSubAccount } from '../../services/utils';
import { json, useLoaderData } from 'react-router-dom';
import CourseCard from '../ui/Authoring/CourseCard';

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
	const { courseList } = useLoaderData() as any;

	console.log(courseList);

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
				<Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={6}>
					{courseList.map((course: any) => (
						<GridItem
							colSpan={1}
							w="100%"
							color="inherit"
							key={course.courseContentUid}>
							<CourseCard {...course} />
						</GridItem>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default AuthoringView;