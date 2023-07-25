import { ReactNode } from 'react';
import { Box, CheckboxGroup } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectCoursesBulkEditingEnabled,
	setSelectedCourses,
} from '../../../store/slices/authoring/bulkEditingSlice';

interface BulkEditContainerProps {
	children: ReactNode;
}

const BulkEditContainer = ({ children }: BulkEditContainerProps) => {
	const bulkEditingEnabled = useSelector(selectCoursesBulkEditingEnabled);
	const dispatch = useDispatch();

	const handleCheckboxChange = (courseUids: string[]) => {
		dispatch(setSelectedCourses(courseUids));
	};

	if (bulkEditingEnabled) {
		return (
			<CheckboxGroup onChange={handleCheckboxChange}>{children}</CheckboxGroup>
		);
	}

	return <Box>{children}</Box>;
};

export default BulkEditContainer;
