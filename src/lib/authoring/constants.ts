import {
	BellIcon,
	ExclamationTriangleIcon,
	Pencil2Icon,
} from '@radix-ui/react-icons';

export const DEFAULT_COURSE_CONTENT_NAME = 'Course Name';
export const DEFAULT_COURSE_CONTENT_DESCRIPTION = 'Course Description';

export const ITEMS_PER_PAGE = 24;

export const ALERT_BADGE_HAS_UNPUBLISHED_EDITS = {
	unselectedVariant: 'ampWarning',
	selectedVariant: 'ampDarkWarning',
	icon: Pencil2Icon,
	label: 'Unpublished Edits',
};

export const ALERT_BADGE_HAS_ISSUES = {
	unselectedVariant: 'ampLightError',
	selectedVariant: 'ampDarkLightError',
	icon: ExclamationTriangleIcon,
	label: 'Issues',
};
export const ALERT_BADGE_HAS_RECOMMENDATIONS = {
	unselectedVariant: 'ampSecondary',
	selectedVariant: 'ampDarkSecondary',
	icon: BellIcon,
	label: 'Recommendations',
};

export const STATUS_BADGE_PUBLISHED = {
	unselectedVariant: 'ampLightSuccess',
	selectedVariant: 'ampDarkSuccess',
	label: 'Published',
};

export const STATUS_BADGE_DRAFT = {
	unselectedVariant: 'ampWarning',
	selectedVariant: 'ampDarkWarning',
	label: 'Draft',
};

// END
