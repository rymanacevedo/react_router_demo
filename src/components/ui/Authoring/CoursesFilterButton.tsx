import { Button } from '@chakra-ui/react';
import CoursesFilterBadge from './CoursesFilterBadge';
import { useSelector } from 'react-redux';
import { selectCourseListFilter } from '../../../store/slices/authoring/coursesViewSlice';

interface CoursesFilterButtonProps {
	onClick: () => void;
}

const CoursesFilterButton = ({ onClick }: CoursesFilterButtonProps) => {
	const filter = useSelector(selectCourseListFilter);
	return (
		<Button
			variant="outline"
			height="100%"
			fontWeight="normal"
			onClick={onClick}>
			{filter.count > 0 ? <CoursesFilterBadge count={filter.count} /> : null}
			Filter
		</Button>
	);
};

export default CoursesFilterButton;

// END
