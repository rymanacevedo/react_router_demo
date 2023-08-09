import { Circle, Text } from '@chakra-ui/react';

interface CoursesFilterBadgeProps {
	count: number;
}

const CoursesFilterBadge = ({ count }: CoursesFilterBadgeProps) => {
	return (
		<Circle
			size={4}
			bg="#257CB5"
			borderWidth={0}
			display="flex"
			alignItems="center"
			justifyContent="center"
			marginRight={2}>
			<Text fontSize="0.75rem" fontWeight="bold" color="white">
				{count}
			</Text>
		</Circle>
	);
};

export default CoursesFilterBadge;
