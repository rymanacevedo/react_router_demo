import { defineStyleConfig } from '@chakra-ui/react';

const Heading = defineStyleConfig({
	baseStyle: {
		fontWeight: 500,
	},
	sizes: {
		'4xl': {
			fontSize: ['6xl', null, '7xl'],
			lineHeight: 1,
		},
		'3xl': {
			fontSize: ['5xl', null, '6xl'],
			lineHeight: 1,
		},
		'2xl': {
			fontSize: ['4xl', null, '5xl'],
		},
		xl: {
			fontSize: ['2rem'],
		},
		lg: {
			fontSize: ['s-xl', null, 'xl'],
		},
		md: { fontSize: ['s-md', null, 'md'] },
		sm: { fontSize: ['s-sm', null, 'sm'] },
		xs: { fontSize: ['s-xs', null, 'xs'] },
	},
});

export default Heading;
