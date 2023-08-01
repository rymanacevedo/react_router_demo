import { useSelector } from 'react-redux';
import { selectCourseContentTree } from '../../../store/slices/authoring/courseContentSlice';
import ModuleCard from './ModuleCard';
import { Module } from '../../../store/slices/authoring/courseContentSlice';

const CourseModuleList = () => {
	const courseContentTree = useSelector(selectCourseContentTree);

	return (
		<>
			{courseContentTree?.modules &&
				courseContentTree.modules.map((module: Module) => (
					<ModuleCard module={module} />
				))}
		</>
	);
};

export default CourseModuleList;
