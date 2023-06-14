import { Container, Heading, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import AssignmentList from '../ui/AssignmentList';
import CourseMenu from '../ui/CourseMenu';
import { LoaderFunction } from 'react-router';
import { requireUser } from '../../utils/user';
import { Role } from '../../services/roles';
import {
	getAssignments,
	getCourseList,
	getCurriculaCourseList,
} from '../../services/learning';
import { json, useFetcher, useLoaderData } from 'react-router-dom';
import { serverError } from '../../services/utils';

export type Course = {
	key: string;
	name: string;
};

export const learningLoader: LoaderFunction = async ({ request }) => {
	const user = requireUser();
	const url = new URL(request.url);
	const selectedCourseKey = url.searchParams.get('selectedCourseKey');
	let courseRole = '';
	let subAccount = '';
	user.roles.forEach((role: Role) => {
		courseRole = role.name;
		if (role.name === 'Learner') {
			subAccount = role.accountKey;
		}
	});

	if (selectedCourseKey) {
		// fetcher runs this route again, so we don't need to fetch the data again
		const {
			data: { items: courseList },
		} = await getCourseList(user, courseRole, subAccount);

		const { data: list } = await getCurriculaCourseList(
			user,
			selectedCourseKey,
			subAccount,
		);
		const { data: assignments } = await getAssignments(
			list.items[0].key,
			user,
			subAccount,
		);

		if (assignments.items) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw serverError({
				fields: {},
				errors: {
					fieldErrors: {
						selectedCourseKey: [assignments.items[0].message],
					},
				},
			});
		}

		return json({
			courseList,
			assignments,
			selectedCourseKey,
			subAccount,
			courseRole,
		});
	}

	const {
		data: { items: courseList },
	} = await getCourseList(user, courseRole, subAccount);

	if (courseList.length === 0) {
		return json({
			courseList,
			assignments: null,
			selectedCourseKey: '',
			subAccount,
			courseRole,
		});
	}

	const { data: list } = await getCurriculaCourseList(
		user,
		courseList[0].key,
		subAccount,
	);
	const { data: assignments } = await getAssignments(
		list.items[0].key,
		user,
		subAccount,
	);

	return json({
		courseList,
		assignments,
		selectedCourseKey: courseList[0].key,
		subAccount,
		courseRole,
	});
};

const LearningView = () => {
	const loaderData = useLoaderData() as any;
	const fetcher = useFetcher();
	const data = fetcher.data || loaderData;
	const { t: i18n } = useTranslation();

	return (
		<Container
			id={'learning-dash-main'}
			margin="24px"
			padding="24px"
			maxW="100%"
			minH="80vh"
			width={''}
			overflowY={'hidden'}
			overflowX={'hidden'}
			borderRadius="24px"
			bg="ampWhite"
			boxShadow={
				'0px 100px 80px rgba(0, 0, 0, 0.04), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0161557), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0112458)'
			}>
			<Heading as="h1" marginBottom="24px" margin="12px">
				{
					data.courseList.find(
						(course: Course) => course.key === data.selectedCourseKey,
					).name
				}
			</Heading>
			<HStack
				justifyContent={'space-between'}
				margin="12px"
				marginBottom="24px"
				width="100%"
				maxWidth={'800px'}>
				<Heading as="h2" size="lg">
					{i18n('yourAssignments')}
				</Heading>
				{data.courseList.length > 0 && (
					<CourseMenu
						courseList={data.courseList}
						selectedCourseKey={data.selectedCourseKey}
						courseUpdaterToggle={fetcher}
					/>
				)}
			</HStack>
			<AssignmentList assignments={data.assignments} />
		</Container>
	);
};

export default LearningView;
