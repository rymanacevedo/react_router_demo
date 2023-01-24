import { Key, useEffect, useState } from 'react';
import {
	Alert,
	AlertIcon,
	Divider,
	HStack,
	List,
	ListItem,
	Spinner,
	Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useCourseCurriculaListService from '../../services/coursesServices/useCourseCurriculaListService';
import useAssignmentByUserAssociations from '../../services/useAssignmentByUserAssociations';

type AssignmentType = {
	assignmentType: string;
	status: string;
	estimatedTimeToComplete: number;
};

type AssignmentListDataType = {
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
type SelectedCourseKeyType = {
	selectedCourseKey: string;
};

const AssignmentList = ({ selectedCourseKey }: SelectedCourseKeyType) => {
	const { t: i18n } = useTranslation();
	const { getCurriculaCourseList } = useCourseCurriculaListService();
	const { getAssignments } = useAssignmentByUserAssociations();
	const [assignmentListData, setAssignmentsListData] =
		useState<AssignmentListDataType>({
			displayCurriculum: {
				children: [
					{
						assignments: [],
						name: '',
						curriculum: { name: '', assignments: [] },
					},
				],
			},
		});
	const [courseDataLoaded, setCourseDataLoaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const curicCourseList = await getCurriculaCourseList(selectedCourseKey);
			if (curicCourseList.items.length) {
				const assignments = await getAssignments(curicCourseList.items[0].key);
				if (assignments?.displayCurriculum) {
					setAssignmentsListData(assignments);
					setCourseDataLoaded(true);
				}
			}
		};
		if (selectedCourseKey) {
			fetchData();
		}
	}, [selectedCourseKey]);

	const getAssignmentText = (assignment: AssignmentType) => {
		if (assignment?.assignmentType !== 'TimedAssessment') {
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
					break;
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
					break;
				}
				case 'COMPLETED': {
					return <Text fontSize={'12px'}>{i18n('refresherAvailable')}</Text>;
					break;
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
					break;
				}
				case 'COMPLETED': {
					return <Text fontSize={'12px'}>{i18n('attempts')}</Text>;
					break;
				}
			}
		}
	};

	const assignmentList = assignmentListData?.displayCurriculum.children.map(
		(curriculum, index) => {
			const assignment =
				curriculum.assignments[curriculum.assignments.length - 1];

			return (
				<ListItem
					height={'44px'}
					padding={'4px'}
					key={curriculum.name}
					onClick={() => {
						if (assignment.assignmentType !== 'TimedAssessment') {
							navigate(`moduleIntro/${assignment.assignmentKey}`);
						}
					}}>
					<HStack justifyContent={'space-between'} paddingBottom={'10px'}>
						<Text
							_hover={{
								textDecoration: 'underline',
								color: 'ampPrimary.300 ',
								cursor: 'pointer',
							}}
							fontSize={'21px'}
							fontWeight={'bold'}>
							{curriculum.name}
						</Text>
						{getAssignmentText(assignment)}
					</HStack>
					{index !==
						assignmentListData?.displayCurriculum.children.length - 1 && (
						<Divider
							borderWidth="1px"
							borderStyle="solid"
							borderRadius="10"
							borderColor="#AFB3B4"
						/>
					)}
				</ListItem>
			);
		},
	);
	return assignmentListData.displayCurriculum.children[0].assignments.length ? (
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
	) : courseDataLoaded ? (
		<Alert maxWidth={'650px'} status="warning">
			<AlertIcon />
			{i18n('noCoursesAssigned')}
		</Alert>
	) : (
		<Spinner />
	);
};

export default AssignmentList;
