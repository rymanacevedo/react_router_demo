import { defineStyleConfig } from '@chakra-ui/react';

const Divider = defineStyleConfig({
	baseStyle: {
		borderWidth: '4px', // change the width of the border
		borderStyle: 'solid', // change the style of the border
		borderRadius: 10, // set border radius to 10
		borderColor: '#AFB3B4',
	},
});

export { Divider };
