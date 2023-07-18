import { Circle, Text } from '@chakra-ui/react';

type NumberCirclePropsType = {
	number: string;
};

const NumberCircle = ({ number }: NumberCirclePropsType) => {
	return (
		<Circle
			size="24px"
			bg="#257CB5"
			border="2px solid #257CB5"
			display="flex"
			alignItems="center"
			justifyContent="center"
			margin="2px">
			<Text fontSize="xs" fontWeight="bold" color="white">
				+{number}
			</Text>
		</Circle>
	);
};

export default NumberCircle;
