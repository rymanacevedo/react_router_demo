import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';
import { getCourseStats } from '../../services/learning';
import { formatTime } from '../../utils/logic';
import { requireUser } from '../../utils/user';

type CourseProgressProps = {
	courseStats?: any; //TODO: add a type for this
	selectedCourseKey: string | null;
};

const CourseProgress = ({ selectedCourseKey }: CourseProgressProps) => {
	const { t: i18n } = useTranslation();
	const [courseStats, setCourseStats] = useState<any>(null);
	console.log(selectedCourseKey);
	const user = requireUser();
	// TODO: add translations
	// clean up the <Text> attributes

	useEffect(() => {
		const fetchCourseStats = async () => {
			if (selectedCourseKey) {
				const learnerKey = Cookies.get('learnerKey');
				try {
					const response = await getCourseStats(
						user,
						selectedCourseKey,
						learnerKey,
					);
					console.log(response);
					const { data } = response;
					setCourseStats(data);
				} catch (error) {
					console.error(error);
				}
			}
		};

		fetchCourseStats();
	}, [selectedCourseKey]);
	console.log(courseStats);
	return (
		<>
			{courseStats && (
				<Box
					w={435}
					h="fit-content"
					bg="#F5F5F5"
					borderRadius="12px"
					p={4}
					marginLeft="36px"
					marginTop="10px">
					<Text fontSize="21px" fontWeight={600} margin={'8px'}>
						{i18n('courseProgress')}
					</Text>
					<Box
						fontSize="16px"
						fontWeight={600}
						display="flex"
						flexDirection="row"
						alignItems="center"
						marginTop="16px">
						<Text marginLeft={'auto'}>{i18n('you')}</Text>
						<Text
							color="var(--text-dark-secondary, #283C58)"
							textAlign="right"
							width="80px"
							marginRight="8px"
							flexShrink={0}>
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
						<Text marginLeft="20px" fontSize="16px">
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
							{courseStats.averageNumRefreshers}
						</Text>
					</Flex>
				</Box>
			)}
		</>
	);
};

export default CourseProgress;
