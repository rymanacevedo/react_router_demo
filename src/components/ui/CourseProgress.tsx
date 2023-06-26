import {
	Box,
	Divider,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VisuallyHidden,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import { formatTime, roundNumber } from '../../utils/logic';

const CourseProgress = () => {
	const { t: i18n } = useTranslation();

	const { courseStats } = useLoaderData() as any;

	return (
		<>
			{courseStats && (
				<Box
					w={435}
					h="fit-content"
					bg="ampNeutral.50"
					borderRadius="12px"
					p={4}
					marginLeft="36px"
					marginTop="10px">
					<Text
						fontSize="21px"
						fontWeight={600}
						marginLeft="8px"
						marginTop="8px">
						{i18n('courseProgress')}
					</Text>
					<Table variant="unstyled" size="sm">
						<Thead>
							<Tr>
								<Th width="30%"> </Th>
								<Th width="225%" textAlign="right" textTransform={'capitalize'}>
									{i18n('you')}
								</Th>
								<Th width="35%" textAlign="right" textTransform={'capitalize'}>
									{i18n('peers')}
								</Th>
							</Tr>
						</Thead>
						<Divider width={'225%'} position="sticky" marginTop={'8px'} />
						<Tbody>
							<VisuallyHidden>learning stats</VisuallyHidden>
							<Tr>
								<Td fontSize="16px">{i18n('progress')}</Td>
								<Td textAlign="right" fontSize="16px">
									{courseStats.learnerProgress}%
								</Td>
								<Td textAlign="right" fontSize="16px">
									{courseStats.averageProgress}%
								</Td>
							</Tr>
							<Tr>
								<Td fontSize="16px">{i18n('timeSpent')}</Td>
								<Td textAlign="right" fontSize="16px">
									{formatTime(courseStats.learnerTimeSpent)}
								</Td>
								<Td textAlign="right" fontSize="16px">
									{formatTime(courseStats.averageTimeSpent)}
								</Td>
							</Tr>
							<Tr>
								<Td whiteSpace="nowrap" fontSize="16px">
									{i18n('startingKnowledge')}
								</Td>
								<Td textAlign="right" fontSize="16px">
									{courseStats.learnerStartingKnowledge}%
								</Td>
								<Td textAlign="right" fontSize="16px">
									{courseStats.averageStartingKnowledge}%
								</Td>
							</Tr>
							<Tr>
								<Td whiteSpace="nowrap" fontSize="16px">
									{i18n('refreshersTaken')}
								</Td>
								<Td textAlign="right" fontSize="16px">
									{courseStats.learnerNumRefreshers}
								</Td>
								<Td textAlign="right" fontSize="16px">
									{roundNumber(courseStats.averageNumRefreshers)}
								</Td>
							</Tr>
						</Tbody>
					</Table>
				</Box>
			)}
		</>
	);
};

export default CourseProgress;
