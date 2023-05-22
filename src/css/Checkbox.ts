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
		multiChoiceAnswer: {
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
		multiCorrectAnswer: {
			control: {
				_focus: {
					boxShadow: '0 0 0 4px rgba(37, 124, 181, 0.50)',
				},
				_hover: {},
				border: '2px solid black',
				size: '40rem',
				width: '2.5rem',
				height: '2.5rem',
				borderRadius: '20%',
				iconSize: '1rem',
			},
		},
	},
});

export { Checkbox };
