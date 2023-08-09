import { Badge, Text } from '@chakra-ui/react';
import {
	ALERT_BADGE_HAS_ISSUES,
	ALERT_BADGE_HAS_RECOMMENDATIONS,
	ALERT_BADGE_HAS_UNPUBLISHED_EDITS,
} from '../../../lib/authoring/constants';

interface CourseAlertBadgeProps {
	hasUnpublishedEdits?: boolean;
	hasIssues?: boolean;
	hasRecommendations?: boolean;
}

const CourseAlertBadge = ({
	hasUnpublishedEdits,
	hasIssues,
	hasRecommendations,
}: CourseAlertBadgeProps) => {
	const alertBadgeVariant = hasUnpublishedEdits
		? {
				variant: ALERT_BADGE_HAS_UNPUBLISHED_EDITS.unselectedVariant,
				icon: <ALERT_BADGE_HAS_UNPUBLISHED_EDITS.icon />,
				label: ALERT_BADGE_HAS_UNPUBLISHED_EDITS.label,
		  }
		: hasIssues
		? {
				variant: ALERT_BADGE_HAS_ISSUES.unselectedVariant,
				icon: <ALERT_BADGE_HAS_ISSUES.icon />,
				label: ALERT_BADGE_HAS_ISSUES.label,
		  }
		: hasRecommendations
		? {
				variant: ALERT_BADGE_HAS_RECOMMENDATIONS.unselectedVariant,
				icon: <ALERT_BADGE_HAS_RECOMMENDATIONS.icon />,
				label: ALERT_BADGE_HAS_RECOMMENDATIONS.label,
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
