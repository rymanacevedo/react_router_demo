/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { requireUser } from '../../utils/user';
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
	const user = requireUser();

	if (courses.length === 0) {
		return null;
	}

	const handleCourseChange = async (value: any) => {
		courseUpdaterToggle.load(`/learning?selectedCourseKey=${value}`);
	};

	return (
		<>
			<Flex alignItems="center">
				<Menu isLazy>
					<MenuButton
						style={{ left: '480px' }}
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
			</Flex>
		</>
	);
};

export default CourseMenu;
