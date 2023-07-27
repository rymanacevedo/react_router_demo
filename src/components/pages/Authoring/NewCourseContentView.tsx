import AuthoringLayout from '../../ui/Authoring/AuthoringLayout';
import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Circle,
	Flex,
	Heading,
	Icon,
	Text,
	useToast,
} from '@chakra-ui/react';
import { IconProps } from '@chakra-ui/icon';
import { useNavigate, useParams } from 'react-router-dom';
import {
	addCoursesToFolder,
	createCourseContent,
} from '../../../services/authoring';
import { requireUser } from '../../../utils/user';

const CoursePlanningIcon = (props: IconProps) => (
	<Icon width="48px" height="48px" viewBox="0 0 48 48" fill="none" {...props}>
		<path
			d="M16.5 35.4999H31.4999V32.5H16.5V35.4999ZM16.5 27.4999H31.4999V24.5H16.5V27.4999ZM12.6154 42.9999C11.6051 42.9999 10.75 42.6499 10.05 41.9499C9.35 41.2499 9 40.3948 9 39.3845V8.6154C9 7.60513 9.35 6.75 10.05 6.05C10.75 5.35 11.6051 5 12.6154 5H28.5L38.9999 15.4999V39.3845C38.9999 40.3948 38.6499 41.2499 37.9499 41.9499C37.2499 42.6499 36.3948 42.9999 35.3845 42.9999H12.6154ZM27 16.9999V7.99995H12.6154C12.4615 7.99995 12.3205 8.06405 12.1922 8.19225C12.064 8.32048 11.9999 8.46153 11.9999 8.6154V39.3845C11.9999 39.5384 12.064 39.6794 12.1922 39.8077C12.3205 39.9359 12.4615 40 12.6154 40H35.3845C35.5384 40 35.6794 39.9359 35.8076 39.8077C35.9358 39.6794 36 39.5384 36 39.3845V16.9999H27Z"
			fill="#3E703E"
		/>
	</Icon>
);

const BlankCourseIcon = (props: IconProps) => (
	<Icon width="49px" height="48px" viewBox="0 0 49 48" fill="none" {...props}>
		<path
			d="M12.9484 42.9999C11.9381 42.9999 11.083 42.6499 10.383 41.9499C9.68301 41.2499 9.33301 40.3948 9.33301 39.3845V8.6154C9.33301 7.60513 9.68301 6.75 10.383 6.05C11.083 5.35 11.9381 5 12.9484 5H28.833L39.3329 15.4999V23.0961H36.333V16.9999H27.333V7.99995H12.9484C12.7945 7.99995 12.6535 8.06405 12.5253 8.19225C12.3971 8.32048 12.333 8.46153 12.333 8.6154V39.3845C12.333 39.5384 12.3971 39.6794 12.5253 39.8077C12.6535 39.9359 12.7945 40 12.9484 40H23.6022V42.9999H12.9484ZM36.0098 29.0884L37.7175 30.7769L29.9867 38.4769V40.5769H32.0867L39.8175 32.8769L41.4944 34.5538L33.0867 42.9614H27.6022V37.4961L36.0098 29.0884ZM41.4944 34.5538L36.0098 29.0884L38.6213 26.4769C38.9623 26.1487 39.3873 25.9846 39.8963 25.9846C40.4053 25.9846 40.8239 26.1487 41.1521 26.4769L44.1059 29.4307C44.4341 29.7589 44.5982 30.1775 44.5982 30.6865C44.5982 31.1954 44.4341 31.6204 44.1059 31.9615L41.4944 34.5538Z"
			fill="#C29838"
		/>
	</Icon>
);
const UploadFileIcon = (props: IconProps) => (
	<Icon width="31" height="38" viewBox="0 0 31 38" fill="none" {...props}>
		<path
			d="M14.167 31.7691H17.1669V22.8998L20.8669 26.5998L22.9746 24.4615L15.6669 17.1538L8.35929 24.4615L10.4977 26.5691L14.167 22.8998V31.7691ZM4.28239 37.9999C3.27213 37.9999 2.41699 37.6499 1.71699 36.9499C1.01699 36.2499 0.666992 35.3948 0.666992 34.3845V3.6154C0.666992 2.60513 1.01699 1.75 1.71699 1.05C2.41699 0.35 3.27213 0 4.28239 0H20.167L30.6669 10.4999V34.3845C30.6669 35.3948 30.3169 36.2499 29.6169 36.9499C28.9169 37.6499 28.0618 37.9999 27.0515 37.9999H4.28239ZM18.667 11.9999V2.99995H4.28239C4.12853 2.99995 3.98747 3.06405 3.85924 3.19225C3.73104 3.32048 3.66694 3.46153 3.66694 3.6154V34.3845C3.66694 34.5384 3.73104 34.6794 3.85924 34.8077C3.98747 34.9359 4.12853 35 4.28239 35H27.0515C27.2054 35 27.3464 34.9359 27.4746 34.8077C27.6028 34.6794 27.6669 34.5384 27.6669 34.3845V11.9999H18.667Z"
			fill="#685189"
		/>
	</Icon>
);

interface NewCourseContentCardProps {
	badge: React.ReactNode;
	title: string;
	description: string;
	button: string;
	onClick?: () => void;
}

const NewCourseContentCard = ({
	badge,
	title,
	description,
	button,
	onClick,
}: NewCourseContentCardProps) => {
	return (
		<Card variant="authoringCard" alignItems="flex-start" flex="1">
			<CardHeader marginBottom="4">
				{badge}
				<Text
					color="ampPrimaryText"
					fontSize="xl"
					fontWeight="normal"
					paddingTop="6">
					{title}
				</Text>
			</CardHeader>
			<CardBody>
				<Text fontWeight="normal">{description}</Text>
			</CardBody>
			<CardFooter paddingTop="6">
				{onClick ? (
					<Button onClick={onClick}>{button}</Button>
				) : (
					<Button>{button}</Button>
				)}
			</CardFooter>
		</Card>
	);
};

const NewCourseContentView = () => {
	const user = requireUser();
	const navigate = useNavigate();
	const { folderId } = useParams();
	const toast = useToast();

	const handleCreateNewCourseContent = async () => {
		const { data, response: responseFromCreate } = await createCourseContent(
			user,
		);
		if (responseFromCreate.status !== 201) {
			toast({
				title: 'Error creating new course',
				status: 'error',
				duration: 4000,
			});
			return;
		}
		if (folderId) {
			const { response: responseFromAdd } = await addCoursesToFolder(
				user,
				folderId,
				{ items: [{ uid: data.uid }] },
			);
			if (responseFromAdd.status !== 201) {
				toast({
					title: 'Error adding new course to folder',
					status: 'error',
					duration: 4000,
				});
			} else {
				toast({
					title: 'Adding new course to folder',
					status: 'success',
					duration: 4000,
				});
			}
		}
		navigate(`/authoring/course/${data.uid}`);
	};

	return (
		<AuthoringLayout>
			<Box>
				<Heading>Create New Course</Heading>
				<Text fontSize="lg" paddingTop="6" paddingBottom="20">
					Choose how you'd like to start creating your content.
				</Text>
				<Flex gap="10">
					<NewCourseContentCard
						badge={
							<Circle size="4.5rem" bg="ampSuccess.50" color="ampSuccess.600">
								<CoursePlanningIcon />
							</Circle>
						}
						title="Course Planning"
						description="Start by entering your learning objectives to create a course
							outline that aligns with your goals."
						button="Start with planning"
					/>
					<NewCourseContentCard
						badge={
							<Circle size="4.5rem" bg="ampWarning.100" color="ampWarning.600">
								<BlankCourseIcon />
							</Circle>
						}
						title="Blank Course"
						description="Start from a blank course and add in each module and question
							individually."
						button="Start from scratch"
						onClick={handleCreateNewCourseContent}
					/>
					<NewCourseContentCard
						badge={
							<Circle size="4.5rem" bg="ampTertiary.50" color="ampTertiary.600">
								<UploadFileIcon />
							</Circle>
						}
						title="Upload File"
						description="Select an Excel file to import curricula, modules, and questions."
						button="Upload"
					/>
				</Flex>
			</Box>
		</AuthoringLayout>
	);
};

export default NewCourseContentView;

// END
