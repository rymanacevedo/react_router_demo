import {
	Card,
	CardHeader,
	CardBody,
	Flex,
	Badge,
	Text,
	Heading,
	useTheme,
} from '@chakra-ui/react';
import {
	ExclamationTriangleIcon,
	Pencil2Icon,
	BellIcon,
	DotFilledIcon,
} from '@radix-ui/react-icons';
import { formatDate } from '../../../lib/utils';
import CourseCardDropdownMenu from './CourseCardDropdownMenu';

interface CourseCardProps {
	status: 'Draft' | 'Published';
	name: string;
	courseContentUid: string;
	modifiedTime: number;
	modifiedUserFullName: string;
	createdTime: number;
	courseAlert?: 'unpublished_edits' | 'issues' | 'recommendations';
	listView: boolean;
	moduleCount?: number;
	questionCount?: number;
}

const CourseCard = ({
	status,
	name,
	modifiedTime,
	modifiedUserFullName,
	listView,
	// This Data Currently Isn't Included in the API Response
	courseAlert = 'recommendations',
	questionCount = 0,
	moduleCount = 0,
}: CourseCardProps) => {
	const statusBadgeVariant = {
		Draft: 'ampWarning',
		Published: 'ampDarkSuccess',
	};

	const { colors } = useTheme();

	const { month, day, year } = formatDate(modifiedTime);

	const alertBadgeVariant = {
		unpublished_edits: {
			variant: 'ampWarning',
			icon: <Pencil2Icon />,
			label: 'Unpublished Edits',
		},
		issues: {
			variant: 'ampLightError',
			icon: <ExclamationTriangleIcon />,
			label: 'Issues',
		},
		recommendations: {
			variant: 'ampSecondary',
			icon: <BellIcon />,
			label: 'Recommendations',
		},
	};

	return (
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
						<Badge
							variant={statusBadgeVariant[status]}
							textTransform="capitalize">
							{status}
						</Badge>
						{!listView && <CourseCardDropdownMenu />}
					</Flex>
					<Heading
						fontSize={listView ? 'lg' : 'xl'}
						as="h2"
						noOfLines={listView ? 1 : 2}>
						{name}
					</Heading>
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
							<Text fontWeight="normal" fontSize="sm">
								{moduleCount} Modules
							</Text>
							<DotFilledIcon color={colors.ampNeutral[300]} />
							<Text fontWeight="normal" fontSize="sm">
								{questionCount} Questions
							</Text>
						</Flex>
						<Text color="ampTertiaryText" fontSize="sm" fontWeight="normal">
							Last Edited {month} {day}, {year}
						</Text>
						<Text color="ampTertiaryText" fontSize="sm" fontWeight="normal">
							by {modifiedUserFullName}
						</Text>
					</Flex>
					<Flex
						alignContent="flex-end"
						position="relative"
						gap={listView ? 2 : 0}>
						<Badge
							variant={alertBadgeVariant[courseAlert].variant}
							display="flex"
							gap={2}>
							{alertBadgeVariant[courseAlert].icon}
							<Text
								as="span"
								fontSize="inherit"
								position="absolute"
								opacity={0}
								color="inherit"
								_groupHover={{
									opacity: 1,
									position: 'relative',
									transition: '.6s ease',
								}}>
								{alertBadgeVariant[courseAlert].label}
							</Text>
						</Badge>
						{listView && <CourseCardDropdownMenu />}
					</Flex>
				</Flex>
			</CardBody>
		</Card>
	);
};

export default CourseCard;
