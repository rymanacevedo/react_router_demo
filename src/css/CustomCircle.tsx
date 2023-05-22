import { Circle, Icon } from '@chakra-ui/react';

interface CircleProps {
	color: string;
	icon: React.ElementType;
	index: number;
	iconColor?: string;
	borderColor?: string;
}

const CustomCircle = ({
	color,
	icon: IconComponent,
	index,
	iconColor,
	borderColor,
}: CircleProps) => {
	return (
		<Circle
			key={index}
			size="24px"
			bg={color}
			color="white"
			margin="2px"
			border={`1.5px solid ${borderColor}`}>
			<Icon as={IconComponent} color={iconColor} />
		</Circle>
	);
};

export default CustomCircle;
