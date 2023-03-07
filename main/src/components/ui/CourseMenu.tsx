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
import { CourseListType } from '../pages/LearningView';

type Props = {
	courseList: CourseListType;
	selectedCourseKey: string;
	setSelectedCourseKey: (key: string) => void;
};

const CourseMenu = ({
	courseList,
	selectedCourseKey,
	setSelectedCourseKey,
}: Props) => {
	const { t: i18n } = useTranslation();

	if (courseList?.length <= 1) {
		return null;
	}

	return (
		<Menu isLazy>
			<MenuButton
				leftIcon={<ChevronDownIcon />}
				as={Button}
				variant="ampOutline">
				<Text>{i18n('changeCourse')}</Text>
			</MenuButton>
			<MenuList minWidth="240px">
				<MenuOptionGroup
					onChange={(e) => {
						return setSelectedCourseKey(e as string);
					}}
					defaultChecked={true}
					defaultValue={selectedCourseKey}>
					{courseList?.map((course) => (
						<MenuItemOption key={course.key} value={course.key}>
							{course.name}
						</MenuItemOption>
					))}
				</MenuOptionGroup>
			</MenuList>
		</Menu>
	);
};

export default CourseMenu;
