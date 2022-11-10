import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
	// The styles all button have in common
	baseStyle: {
		fontWeight: 'semibold',
		borderRadius: 'md', // <-- border radius is same for all variants and sizes
		lineHeight: 5,
	},
	// Two sizes: sm and md
	sizes: {
		sm: {
			fontSize: 'sm',
			px: 4, // <-- px is short for paddingLeft and paddingRight
			py: 2, // <-- py is short for paddingTop and paddingBottom
		},
		md: {
			fontSize: 'md',
			px: 6, // <-- these values are tokens from the design system https://chakra-ui.com/docs/styled-system/theme#spacing
			py: 2, // <-- these values are tokens from the design system
		},
	},
	// Two variants: outline and solid
	variants: {
		ampSolid: {
			bg: 'ampPrimary.600',
			color: 'white',
			_active: {
				backgroundColor: 'ampPrimary.700',
				color: 'ampWhite',
			},
			_disabled: {
				backgroundColor: 'ampNeutral.600',
				color: 'ampWhite',
				opacity: 1,
			},
			_focus: {
				backgroundColor: 'ampPrimary.600',
				border: 'none',
				color: 'ampWhite',
			},
			_hover: {
				backgroundColor: 'ampPrimary.500',
				border: 'none',
				color: 'ampWhite',
				_disabled: { background: 'ampNeutral.600' }, //set _disabled background property within _hover selector to avoid Chakra overriding custom button background
			},
		},
		ampOutline: {
			backgroundColor: 'ampWhite',
			border: '1px solid',
			borderColor: 'ampPrimary.300',
			color: 'ampPrimary.600',
			_active: {
				backgroundColor: 'ampWhite',
				borderColor: 'ampPrimary.500',
				color: 'ampPrimary.800',
			},
			_disabled: {
				backgroundColor: 'ampNeutral.100',
				border: 'none',
				color: 'ampNeutral.800',
				opacity: 1,
			},
			_focus: {
				backgroundColor: 'ampWhite',
				borderColor: 'ampPrimary.300',
			},
			_hover: {
				backgroundColor: 'ampWhite',
				borderColor: 'ampPrimary.400',
				color: 'ampPrimary.700',
				_disabled: { background: 'ampNeutral.100' }, //set _disabled background property within _hover selector to avoid Chakra overriding custom button background
			},
		},
	},
	// The default size and variant values
	defaultProps: {
		size: 'md',
		variant: 'ampSolid',
	},
});

export { Button };
