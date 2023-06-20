import {
	Card,
	CardHeader,
	CardBody,
	Flex,
	Badge,
	IconButton,
	Text,
	Heading,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { formatDate } from '../../../lib/utils';

interface CourseCardProps {
	status: 'Draft' | 'Published';
	name: string;
	courseContentUid: string;
	modifiedTime: number;
	modifiedUserFullName: string;
	createdTime: number;
}

const CourseCard = ({
	status,
	name,
	modifiedTime,
	modifiedUserFullName,
}: CourseCardProps) => {
	const statusBadgeVariant = {
		Draft: 'ampWarning',
		Published: 'ampDarkSuccess',
	};

	const { month, day, year } = formatDate(modifiedTime);

	return (
		<Card variant="authoringCard" direction="column" role="group" height="100%">
			<CardHeader width="100%" marginBottom={4}>
				<Flex width="100%" direction="column" gap={4} position="relative">
					<Flex
						alignItems="center"
						justifyContent="space-between"
						position="relative">
						<Badge
							variant={statusBadgeVariant[status]}
							textTransform="capitalize">
							{status}
						</Badge>
						<Menu>
							<MenuButton
								as={IconButton}
								icon={<DotsVerticalIcon />}
								border="none"
								variant="ghost"
								display="flex"
								zIndex={2}
								right="0px"
								position="absolute"
								size="xs"
								paddingTop={1}
								paddingBottom={1}>
								{' '}
							</MenuButton>
							<MenuList>
								<MenuItem>Duplicate</MenuItem>
								<MenuItem>Delete</MenuItem>
								<MenuItem>Move</MenuItem>
								<MenuItem>Add to Folder</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
					<Heading fontSize="xl" as="h2">
						{name}
					</Heading>
				</Flex>
			</CardHeader>
			<CardBody width="100%">
				<Flex height="100%" alignItems="flex-end" justifyContent="flex-start">
					<Text color="ampTertiaryText" fontSize="sm" fontWeight="normal">
						Last Edited {month} {day}, {year}
						<br />
						by {modifiedUserFullName}
					</Text>
				</Flex>
			</CardBody>
		</Card>
	);
};

export default CourseCard;
