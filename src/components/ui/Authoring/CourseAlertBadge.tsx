import { Badge, Text } from '@chakra-ui/react';
import {
	ExclamationTriangleIcon,
	Pencil2Icon,
	BellIcon,
} from '@radix-ui/react-icons';

interface CourseAlertBadgeProps {
	hasUnpublishedEdits: boolean;
	hasIssues: boolean;
	hasRecommendations: boolean;
}

const CourseAlertBadge = ({
	hasUnpublishedEdits,
	hasIssues,
	hasRecommendations,
}: CourseAlertBadgeProps) => {
	const alertBadgeVariant = hasUnpublishedEdits
		? {
				variant: 'ampWarning',
				icon: <Pencil2Icon />,
				label: 'Unpublished Edits',
		  }
		: hasIssues
		? {
				variant: 'ampLightError',
				icon: <ExclamationTriangleIcon />,
				label: 'Issues',
		  }
		: hasRecommendations
		? {
				variant: 'ampSecondary',
				icon: <BellIcon />,
				label: 'Recommendations',
		  }
		: {};

	return (
		<>
			{alertBadgeVariant.variant ? (
				<Badge variant={alertBadgeVariant.variant} display="flex" gap={2}>
					{alertBadgeVariant.icon}
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
						{alertBadgeVariant.label}
					</Text>
				</Badge>
			) : null}
		</>
	);
};

export default CourseAlertBadge;
