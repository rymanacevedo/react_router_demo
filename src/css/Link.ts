import { defineStyleConfig } from '@chakra-ui/react';

const Link = defineStyleConfig({
	baseStyle: {
		fontWeight: 'bold',
		_hover: {
			textDecoration: 'none',
		},
	},
});

export { Link };
