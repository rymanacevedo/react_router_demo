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
import { useState } from 'react';
import { Cookies } from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';
import { getCourseStats } from '../../services/learning';
import { getSubAccount } from '../../services/utils';
import { requireUser } from '../../utils/user';
import { Course } from '../pages/LearningView';
import CourseProgress from './CourseProgress';

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
	const [courseStats, setCourseStats] = useState<any>(null);
	const { t: i18n } = useTranslation();
	const user = requireUser();

	const { subAccount } = getSubAccount(user);
	if (courses.length === 0) {
		return null;
	}

	const handleCourseChange = async (value: any) => {
		const learnerUid = Cookies.get('learnerUid');
		try {
			const response = await getCourseStats(
				user,
				//selectedCourseKey,
				'3751161c-d189-4875-aa91-315a54de595a',
				learnerUid,
				subAccount,
			);
			const { data } = response;
			setCourseStats(data);
		} catch (error) {
			console.error(error);
		}

		courseUpdaterToggle.load(`/learning?selectedCourseKey=${value}`);
	};

	return (
		<>
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
			{courseStats && <CourseProgress courseStats={courseStats} />}
		</>
	);
};

export default CourseMenu;
