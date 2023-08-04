import React from 'react';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { CheckIcon, LapTimerIcon, StopwatchIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { CourseProgressStatsType } from '../../lib/validator';
import {
	computeTime,
	computeTimeString,
	formatTimestamp,
} from '../../utils/logic';

type CourseProgressStatsPropsType = {
	courseProgressStats: CourseProgressStatsType;
	estimatedLearningTimeLeft: number;
};

const CourseProgressStats = ({
	courseProgressStats,
	estimatedLearningTimeLeft,
}: CourseProgressStatsPropsType) => {
	const { t: i18n } = useTranslation();

	const getBadgeIcon = (status: string) => {
		switch (status) {
			case 'Complete':
				return <CheckIcon />;
			case 'In progress':
				return <LapTimerIcon />;
			case 'Not started':
				return <StopwatchIcon />;
			default:
				return null;
		}
	};

	return (
		<Box
			marginTop={4}
			marginBottom={4}
			bg="white"
			borderRadius="xl"
			p={4}
			w="full"
			h="fit-content"
			flexDirection="column"
			display="flex">
			<Flex justifyContent="space-between" marginBottom={2}>
				<Text>{i18n('startedOn')}</Text>
				<Text>{formatTimestamp(courseProgressStats.startedTime)}</Text>
			</Flex>
			<Flex justifyContent="space-between" alignItems="center" marginBottom={2}>
				<Text>{i18n('courseStats')}</Text>
				<Badge variant="ampNeutral" display="flex" alignItems="center">
					{getBadgeIcon(courseProgressStats.status)}
					<Text marginLeft="2">{courseProgressStats.status}</Text>
				</Badge>
			</Flex>
			<Flex justifyContent="space-between" marginBottom={2}>
				<Text>{i18n('moduleProgress')}</Text>
				<Text>
					{courseProgressStats.completedModuleCount} {i18n('of')}{' '}
					{courseProgressStats.totalModuleCount} {i18n('complete')}
				</Text>
			</Flex>
			<Flex justifyContent="space-between" marginBottom={2}>
				<Text>{i18n('estimatedTimeLeft')}</Text>
				<Text>{`~${computeTime(estimatedLearningTimeLeft)} ${computeTimeString(
					estimatedLearningTimeLeft,
					i18n('minutes'),
					i18n('minute'),
				)}`}</Text>
			</Flex>
		</Box>
	);
};

export default CourseProgressStats;
