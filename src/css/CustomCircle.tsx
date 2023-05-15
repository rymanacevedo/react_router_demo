import { Circle, Icon } from '@chakra-ui/react';

interface CircleProps {
	color: string;
	icon: React.ElementType;
	index: number;
}

const CustomCircle = ({ color, icon: IconComponent, index }: CircleProps) => {
	return (
		<Circle key={index} size="24px" bg={color} color="white" margin="2px">
			<Icon as={IconComponent} />
		</Circle>
	);
};

export default CustomCircle;
