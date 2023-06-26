import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCourseStats } from '../../services/learning';
import { formatTime, roundNumber } from '../../utils/logic';
import { requireUser } from '../../utils/user';
import { CourseStatsType } from '../pages/LearningView/LearningViewTypes';

type CourseProgressProps = {
	selectedCourseKey: string | null;
};

const CourseProgress = ({ selectedCourseKey }: CourseProgressProps) => {
	const { t: i18n } = useTranslation();
	const [courseStats, setCourseStats] = useState<CourseStatsType | null>(null);

	const user = requireUser();

	useEffect(() => {
		const fetchCourseStats = async () => {
			if (selectedCourseKey) {
				try {
					const response = await getCourseStats(
						user,
						selectedCourseKey,
						user.userKey,
					);

					const { data } = response;
					setCourseStats(data);
				} catch (error) {
					console.error(error);
				}
			}
		};

		fetchCourseStats();
	}, [selectedCourseKey]);

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
						margin={'8px'}
						marginBottom="0px">
						{i18n('courseProgress')}
					</Text>
					<Box
						fontSize="12px"
						fontWeight={600}
						display="flex"
						flexDirection="row"
						alignItems="center">
						<Text marginLeft={'auto'}>{i18n('you')}</Text>
						<Text textAlign="right" width="80px" marginRight="8px">
							{i18n('peers')}
						</Text>
					</Box>
					<Divider marginTop="8px" />
					<Flex alignItems="center" marginTop="8px">
						<Text flex="1" fontSize="16px" marginLeft="4px">
							{i18n('progress')}
						</Text>
						<Text fontSize="16px">{courseStats.learnerProgress}%</Text>
						<Text marginLeft="40px" fontSize="16px">
							{courseStats.averageProgress}%
						</Text>
					</Flex>
					<Flex alignItems="center" marginTop="8px">
						<Text
							marginLeft="4px"
							flex="2"
							display="flex"
							width="219px"
							flexDirection="column"
							fontSize="16px">
							{i18n('timeSpent')}
						</Text>
						<Text fontSize="16px">
							{formatTime(courseStats.learnerTimeSpent)}
						</Text>
						<Text
							marginLeft={courseStats.learnerTimeSpent > 61 ? '15px' : '45px'}
							fontSize="16px">
							{formatTime(courseStats.averageTimeSpent)}
						</Text>
					</Flex>

					<Flex alignItems="center" marginTop="8px">
						<Text
							marginLeft="4px"
							flex="2"
							display="flex"
							width="219px"
							flexDirection="column"
							fontSize="16px">
							{i18n('startingKnowledge')}
						</Text>
						<Text fontSize="16px">{courseStats.learnerStartingKnowledge}%</Text>
						<Text marginLeft="40px" fontSize="16px">
							{courseStats.averageStartingKnowledge}%
						</Text>
					</Flex>
					<Flex alignItems="center" marginTop="8px">
						<Text
							marginLeft="4px"
							flex="2"
							display="flex"
							width="219px"
							flexDirection="column"
							fontSize="16px">
							{i18n('refreshersTaken')}
						</Text>
						<Text fontSize="16px">{courseStats.learnerNumRefreshers}</Text>
						<Text marginLeft="60px" fontSize="16px">
							{roundNumber(courseStats.averageNumRefreshers)}
						</Text>
					</Flex>
				</Box>
			)}
		</>
	);
};

export default CourseProgress;
