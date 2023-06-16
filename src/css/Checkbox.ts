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
		multiSelect: {
			control: {
				_focus: {
					boxShadow: '0 0 0 4px rgba(37, 124, 181, 0.50)',
				},
				_hover: {
					boxShadow: '0 0 0 4px rgba(37, 124, 181, 0.50)',
					outline: '2px solid transparent',
					outlineOffset: '2px',
				},
				border: '1.5px solid',
				width: '2.75rem',
				height: '2.75rem',
				borderRadius: '12px',
			},
			icon: {
				fontSize: '15px',
			},
		},
		multiSelectUnsureIncorrect: {
			control: {
				_focus: {
					boxShadow: '0 0 0 4px rgba(37, 124, 181, 0.50)',
				},
				_hover: {
					boxShadow: '0 0 0 4px rgba(37, 124, 181, 0.50)',
					outline: '2px solid transparent',
					outlineOffset: '2px',
				},
				borderColor: '#912E21',
				border: '1.5px solid',
				width: '2.75rem',
				height: '2.75rem',
				borderRadius: '12px',
				backgroundColor: '#F8D7D3',
			},
			icon: {
				fontSize: '15px',
				color: '#912E21',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontWeight: 'bold',
			},
		},
	},
});

export { Checkbox };
