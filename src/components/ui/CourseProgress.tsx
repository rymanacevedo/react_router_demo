import {
	Box,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	VisuallyHidden,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import { CourseStatsData } from '../../lib/validator';
import { formatTime, roundNumber } from '../../utils/logic';
import CourseProgressStats from './CourseProgressStats';

const CourseProgress = () => {
	const { t: i18n } = useTranslation();

	const { courseStats, courseProgressStats } =
		useLoaderData() as CourseStatsData;
	return (
		<Box
			w={435}
			h="fit-content"
			bg="ampNeutral.50"
			borderRadius="xl"
			p={4}
			marginLeft={9}
			marginTop={16}>
			<Heading fontSize="lg" marginLeft={2} marginTop={2}>
				{i18n('courseProgress')}
			</Heading>
			<CourseProgressStats courseProgressStats={courseProgressStats} />
			<Table variant="unstyled" size="sm">
				{/* <TableCaption>{i18n('learningStatsTable')}</TableCaption> */}
				<Thead
					borderWidth={1}
					borderColor="lightgray"
					borderTop="none"
					borderRight="none"
					borderLeft="none">
					<Tr>
						<Th width="30%">
							<VisuallyHidden>{i18n('learningStats')}</VisuallyHidden>
						</Th>
						<Th width="225%" textAlign="right" textTransform="capitalize">
							{i18n('you')}
						</Th>
						<Th width="35%" textAlign="right" textTransform="capitalize">
							{i18n('peers')}
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td fontSize="md">{i18n('progress')}</Td>
						<Td textAlign="right" fontSize="md">
							{courseStats.learnerProgress}%
						</Td>
						<Td textAlign="right" fontSize="md">
							{courseStats.averageProgress}%
						</Td>
					</Tr>
					<Tr>
						<Td fontSize="md">{i18n('timeSpent')}</Td>
						<Td textAlign="right" fontSize="md">
							{formatTime(courseStats.learnerTimeSpent)}
						</Td>
						<Td textAlign="right" fontSize="md">
							{formatTime(courseStats.averageTimeSpent)}
						</Td>
					</Tr>
					<Tr>
						<Td whiteSpace="nowrap" fontSize="md">
							{i18n('startingKnowledge')}
						</Td>
						<Td textAlign="right" fontSize="md">
							{courseStats.learnerStartingKnowledge}%
						</Td>
						<Td textAlign="right" fontSize="md">
							{courseStats.averageStartingKnowledge}%
						</Td>
					</Tr>
					<Tr>
						<Td whiteSpace="nowrap" fontSize="md">
							{i18n('refreshersTaken')}
						</Td>
						<Td textAlign="right" fontSize="md">
							{courseStats.learnerNumRefreshers}
						</Td>
						<Td textAlign="right" fontSize="md">
							{roundNumber(courseStats.averageNumRefreshers)}
						</Td>
					</Tr>
				</Tbody>
			</Table>
		</Box>
	);
};

export default CourseProgress;
