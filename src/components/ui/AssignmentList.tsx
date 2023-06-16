import { Key, useState } from 'react';
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
	Text,
	VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { json, useLoaderData, useNavigate } from 'react-router-dom';
import useModuleContentService from '../../services/coursesServices/useModuleContentService';
import { LoaderFunction } from 'react-router';
import {
	getAssignments,
	getCurriculaCourseList,
} from '../../services/learning';
import { requireUser } from '../../utils/user';
import { getSubAccount, serverError } from '../../services/utils';

type Assignment = {
	assignmentType: string;
	assignmentUid: string;
	status: string;
	estimatedTimeToComplete: number;
	assignmentKey: string;
	numLearningUnits: number;
};

export type AssignmentListDataType = {
	displayCurriculum: {
		children: [
			{
				assignments: any[];
				name: Key | null | undefined;
				curriculum: { name: string; assignments: any[] };
			},
		];
	};
};
type Props = {
	assignments: AssignmentListDataType;
};

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
	return json({ assignments });
};

const AssignmentList = () => {
	const { t: i18n } = useTranslation();
	const { assignments } = useLoaderData() as Props;
	const [refreshIsOpen, setRefreshIsOpen] = useState('');
	const { startRefresher } = useModuleContentService();
	const navigate = useNavigate();
	const getAssignmentText = (assignment: Assignment) => {
		if (
			assignment?.assignmentType === 'Assessment' &&
			assignment?.status === 'COMPLETED'
		) {
			return <Text fontSize={'12px'}>{i18n('completedAssessment')}</Text>;
		} else if (assignment?.assignmentType === 'Assessment') {
			return <Text fontSize={'12px'}>{i18n('assessment')}</Text>;
		} else if (assignment?.assignmentType !== 'TimedAssessment') {
			switch (assignment?.status) {
				case 'NOT_STARTED': {
					return (
						<Text fontSize={'12px'}>
							{assignment?.estimatedTimeToComplete &&
								`~${
									Math.floor(assignment?.estimatedTimeToComplete / 60) >= 1
										? Math.floor(assignment?.estimatedTimeToComplete / 60)
										: '1'
								}
							${
								Math.floor(assignment?.estimatedTimeToComplete / 60) > 1
									? i18n('mins')
									: i18n('min')
							}`}
						</Text>
					);
				}
				case 'IN_PROGRESS': {
					return (
						<Text fontSize={'12px'}>
							{`~${
								Math.floor(assignment?.estimatedTimeToComplete / 60) >= 1
									? Math.floor(assignment?.estimatedTimeToComplete / 60)
									: '1'
							}
							${
								Math.floor(assignment?.estimatedTimeToComplete / 60) > 1
									? i18n('mins')
									: i18n('min')
							}
							left`}
						</Text>
					);
				}
				case 'COMPLETED': {
					return <Text fontSize={'12px'}>{i18n('refresherAvailable')}</Text>;
				}
			}
		} else {
			switch (assignment.status) {
				case 'NOT_STARTED': {
					return (
						<Text fontSize={'12px'}>
							{assignment.estimatedTimeToComplete &&
								`${
									Math.floor(assignment.estimatedTimeToComplete / 60) >= 1
										? Math.floor(assignment.estimatedTimeToComplete / 60)
										: '1'
								}	${i18n('minToComplete')}`}
						</Text>
					);
				}
				case 'COMPLETED': {
					return <Text fontSize={'12px'}>{i18n('attempts')}</Text>;
				}
			}
		}
	};

	const handleAssignmentClick = (assignment: Assignment) => () => {
		if (assignment.assignmentType === 'TimedAssessment') {
			if (assignment.status === 'COMPLETED') {
				setRefreshIsOpen(assignment.assignmentKey);
			} else {
				navigate(`/timedAssessment/${assignment.assignmentUid}`);
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
		} else if (
			assignment.assignmentType !== 'TimedAssessment' &&
			assignment.status === 'IN_PROGRESS'
		) {
			navigate(`/learning/assignment/${assignment.assignmentKey}`, {
				state: {
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
	const handleRefresherClick = (assignment: Assignment) => async () => {
		const refresher = await startRefresher(assignment.assignmentKey, false);
		navigate(`/learning/moduleIntro/${refresher.assignmentKey}`);
	};

	const handleReviewClick = (assignment: Assignment) => {
		return () => {
			navigate(`/learning/review/${assignment.assignmentKey}`);
		};
	};

	const handleSmartRefresherClick = (assignment: Assignment) => async () => {
		const smartRefresher = await startRefresher(assignment.assignmentKey, true);
		navigate(`/learning/moduleIntro/${smartRefresher.assignmentKey}`);
	};

	const assignmentList = !assignments
		? null
		: assignments.displayCurriculum.children.map((curriculum, index) => {
				const assignment: Assignment =
					curriculum.assignments[curriculum.assignments.length - 1];
				return (
					<Popover
						key={index}
						returnFocusOnClose={false}
						isOpen={refreshIsOpen === assignment.assignmentKey}
						placement="bottom"
						closeOnBlur={false}>
						<PopoverTrigger>
							<PopoverAnchor>
								<ListItem
									height={'44px'}
									padding={'4px'}
									w="100%"
									key={curriculum.name}
									onClick={handleAssignmentClick(assignment)}>
									<HStack
										justifyContent={'space-between'}
										paddingBottom={'10px'}>
										<Text
											_hover={{
												textDecoration: 'underline',
												color: 'ampPrimary.300',
												cursor: 'pointer',
											}}
											fontSize={'21px'}
											fontWeight={'bold'}>
											{curriculum.name}
										</Text>
										{getAssignmentText(assignment)}
									</HStack>
									{index !==
										assignments.displayCurriculum.children.length - 1 && (
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
								{' '}
								<PopoverArrow position="fixed" top="0" left="0" />
							</Box>{' '}
							<ButtonGroup size="lg" w="100%">
								<VStack>
									{curriculum.assignments[0].assignmentType !==
										'Assessment' && (
										<>
											<Button
												w="320px"
												variant="ghost"
												onClick={handleRefresherClick(
													curriculum.assignments[0],
												)}>
												{i18n('refresher')}
											</Button>
											<Button
												w="320px"
												variant="ghost"
												onClick={handleReviewClick(curriculum.assignments[0])}>
												{i18n('review')}
											</Button>
											<Button
												w="320px"
												variant="ghost"
												onClick={handleSmartRefresherClick(
													curriculum.assignments[0],
												)}>
												{i18n('smartRefresher')}
											</Button>
										</>
									)}
								</VStack>
							</ButtonGroup>
						</PopoverContent>
					</Popover>
				);
		  });

	return !assignments ? (
		<Alert maxWidth={'650px'} status="warning">
			<AlertIcon />
			{i18n('noCoursesAssigned')}
		</Alert>
	) : (
		<List
			spacing={3}
			bg="ampWhite"
			borderRadius={'12px'}
			padding={'16px'}
			margin="12px"
			border={'1px'}
			borderColor={'ampNeutral.300'}
			width="100%"
			minHeight="340px"
			maxWidth={'800px'}
			boxShadow={
				'0px 2px 34px rgba(0, 0, 0, 0.04), 0px 4px 6px rgba(39, 42, 44, 0.02), 0px 6.65px 5.32px rgba(39, 42, 44, 0.0162)'
			}>
			{assignmentList}
		</List>
	);
};

export default AssignmentList;
