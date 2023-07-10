import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(radioAnatomy.keys);

const xl = defineStyle({
	w: '6',
	h: '6',
});

const xxl = defineStyle({
	w: '12',
	h: '12',
});

const sizes = {
	xl: definePartsStyle({ control: xl }),
	xxl: definePartsStyle({ control: xxl }),
};

const amp = definePartsStyle({
	container: {},
	control: {
		color: 'ampPrimary.500',
		_checked: {
			color: 'ampPrimary.500',
		},
		_hover: {
			color: 'ampPrimary.600',
		},
	},
});

const variants = {
	amp,
};

const Radio = defineMultiStyleConfig({
	variants,
	sizes,
});

export default Radio;
