import {
	Button,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { Course } from '../pages/LearningView';

type Props = {
	courses: Course[];
	selectedCourseKey: string | null;
	courseUpdaterToggle: any;
};

const CourseMenu = ({
	courses,
	selectedCourseKey,
	courseUpdaterToggle,
}: Props) => {
	const { t: i18n } = useTranslation();
	if (courses.length === 0) {
		return null;
	}

	const handleCourseChange = (value: any) => {
		courseUpdaterToggle.load(`/learning?selectedCourseKey=${value}`);
	};

	return (
		<Menu isLazy>
			<MenuButton
				leftIcon={<ChevronDownIcon />}
				as={Button}
				variant="ampOutline">
				<Text>{i18n('changeCourse')}</Text>
			</MenuButton>
			<MenuList minWidth="240px" maxHeight="25rem" overflowY="scroll">
				<MenuOptionGroup
					onChange={handleCourseChange}
					defaultChecked={true}
					defaultValue={selectedCourseKey ?? ''}>
					{courses.map((course) => (
						<MenuItemOption key={course.key} value={course.key}>
							<Text isTruncated maxW="300px">
								{course.name}
							</Text>
						</MenuItemOption>
					))}
				</MenuOptionGroup>
			</MenuList>
		</Menu>
	);
};

export default CourseMenu;
