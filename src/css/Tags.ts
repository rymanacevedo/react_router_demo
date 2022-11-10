import { defineStyleConfig } from '@chakra-ui/react';

const Tag = defineStyleConfig({
	// The styles all Tags have in common
	baseStyle: {
		container: {
			border: 'none',
			px: 2, // <-- these values are tokens from the design system https://chakra-ui.com/docs/styled-system/theme#spacing
			py: 1,
			borderRadius: 'md',
			fontWeight: 'semibold',
			textTransform: 'none',
		},
	},
	variants: {
		ampNeutral: () => {
			return {
				container: {
					bg: 'ampNeutral.50',
					color: 'ampNeutral.800',
				},
			};
		},
		ampNeutralFilled: () => {
			return {
				container: {
					bg: 'ampNeutral.600',
					color: 'ampWhite',
				},
			};
		},
		ampTertiary: () => {
			return {
				container: {
					bg: 'ampTertiary.100',
					color: 'ampTertiary.700',
				},
			};
		},
		ampLightSuccess: () => {
			return {
				container: {
					bg: 'ampSuccess.100',
					color: 'ampSuccess.700',
				},
			};
		},
		ampWarning: () => {
			return {
				container: {
					bg: 'ampWarning.100',
					color: 'ampWarning.800',
				},
			};
		},
		ampWarningOutline: () => {
			return {
				container: {
					bg: 'ampWarning.100',
					color: 'ampWarning.800',
					border: '1px',
					borderColor: 'ampWarning.800',
				},
			};
		},
		ampLightError: () => {
			return {
				container: {
					bg: 'ampError.100',
					color: 'ampError.700',
				},
			};
		},
		ampInfo: () => {
			return {
				container: {
					background: 'ampInfo.100',
					color: 'ampInfo.700',
				},
			};
		},
		ampDarkSuccess: () => {
			return {
				container: {
					bg: 'ampSuccess.500',
					color: 'ampWhite',
				},
			};
		},
		ampDarkSuccessOutline: () => {
			return {
				container: {
					bg: 'ampSuccess.50',
					color: 'ampSuccess.500',
					border: '1px',
					borderColor: 'ampSuccess.500',
				},
			};
		},
		ampDarkError: () => {
			return {
				container: {
					bg: 'ampError.700',
					color: 'ampWhite',
				},
			};
		},
		ampDarkErrorOutline: () => {
			return {
				container: {
					background: 'ampError.100',
					color: 'ampError.700',
					border: '1px',
					borderColor: 'ampError.700',
				},
			};
		},
		ampWhite: () => {
			return {
				container: {
					background: 'ampWhite',
					color: 'ampNeutral.800',
				},
			};
		},
	},
	defaultProps: {
		variant: 'ampNeutral',
	},
});

export { Tag };
