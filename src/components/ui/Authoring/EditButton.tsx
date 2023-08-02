import { Button, ButtonProps } from '@chakra-ui/react';

const EditButton = (props: ButtonProps) => {
	return (
		<Button
			size="xs"
			variant="ghost"
			fontWeight="normal"
			color="ampTertiaryText"
			{...props}>
			Edit
		</Button>
	);
};

export default EditButton;

// END
