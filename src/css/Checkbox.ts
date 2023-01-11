import { defineStyleConfig } from '@chakra-ui/react';

const Checkbox = defineStyleConfig({
	baseStyle: {
		control: {
			_focus: {
				boxShadow: 'none',
				outline: 'none',
			},
			_focusVisible: {
				outline: 'none',
			},
			border: 'unset',
		},
	},
	variants: {
		answer: {
			control: {
				_focus: {
					borderRadius: '50%',
					boxShadow: '0 0 0 4px rgba(37, 124, 181, 0.50)',
				},
				_hover: {},
			},
		},
		formCheckbox: {
			control: {
				border: '2px solid',
				borderRadius: 'sm',
			},
		},
	},
});

export { Checkbox };
