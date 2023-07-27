import {
	Card,
	CardHeader,
	CardBody,
	Flex,
	Badge,
	Text,
	Heading,
	useTheme,
	Checkbox,
	LinkBox,
	LinkOverlay,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate } from '../../../lib/utils';
import CourseCardDropdownMenu from './CourseCardDropdownMenu';
import { CourseContent } from '../../../store/slices/authoring/coursesViewSlice';
import { selectCoursesBulkEditingEnabled } from '../../../store/slices/authoring/bulkEditingSlice';
import CourseAlertBadge from './CourseAlertBadge';

interface CourseCardProps {
	courseContent: CourseContent;
	listView: boolean;
	folderUid?: string;
}

const CourseCard = ({
	courseContent,
	listView,
	folderUid,
}: CourseCardProps) => {
	const statusBadgeVariant = {
		Draft: 'ampWarning',
		Published: 'ampDarkSuccess',
	};

	const {
		status,
		name,
		modifiedTime,
		modifiedUserFullName,
		uid,
		learningUnitCount,
		moduleCount,
		hasRecommendations,
		hasIssues,
		hasUnpublishedEdits,
	} = courseContent;

	const bulkEditingEnabled = useSelector(selectCoursesBulkEditingEnabled);

	const { colors } = useTheme();

	const { month, day, year } = formatDate(modifiedTime);

	const isPublished = status === 'Published';

	return (
		<LinkBox height="100%">
			<Card
				variant="authoringCard"
				direction={listView ? 'row' : 'column'}
				justifyContent="space-between"
				role="group"
				height="100%">
				<CardHeader
					width="100%"
					marginBottom={listView ? 0 : 4}
					maxWidth={listView ? 500 : 'auto'}>
					<Flex
						width="100%"
						direction={listView ? 'row' : 'column'}
						gap={4}
						position="relative">
						<Flex
							alignItems="center"
							justifyContent="space-between"
							position="relative">
							<Flex gap={3}>
								{bulkEditingEnabled ? (
									<Checkbox value={uid} variant="formCheckbox" />
								) : null}
								<Badge
									variant={statusBadgeVariant[status]}
									textTransform="capitalize">
									{status}
								</Badge>
							</Flex>
							{!listView && !bulkEditingEnabled && (
								<CourseCardDropdownMenu
									uid={uid}
									isPublished={isPublished}
									folderUid={folderUid}
								/>
							)}
						</Flex>
						<LinkOverlay
							as={RouterLink}
							to={`/authoring/course/${uid}`}
							textDecoration="none"
							color="ampPrimaryText">
							<Heading
								fontWeight="semibold"
								fontSize="lg"
								as="h2"
								noOfLines={listView ? 1 : 2}>
								{name}
							</Heading>
						</LinkOverlay>
					</Flex>
				</CardHeader>
				<CardBody width={listView ? 'auto' : '100%'}>
					<Flex
						justifyContent={'space-between'}
						height="100%"
						alignItems="flex-end">
						<Flex
							height="100%"
							alignItems="flex-start"
							flexDirection={listView ? 'row' : 'column'}
							justifyContent="flex-end"
							gap={listView ? 1 : 0}>
							<Flex
								marginBottom={listView ? 0 : 2}
								marginRight={listView ? 5 : 0}>
								<Text fontWeight="normal" fontSize="xs">
									{moduleCount} Modules
								</Text>
								<DotFilledIcon color={colors.ampNeutral[300]} />
								<Text fontWeight="normal" fontSize="xs">
									{learningUnitCount} Questions
								</Text>
							</Flex>
							<Text color="ampTertiaryText" fontSize="xs" fontWeight="normal">
								Last Edited {month} {day}, {year}
							</Text>
							<Text color="ampTertiaryText" fontSize="xs" fontWeight="normal">
								by {modifiedUserFullName}
							</Text>
						</Flex>
						<Flex
							alignContent="flex-end"
							position="relative"
							gap={listView ? 2 : 0}>
							<CourseAlertBadge
								hasUnpublishedEdits={hasUnpublishedEdits}
								hasIssues={hasIssues}
								hasRecommendations={hasRecommendations}
							/>
							{listView && !bulkEditingEnabled && (
								<CourseCardDropdownMenu uid={uid} isPublished={isPublished} />
							)}
						</Flex>
					</Flex>
				</CardBody>
			</Card>
		</LinkBox>
	);
};

export default CourseCard;
