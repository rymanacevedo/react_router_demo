import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import flag from '../assets/flag.png';

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
	container: {
		fontWeight: 'bold',
		backgroundColor: 'white',
		color: 'ampPrimary.600',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: '1px',
	},
});

const sizes = {
	sm: definePartsStyle({
		container: {
			width: '44px',
			height: '48px',
		},
	}),
	md: definePartsStyle({
		container: {
			padding: '16px 32px',
		},
	}),
};

const variants = {
	unselected: definePartsStyle({
		container: {},
	}),

	flagged: definePartsStyle({
		container: {
			borderWidth: '3px',
			backgroundImage: `url(${flag})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'right top',
			backgroundSize: '12px 12px',
		},
	}),

	selected: definePartsStyle({
		container: {
			backgroundColor: '#9FC6DF',
		},
	}),

	selectedFlagged: definePartsStyle({
		container: {
			backgroundColor: '#9FC6DF',
			borderWidth: '3px',
			backgroundImage: `url(${flag})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'right top',
			backgroundSize: '12px 12px',
		},
	}),
};
const Card = defineMultiStyleConfig({
	baseStyle,
	sizes,
	variants,
});

export { Card };
