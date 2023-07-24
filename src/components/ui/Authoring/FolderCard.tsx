import {
	Box,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Flex,
	Text,
	Heading,
	Button,
	Badge,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import FolderCardDropdownMenu from './FolderCardDropdownMenu';

interface FolderCardProps {
	name: string;
	description?: string;
	usageCount: number;
	uid: string;
}

const FolderCard = ({
	name,
	description,
	usageCount,
	uid,
}: FolderCardProps) => {
	return (
		<Box position="relative" height="100%">
			<Box
				bg="ampWhite"
				width="100%"
				height="100%"
				position="absolute"
				border="1px solid"
				borderRadius="xl"
				color="ampNeutral.200"
				top="16px"
				left="16px"
			/>
			<Box
				bg="ampWhite"
				width="100%"
				height="100%"
				position="absolute"
				border="1px solid"
				color="ampNeutral.200"
				borderRadius="xl"
				top="8px"
				left="8px"
			/>
			<Card
				variant="authoringCard"
				direction="column"
				justifyContent="space-between"
				role="group"
				height="100%">
				<CardHeader width="100%" marginBottom={4} maxWidth="auto">
					<Flex
						alignItems="flex-start"
						justifyContent="space-between"
						position="relative"
						height="100%">
						<Heading fontWeight="semibold" fontSize="lg" as="h2" noOfLines={2}>
							{name}
						</Heading>
						<FolderCardDropdownMenu uid={uid} />
					</Flex>
				</CardHeader>
				<CardBody alignItems="flex-start" width="100%" mb={8}>
					{description && <Text fontWeight="normal">{description}</Text>}
				</CardBody>
				<CardFooter
					width="100%"
					justifyContent="space-between"
					alignItems="center">
					<Badge variant="ampSecondary">{usageCount} Courses</Badge>
					<Button
						to={`/authoring/folder/${uid}`}
						textDecoration="none"
						as={RouterLink}
						variant="ampOutline"
						fontSize="sm"
						size="sm">
						View
					</Button>
				</CardFooter>
			</Card>
		</Box>
	);
};

export default FolderCard;
