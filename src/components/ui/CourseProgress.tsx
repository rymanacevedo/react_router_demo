import {
	Box,
	Divider,
	Heading,
	Table,
	TableCaption,
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

const CourseProgress = () => {
	const { t: i18n } = useTranslation();

	const { courseStats } = useLoaderData() as CourseStatsData;

	return (
		<>
			<Box
				w={435}
				h="fit-content"
				bg="ampNeutral.50"
				borderRadius="12px"
				p={4}
				marginLeft="36px"
				marginTop="10px">
				<Heading size={'lg'} marginLeft={'8px'} marginTop={'8px'}>
					{i18n('courseProgress')}
				</Heading>

				<Table variant="unstyled" size="sm">
					<VisuallyHidden>
						<TableCaption>{i18n('learningStatsTable')}</TableCaption>
					</VisuallyHidden>
					<Thead>
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
					<Divider
						width="220%"
						position="sticky"
						marginTop="8px"
						marginLeft="12px"
					/>
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
		</>
	);
};

export default CourseProgress;
