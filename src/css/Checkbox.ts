import { defineStyleConfig } from '@chakra-ui/react';

const boxShadowAttribute = '0 0 0 4px rgba(37, 124, 181, 0.50)';

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
					boxShadow: boxShadowAttribute,
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
					boxShadow: boxShadowAttribute,
				},
				_hover: {
					boxShadow: boxShadowAttribute,
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
					boxShadow: boxShadowAttribute,
				},
				_hover: {
					boxShadow: boxShadowAttribute,
					outline: '2px solid transparent',
					outlineOffset: '2px',
				},
				borderColor: 'ampError.700',
				border: '1.5px solid',
				width: '2.75rem',
				height: '2.75rem',
				borderRadius: '12px',
				backgroundColor: 'ampError.100',
			},
			icon: {
				fontSize: '15px',
				color: 'ampError.700',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontWeight: 'bold',
			},
		},
		multiSelectUnsureCorrect: {
			control: {
				_focus: {
					boxShadow: boxShadowAttribute,
				},
				_hover: {
					boxShadow: boxShadowAttribute,
					outline: '2px solid transparent',
					outlineOffset: '2px',
				},
				borderColor: 'ampSuccess.500',
				border: '1.5px solid',
				width: '2.75rem',
				height: '2.75rem',
				borderRadius: '12px',
				backgroundColor: 'ampSuccess.50',
			},
			icon: {
				fontSize: '15px',
				color: 'ampSuccess.500',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontWeight: 'bold',
			},
		},
		multiSelectSureIncorrect: {
			control: {
				_focus: {
					boxShadow: boxShadowAttribute,
				},
				_hover: {
					boxShadow: boxShadowAttribute,
					outline: '2px solid transparent',
					outlineOffset: '2px',
				},
				borderColor: 'ampError.700',
				border: '1.5px solid',
				width: '2.75rem',
				height: '2.75rem',
				borderRadius: '12px',
				backgroundColor: 'ampError.700',
			},
			icon: {
				fontSize: '15px',
				color: 'white',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontWeight: 'bold',
			},
		},
		multiSelectSureCorrect: {
			control: {
				_focus: {
					boxShadow: boxShadowAttribute,
				},
				_hover: {
					boxShadow: boxShadowAttribute,
					outline: '2px solid transparent',
					outlineOffset: '2px',
				},
				borderColor: 'ampSuccess.500',
				border: '1.5px solid',
				width: '2.75rem',
				height: '2.75rem',
				borderRadius: '12px',
				backgroundColor: 'ampSuccess.500',
			},
			icon: {
				fontSize: '15px',
				color: 'white',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontWeight: 'bold',
			},
		},
		multiSelectPartialCorrect: {
			control: {
				_focus: {
					boxShadow: boxShadowAttribute,
				},
				_hover: {
					boxShadow: boxShadowAttribute,
					outline: '2px solid transparent',
					outlineOffset: '2px',
				},
				borderColor: 'ampWarning.800',
				border: '1.5px solid',
				width: '2.75rem',
				height: '2.75rem',
				borderRadius: '12px',
				backgroundColor: 'ampWarning.100',
			},
			icon: {
				fontSize: '15px',
				color: 'ampWarning.800',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontWeight: 'bold',
			},
		},
	},
});

export { Checkbox };
