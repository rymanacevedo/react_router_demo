import { useState } from 'react';
import {
	Box,
	Button,
	Flex,
	Heading,
	Text,
	Input,
	Textarea,
} from '@chakra-ui/react';
import {
	ChatBubbleIcon,
	ChevronUpIcon,
	DotsVerticalIcon,
	MagnifyingGlassIcon,
	PlusIcon,
} from '@radix-ui/react-icons';
import { LoaderFunction } from 'react-router';
import { AppDispatch, store } from '../../../store/store';
import {
	fetchCourseContent,
	selectCourseContent,
	updateCourseContent,
	putCourseContent,
} from '../../../store/slices/authoring/courseContentSlice';
import { json } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import VerbatimHtml from '../../ui/Authoring/VerbatimHtml';
import AuthoringLayout from '../../ui/Authoring/AuthoringLayout';

export const courseContentLoader: LoaderFunction = async ({ params }) => {
	const uid = params.uid;
	if (uid) {
		await store.dispatch(fetchCourseContent({ uid }));
	}
	return json({ uid });
};

const CourseContentView = () => {
	const dispatch = useDispatch<AppDispatch>();
	const courseContent = useSelector(selectCourseContent);
	const [editingTitle, setEditingTitle] = useState(false);
	const [editingDescription, setEditingDescription] = useState(false);

	if (!courseContent) {
		// TODO replace with error handler
		return <AuthoringLayout>Oops</AuthoringLayout>;
	}

	// TODO split this into ModulesView and UnassignedContentView at some point

	return (
		<AuthoringLayout stacked={true}>
			<Flex alignItems="flex-start" gap="20" alignSelf="stretch">
				<Flex
					alignItems="flex-start"
					flexDirection="column"
					gap="6"
					alignSelf="stretch"
					flex="1">
					<Flex alignItems="center" gap="6" alignSelf="stretch">
						{editingTitle ? (
							<Input
								defaultValue={courseContent?.name}
								variant="flushed"
								fontSize="4xl"
								autoFocus={true}
								onBlur={() => {
									dispatch(putCourseContent());
									setEditingTitle(false);
								}}
								onChange={(e) => {
									const name = e.target.value.trim();
									if (name) {
										dispatch(
											updateCourseContent({
												name,
											}),
										);
									} else {
										dispatch(
											updateCourseContent({
												name: 'Untitled',
											}),
										);
									}
								}}
							/>
						) : (
							<>
								<Heading>{courseContent?.name || 'Title placeholder'}</Heading>
								<Button
									size="xs"
									variant="ghost"
									fontWeight="normal"
									color="ampTertiaryText"
									onClick={() => setEditingTitle(true)}>
									Edit
								</Button>
							</>
						)}
					</Flex>
					<Flex alignItems="center" gap="6" alignSelf="stretch">
						{editingDescription ? (
							<Textarea
								defaultValue={courseContent?.descriptionHtml}
								autoFocus={true}
								variant="flushed"
								fontSize="lg"
								rows={5}
								onBlur={() => {
									dispatch(putCourseContent());
									setEditingDescription(false);
								}}
								onChange={(e) => {
									dispatch(
										updateCourseContent({
											descriptionHtml: e.target.value,
										}),
									);
								}}
							/>
						) : (
							<>
								<Box fontSize="lg">
									<VerbatimHtml
										html={
											courseContent?.descriptionHtml ||
											'Description placeholder'
										}
									/>
								</Box>
								<Button
									size="xs"
									variant="ghost"
									fontWeight="normal"
									color="ampTertiaryText"
									onClick={() => setEditingDescription(true)}>
									Edit
								</Button>
							</>
						)}
					</Flex>
				</Flex>
				<Flex width="96" alignItems="flex-end" flex="0">
					<Flex gap="1">
						<Button variant="outline" color="ampPrimary.600">
							Preview
						</Button>
						<Button variant="solid" color="ampPrimary.600" isDisabled={true}>
							Publish
						</Button>
						<Button variant="outline">
							<ChatBubbleIcon
								width="24px"
								height="24px"
								fill="ampPrimary.600"
							/>
						</Button>
						<Button variant="outline">
							<DotsVerticalIcon
								width="24px"
								height="24px"
								fill="ampPrimary.600"
							/>
						</Button>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction="column" gap="5">
				<Flex direction="column" gap="6">
					<Flex direction="row" gap="2" width="100%">
						<Heading color="ampTertiaryText" flex="1">
							Modules
						</Heading>
						<Flex gap="2" flex="0">
							<Button
								variant="outline"
								height="100%"
								aria-label="Search modules">
								<MagnifyingGlassIcon
									width="24px"
									height="24px"
									fill="ampPrimary.600"
								/>
							</Button>
							<Flex
								direction="row"
								height="100%"
								border="1px solid"
								borderColor="ampNeutral.200"
								borderRadius="xl"
								padding="2"
								gap="2"
								fontWeight="normal"
								alignItems="stretch">
								<Button
									size="sm"
									background="ampPrimary.400"
									aria-label="Show module details">
									Details
								</Button>
								<Button
									size="sm"
									variant="ghost"
									color="ampPrimary.600"
									aria-label="Show module summaries">
									Minimal
								</Button>
							</Flex>
							<Button
								height="100%"
								variant="outline"
								color="ampPrimary.600"
								rightIcon={<PlusIcon fill="ampPrimary.600" />}
								aria-label="Add new section">
								Add section
							</Button>
							<Button height="100%" variant="outline" aria-label="Hide modules">
								<ChevronUpIcon width="24px" height="24px" />
							</Button>
						</Flex>
					</Flex>
					<Text>None</Text>
					<Button
						variant="outline"
						color="ampPrimary.600"
						paddingX="6"
						paddingY="2"
						fontWeight="semibold"
						rightIcon={<PlusIcon fill="ampPrimary.600" />}
						aria-label="Add new module">
						Add module
					</Button>
				</Flex>
				<Flex direction="column" gap="6">
					<Heading color="ampTertiaryText">Unassigned content</Heading>
					<Text>None</Text>
					<Button
						variant="outline"
						color="ampPrimary.600"
						paddingX="6"
						paddingY="2"
						fontWeight="semibold"
						rightIcon={<PlusIcon fill="ampPrimary.600" />}
						aria-label="Add new question">
						Add question
					</Button>
				</Flex>
			</Flex>
			<Flex direction="row" gap="4">
				<Button variant="outline" color="ampPrimary.600">
					Preview
				</Button>
				<Button variant="solid" color="ampPrimary.600" isDisabled={true}>
					Publish
				</Button>
			</Flex>
		</AuthoringLayout>
	);
};

export default CourseContentView;
