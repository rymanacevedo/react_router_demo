import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const boxShadowAttribute = '0 0 0 4px rgba(37, 124, 181, 0.50)';
const xl = defineStyle({
	w: '6',
	h: '6',
});

const xxl = defineStyle({
	w: '12',
	h: '12',
});

const baseMultiSelect = definePartsStyle({
	control: {
		_focus: {
			boxShadow: boxShadowAttribute,
		},
		_hover: {
			boxShadow: boxShadowAttribute,
			outline: '2px solid transparent',
			outlineOffset: '2px',
		},
		// borderColor: 'ampSuccess.500',
		border: '1.5px solid',
		borderRadius: '12px',
		// backgroundColor: 'ampSuccess.50',
	},
	icon: {
		fontSize: '15px',
		// color: 'ampSuccess.500',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 'bold',
	},
});
const sizes = {
	xl: definePartsStyle({ control: xl }),
	xxl: definePartsStyle({ control: xxl }),
};
const baseStyle = definePartsStyle({
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
});

const multiChoiceAnswer = defineStyle(() => {
	return {
		control: {
			...baseMultiSelect.control,
			borderRadius: '50%',
			_hover: undefined,
			border: undefined,
		},
	};
});

const formCheckbox = defineStyle(() => {
	return {
		control: {
			border: '2px solid',
			borderRadius: 'sm',
		},
	};
});

const multiSelect = defineStyle(() => {
	return {
		...baseMultiSelect,
	};
});

const multiSelectUnsureIncorrect = defineStyle(() => {
	const base = {
		borderColor: 'ampError.700',
		backgroundColor: 'ampError.50',
	};
	const styles = {
		control: {
			...baseMultiSelect.control,
			...base,
			_checked: {
				...base,
				_hover: {
					...base,
				},
			},
		},
		icon: {
			...baseMultiSelect.icon,
			color: 'ampError.700',
		},
	};
	return {
		...styles,
	};
});

const multiSelectUnsureCorrect = defineStyle(() => {
	const base = {
		borderColor: 'ampSuccess.500',
		backgroundColor: 'ampSuccess.50',
	};
	const styles = {
		control: {
			...baseMultiSelect.control,
			...base,
			_checked: {
				...base,
				_hover: {
					...base,
				},
			},
		},
		icon: {
			...baseMultiSelect.icon,
			color: 'ampSuccess.500',
		},
	};
	return {
		...styles,
	};
});

const multiSelectSureIncorrect = defineStyle(() => {
	const base = {
		borderColor: 'ampError.50',
		backgroundColor: 'ampError.700',
	};
	const styles = {
		control: {
			...baseMultiSelect.control,
			...base,
			_checked: {
				...base,
				_hover: {
					...base,
				},
			},
		},
		icon: {
			...baseMultiSelect.icon,
			color: 'ampWhite',
		},
	};
	return {
		...styles,
	};
});

const multiSelectSureCorrect = defineStyle(() => {
	const base = {
		borderColor: 'ampSuccess.500',
		backgroundColor: 'ampSuccess.500',
	};
	const styles = {
		control: {
			...baseMultiSelect.control,
			...base,
			_checked: {
				...base,
				_hover: {
					...base,
				},
			},
		},
		icon: {
			...baseMultiSelect.icon,
			color: 'ampWhite',
		},
	};
	return {
		...styles,
	};
});

const multiSelectPartialCorrect = defineStyle(() => {
	return {
		...baseMultiSelect,
	};
});

const variants = {
	multiSelectUnsureIncorrect,
	multiChoiceAnswer,
	formCheckbox,
	multiSelect,
	multiSelectUnsureCorrect,
	multiSelectSureIncorrect,
	multiSelectSureCorrect,
	multiSelectPartialCorrect,
};

const Checkbox = defineMultiStyleConfig({
	baseStyle,
	sizes,
	variants,
});

export { Checkbox };
