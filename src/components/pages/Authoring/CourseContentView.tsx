import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import {
	ChatBubbleIcon,
	ChevronUpIcon,
	DotsVerticalIcon,
	MagnifyingGlassIcon,
	PlusIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import { LoaderFunction } from 'react-router';
import { store } from '../../../store/store';
import {
	fetchCourseContent,
	selectCourseContent,
} from '../../../store/slices/authoring/courseContentSlice';
import { json } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
	const courseContent = useSelector(selectCourseContent);

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
						<Heading flex="1">
							{courseContent?.name || 'Title placeholder'}
						</Heading>
						<Button
							size="xs"
							variant="ghost"
							fontWeight="normal"
							color="ampTertiaryText">
							Edit
						</Button>
					</Flex>
					<Flex alignItems="center" gap="6" alignSelf="stretch">
						<Text flex="1">
							<VerbatimHtml
								html={
									courseContent?.descriptionHtml || 'Description placeholder'
								}
							/>
						</Text>
						<Button
							size="xs"
							variant="ghost"
							fontWeight="normal"
							color="ampTertiaryText">
							Edit
						</Button>
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
