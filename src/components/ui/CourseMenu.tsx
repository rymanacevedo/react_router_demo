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

type Props = {
	courseList: { key: string; name: string }[];
	selectedCourseKey: string | null;
	setSelectedCourseKey: (key: string) => void;
	setCourseTitle: (title: string) => void;
};

const CourseMenu = ({
	courseList,
	selectedCourseKey,
	setSelectedCourseKey,
	setCourseTitle,
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
			<MenuList minWidth="240px" maxHeight="25rem" overflowY="scroll">
				<MenuOptionGroup
					onChange={(value) => {
						setSelectedCourseKey(value as string);
						setCourseTitle(
							courseList.find((course) => course.key === value)?.name as string,
						);
					}}
					defaultChecked={true}
					defaultValue={selectedCourseKey ?? ''}>
					{courseList?.map((course) => (
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
