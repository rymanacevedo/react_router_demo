import { Children, isValidElement, ReactNode, useState } from 'react';
import {
	Alert,
	AlertIcon,
	Box,
	Button,
	ButtonGroup,
	Divider,
	HStack,
	List,
	ListItem,
	Popover,
	PopoverAnchor,
	PopoverArrow,
	PopoverContent,
	PopoverTrigger,
	Tab,
	TabIndicator,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { json, useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import { LoaderFunction } from 'react-router';
import {
	getAssignments,
	getCourseProgressStats,
	getCourseStats,
	getCurriculaCourseList,
	getFullModuleWithQuestions,
} from '../../services/learning';
import { requireUser } from '../../utils/user';
import { getSubAccount, serverError } from '../../services/utils';
import {
	AssignmentData,
	CourseAssignmentData,
	Curriculum,
} from '../../lib/validator';
import {
	calculateLearningTimeLeft,
	computeTime,
	computeTimeString,
} from '../../utils/logic';

export const assignmentListLoader: LoaderFunction = async ({ params }) => {
	const selectedCourseKey = params.selectedCourseKey!;
	const user = requireUser();
	const { subAccount } = getSubAccount(user);
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

	const { data: courseStats } = await getCourseStats(
		user,
		selectedCourseKey,
		user.userKey,
	);

	const { data: courseProgressStats } = await getCourseProgressStats(
		user,
		selectedCourseKey,
		user.userKey,
	);

	const estimatedLearningTimeLeft = calculateLearningTimeLeft(assignments);

	if (assignments.items) {
		// eslint-disable-next-line @typescript-eslint/no-throw-literal
		throw serverError({
			fields: {},
			errors: {
				fieldErrors: {
					curriculumKey: [assignments.items[0].message],
				},
			},
		});
	}

	return json({
		assignments,
		courseStats,
		user,
		subAccount,
		courseProgressStats,
		estimatedLearningTimeLeft,
	});
};

const AssignmentList = () => {
	const { t: i18n } = useTranslation();
	const { assignments, user, subAccount } =
		useLoaderData() as CourseAssignmentData;
	const [refreshIsOpen, setRefreshIsOpen] = useState('');
	const fetcher = useFetcher();
	const navigate = useNavigate();
	const getAssignmentText = (assignment: AssignmentData) => {
		if (
			assignment?.assignmentType === 'Assessment' &&
			assignment?.status === 'COMPLETED'
		) {
			return <Text fontSize="xs">{i18n('completedAssessment')}</Text>;
		} else if (assignment?.assignmentType === 'Assessment') {
			return <Text fontSize="xs">{i18n('assessment')}</Text>;
		} else if (assignment?.assignmentType !== 'TimedAssessment') {
			switch (assignment?.status) {
				case 'NOT_STARTED': {
					return (
						<Text fontSize="xs">
							{assignment?.estimatedTimeToComplete &&
								`~${computeTime(
									assignment.estimatedTimeToComplete,
								)} ${computeTimeString(
									assignment.estimatedTimeToComplete,
									i18n('minutes'),
									i18n('minute'),
								)}`}
						</Text>
					);
				}
				case 'IN_PROGRESS': {
					return (
						<Text fontSize="xs">
							{`~${computeTime(
								assignment.estimatedTimeToComplete,
							)} ${computeTimeString(
								assignment.estimatedTimeToComplete,
								i18n('minutes'),
								i18n('minute'),
							)} left`}
						</Text>
					);
				}
				case 'COMPLETED': {
					return <Text fontSize="xs">{i18n('refresherAvailable')}</Text>;
				}
			}
		} else {
			switch (assignment.status) {
				case 'NOT_STARTED': {
					return (
						<Text fontSize="xs">
							{assignment.estimatedTimeToComplete &&
								`${computeTime(assignment.estimatedTimeToComplete)}	${i18n(
									'minToComplete',
								)}`}
						</Text>
					);
				}
				case 'COMPLETED': {
					return <Text fontSize="xs">{i18n('attempts')}</Text>;
				}
			}
		}
	};

	const handleAssignmentClick = (assignment: AssignmentData) => async () => {
		const { moduleInfoAndQuestions } = await getFullModuleWithQuestions(
			user,
			subAccount,
			assignment.assignmentUid,
		);
		if (assignment.assignmentType === 'TimedAssessment') {
			if (assignment.status === 'COMPLETED') {
				if (refreshIsOpen) {
					setRefreshIsOpen('');
				} else {
					setRefreshIsOpen(assignment.assignmentKey);
				}
			} else if (assignment.status === 'NOT_STARTED') {
				if (moduleInfoAndQuestions.introductionRc) {
					navigate(
						`/learning/timedAssessment/moduleIntro/${assignment.assignmentKey}`,
						{
							state: {
								assignmentUid: assignment.assignmentUid,
								numLearningUnits: assignment.numLearningUnits,
								estimatedTimeToComplete: assignment.estimatedTimeToComplete,
							},
						},
					);
				} else {
					navigate(`/learning/timedAssessment/${assignment.assignmentUid}`);
				}
			} else {
				navigate(`/learning/timedAssessment/${assignment.assignmentUid}`);
			}
		} else if (assignment.status === 'COMPLETED') {
			if (refreshIsOpen) {
				setRefreshIsOpen('');
			} else {
				setRefreshIsOpen(assignment.assignmentKey);
			}
		} else if (
			assignment.assignmentType !== 'TimedAssessment' &&
			assignment.status === 'NOT_STARTED'
		) {
			navigate(`/learning/moduleIntro/${assignment.assignmentKey}`, {
				state: {
					numberOfLearningUnits: assignment.numLearningUnits,
					estimatedTimeToComplete: assignment.estimatedTimeToComplete,
				},
			});
		} else {
			navigate(`/learning/assignment/${assignment.assignmentKey}`, {
				state: {
					estimatedTimeToComplete: assignment.estimatedTimeToComplete,
				},
			});
		}
	};
	const handleRefresherClick = (assignment: AssignmentData) => async () => {
		fetcher.submit(
			{ isFocused: 'false' },
			{
				method: 'POST',
				action: `/api/refresher?assignmentKey=${assignment.assignmentKey}`,
			},
		);
	};

	const handleReviewClick = (assignment: AssignmentData) => {
		return () => {
			navigate(`/learning/review/${assignment.assignmentKey}`);
		};
	};

	const handleSmartRefresherClick =
		(assignment: AssignmentData) => async () => {
			fetcher.submit(
				{ isFocused: 'true' },
				{
					method: 'POST',
					action: `/api/refresher?assignmentKey=${assignment.assignmentKey}`,
				},
			);
		};

	const Assignment = (
		index: number,
		assignment: AssignmentData | null,
		curriculum: Curriculum,
	) => {
		if (!assignment) return null;
		return (
			<Popover
				key={index}
				returnFocusOnClose={false}
				isOpen={refreshIsOpen === assignment.assignmentKey}
				placement="bottom"
				closeOnBlur={false}
				data-status={assignment.status}>
				<PopoverTrigger>
					<PopoverAnchor>
						<ListItem
							height={'44px'}
							padding={1}
							w="100%"
							key={curriculum.name}
							onClick={handleAssignmentClick(assignment)}>
							<HStack justifyContent={'space-between'} paddingBottom={2.5}>
								<Text
									_hover={{
										textDecoration: 'underline',
										color: 'ampPrimary.300',
										cursor: 'pointer',
									}}
									fontSize="lg"
									fontWeight="bold">
									{curriculum.name}
								</Text>
								{getAssignmentText(assignment)}
							</HStack>
							{index !== assignments?.displayCurriculum.children.length - 1 && (
								<Divider
									borderWidth="1px"
									borderStyle="solid"
									borderRadius="10"
									borderColor="#AFB3B4"
								/>
							)}
						</ListItem>
					</PopoverAnchor>
				</PopoverTrigger>
				<PopoverContent marginRight={'200px'}>
					<Box position="fixed" top="0px" left="20px">
						<PopoverArrow position="fixed" top="0" left="0" />
					</Box>
					<ButtonGroup size="lg" w="100%">
						<VStack>
							{assignment.assignmentType === 'TimedAssessment' ? (
								<>
									<Button
										w="320px"
										variant="ghost"
										onClick={() =>
											navigate(
												`/learning/timedAssessment/${assignment.assignmentUid}?retake=true`,
											)
										}>
										{i18n('retakePracticeTest')}
									</Button>
									<Button
										w="320px"
										variant="ghost"
										onClick={() =>
											navigate(
												`/learning/timedAssessment/${assignment.assignmentUid}/results`,
											)
										}>
										{i18n('results')}
									</Button>
								</>
							) : assignment.assignmentType !== 'Assessment' ? (
								<>
									<Button
										w="320px"
										variant="ghost"
										onClick={handleRefresherClick(assignment)}>
										{i18n('refresher')}
									</Button>
									<Button
										w="320px"
										variant="ghost"
										onClick={handleReviewClick(assignment)}>
										{i18n('review')}
									</Button>
									<Button
										w="320px"
										variant="ghost"
										onClick={handleSmartRefresherClick(assignment)}>
										{i18n('smartRefresher')}
									</Button>
								</>
							) : null}
						</VStack>
					</ButtonGroup>
				</PopoverContent>
			</Popover>
		);
	};

	const mapAssignmentsRecursively = (
		curriculumChildren: Curriculum[],
		index: number,
	): ReactNode[] => {
		return curriculumChildren.map((curriculum, i) => {
			if (curriculum.children && curriculum.children.length > 0) {
				// Recursive call to go deeper into the structure
				return mapAssignmentsRecursively(curriculum.children, index + i);
			} else {
				// Base case: no more children, return the Assignment component
				if (curriculum.assignments && curriculum.assignments.length > 0) {
					const currentAssignment = curriculum.assignments[0];
					// TODO: shadow questions?
					return Assignment(index + i, currentAssignment, curriculum);
				}
				return null;
			}
		});
	};

	const assignmentList = !assignments
		? null
		: mapAssignmentsRecursively(assignments.displayCurriculum.children, 0);

	const filterByStatus = (status: string) => {
		return Children.toArray(assignmentList).filter((child) => {
			if (isValidElement(child)) {
				return child.props['data-status'] === status;
			} else {
				return null;
			}
		});
	};

	const ListContainer = ({
		unfilteredAssignmentList,
		filterStatus,
	}: {
		unfilteredAssignmentList?: ReactNode[] | null;
		filterStatus?: string;
	}) => {
		return (
			<List
				spacing={3}
				bg="ampWhite"
				borderRadius="xl"
				padding={4}
				margin={3}
				mt={6}
				borderWidth="1px"
				borderColor={'ampNeutral.300'}
				width="100%"
				minHeight="340px"
				maxWidth={'800px'}
				boxShadow={
					'0px 2px 34px rgba(0, 0, 0, 0.04), 0px 4px 6px rgba(39, 42, 44, 0.02), 0px 6.65px 5.32px rgba(39, 42, 44, 0.0162)'
				}>
				{filterStatus ? filterByStatus(filterStatus) : unfilteredAssignmentList}
			</List>
		);
	};

	return !assignments ? (
		<Alert maxWidth={'650px'} status="warning">
			<AlertIcon />
			{i18n('noCoursesAssigned')}
		</Alert>
	) : (
		<Tabs w="50%" variant="unstyled">
			<TabList>
				<Tab px={0} mr={6} ml={6}>
					{i18n('allModules')}
				</Tab>
				<Tab px={0} mr={6}>
					{i18n('notStarted')}
				</Tab>
				<Tab px={0} mr={6}>
					{i18n('inProgress')}
				</Tab>
				<Tab px={0} mr={6}>
					{i18n('completed')}
				</Tab>
			</TabList>

			<TabIndicator
				mt={-1}
				height={0.5}
				bg="ampPrimaryText"
				borderRadius="1px"
				maxW="83px"
			/>

			<TabPanels>
				<TabPanel p={0}>
					<ListContainer unfilteredAssignmentList={assignmentList} />
				</TabPanel>
				<TabPanel p={0}>
					<ListContainer filterStatus="NOT_STARTED" />
				</TabPanel>
				<TabPanel p={0}>
					<ListContainer filterStatus="IN_PROGRESS" />
				</TabPanel>
				<TabPanel p={0}>
					<ListContainer filterStatus="COMPLETED" />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default AssignmentList;
