import { useSelector } from 'react-redux';
import ModuleCard from './ModuleCard';
import SectionCard from './SectionCard';
import {
	selectCourseContentTree,
	Module,
	Section,
} from '../../../store/slices/authoring/courseContentSlice';

const CourseModuleList = () => {
	const courseContentTree = useSelector(selectCourseContentTree);
	const sections = courseContentTree?.sections || [];
	const modules = courseContentTree?.modules || [];

	return (
		<>
			{sections.map((section: Section) => (
				<SectionCard section={section} />
			))}
			{sections.length <= 0 &&
				modules &&
				modules.map((module: Module) => <ModuleCard module={module} />)}
		</>
	);
};

export default CourseModuleList;
