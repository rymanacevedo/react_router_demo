import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(cardAnatomy.keys);

const selected = {
	borderWidth: '3px',
};

const answered = {
	backgroundColor: '#9FC6DF',
};

const baseStyle = definePartsStyle({
	container: {
		fontWeight: 'bold',
		backgroundColor: 'white',
		color: 'ampPrimary.600',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: '1px',
		cursor: 'pointer',
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

const multiPartCard = defineStyle((props) => {
	const { values } = props;
	let styles = {};
	values.forEach((value: string) => {
		switch (value) {
			case 'selected':
				styles = {
					...styles,
					...selected,
				};
				break;
			case 'answered':
				styles = {
					...styles,
					...answered,
				};
				break;
			case 'flagged':
				styles = {
					...styles,
				};
				break;
			default:
				break;
		}
	});
	return {
		container: {
			...styles,
		},
	};
});

const variants = {
	multiPartCard,
};
const Card = defineMultiStyleConfig({
	baseStyle,
	sizes,
	variants,
});

export { Card };
