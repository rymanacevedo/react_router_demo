import { defineStyleConfig } from '@chakra-ui/react';

const Link = defineStyleConfig({
	baseStyle: {
		fontWeight: 'bold',
		_hover: {
			textDecoration: 'none',
		},
	},
	variants: {
		navLink: {
			fontWeight: 'normal',
			_hover: {
				borderBottom: '2px solid',
			},
		},
	},
});

export { Link };
