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
import { useQuizContext } from '../../hooks/useQuizContext';

type Props = {
	courseList: { key: string; name: string }[];
	selectedCourseKey: string | null;
	courseUpdaterToggle: any;
};

const CourseMenu = ({
	courseList,
	selectedCourseKey,
	courseUpdaterToggle,
}: Props) => {
	const { t: i18n } = useTranslation();
	const { setSelectedCourseKey } = useQuizContext();
	if (courseList.length <= 1) {
		return null;
	}

	const handleCourseChange = (value: any) => {
		setSelectedCourseKey(value);
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
					{courseList.map((course) => (
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
