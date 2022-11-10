import { defineStyleConfig } from '@chakra-ui/react';

const Badge = defineStyleConfig({
	// The styles all badges have in common
	baseStyle: {
		borderRadius: 'md',
		fontWeight: 'semibold',
		px: 2, // <-- these values are tokens from the design system https://chakra-ui.com/docs/styled-system/theme#spacing
		py: 1,
		textTransform: 'none',
	},
	sizes: {},
	variants: {
		ampPrimary: () => {
			return {
				background: 'ampPrimary.500',
				color: 'ampWhite',
			};
		},
		ampSecondary: () => {
			return {
				background: 'ampSecondary.100',
				color: 'ampBlack',
			};
		},
		ampNeutral: () => {
			return {
				background: 'ampNeutral.50',
				color: 'ampNeutral.800',
			};
		},
		ampNeutralFilled: () => {
			return {
				background: 'ampNeutral.600',
				color: 'ampWhite',
			};
		},
		ampTertiary: () => {
			return {
				background: 'ampTertiary.100',
				color: 'ampTertiary.700',
			};
		},
		ampLightSuccess: () => {
			return {
				background: 'ampSuccess.100',
				color: 'ampSuccess.700',
			};
		},
		ampWarning: () => {
			return {
				background: 'ampWarning.100',
				color: 'ampWarning.800',
			};
		},
		ampWarningOutline: () => {
			return {
				background: 'ampWarning.100',
				color: 'ampWarning.800',
				border: '1px',
				borderColor: 'ampWarning.800',
			};
		},
		ampLightError: () => {
			return {
				background: 'ampError.100',
				color: 'ampError.700',
			};
		},
		ampInfo: () => {
			return {
				background: 'ampInfo.100',
				color: 'ampInfo.700',
			};
		},
		ampDarkSuccess: () => {
			return {
				background: 'ampSuccess.500',
				color: 'ampWhite',
			};
		},
		ampDarkSuccessOutline: () => {
			return {
				background: 'ampSuccess.50',
				color: 'ampSuccess.500',
				border: '1px',
				borderColor: 'ampSuccess.500',
			};
		},
		ampDarkError: () => {
			return {
				background: 'ampError.700',
				color: 'ampWhite',
			};
		},
		ampDarkErrorOutline: () => {
			return {
				background: 'ampError.100',
				color: 'ampError.700',
				border: '1px',
				borderColor: 'ampError.700',
			};
		},
		ampWhite: () => {
			return {
				background: 'ampWhite',
				color: 'ampNeutral.800',
			};
		},
	},
	defaultProps: {},
});

export { Badge };
