import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';

const AmpBox = forwardRef<FlexProps, 'div'>((props, ref) => (
	<Flex
		backgroundColor="ampWhite"
		boxShadow="md"
		borderRadius="3xl"
		p={12}
		flex={1}
		direction="column"
		ref={ref}
		{...props}>
		{props.children}
	</Flex>
));

export default AmpBox;
