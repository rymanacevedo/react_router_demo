import AuthoringLayout from '../../ui/Authoring/AuthoringLayout';
import {
	Box,
	Flex,
	Heading,
	Input,
	Textarea,
	Spacer,
	Text,
} from '@chakra-ui/react';
import {
	ChatBubbleIcon,
	ChevronLeftIcon,
	DotsVerticalIcon,
	ListBulletIcon,
} from '@radix-ui/react-icons';
import VerbatimHtml from '../../ui/Authoring/VerbatimHtml';
import { useState } from 'react';
import { LoaderFunction } from 'react-router';
import { json } from 'react-router-dom';
import ModuleTypeBadge from '../../ui/Authoring/ModuleTypeBadge';
import {
	fetchModule,
	selectModule,
} from '../../../store/slices/authoring/moduleSlice';
import { AuthoringContentBlock } from '../../../store/slices/authoring/contentBlockSlice';
import { store } from '../../../store/store';
import { useSelector } from 'react-redux';
import ContentBlockToolbar from '../../ui/Authoring/ContentBlockToolbar';
import AuthoringOutlineButton from '../../ui/Authoring/AuthoringOutlineButton';
import EditButton from '../../ui/Authoring/EditButton';

export const moduleLoader: LoaderFunction = async ({ params }) => {
	const moduleUid = params.moduleId; // TODO use "uid" and not "id" everywhere!
	if (moduleUid) {
		await store.dispatch(fetchModule({ moduleUid, revision: 1 }));
		// TODO get course content associated with the module
	}
	return json({
		moduleUid,
	});
};

const ModuleView = () => {
	const module = useSelector(selectModule);
	const [editingTitle, setEditingTitle] = useState(false);
	const [editingDescription, setEditingDescription] = useState(false);

	if (!module) {
		return <>No module</>;
	}

	return (
		<AuthoringLayout stacked={true} hasNavigation={true}>
			<Flex direction="row" color="ampPrimaryText" alignItems="center">
				<AuthoringOutlineButton>
					<ChevronLeftIcon width="1rem" height="1rem" />
				</AuthoringOutlineButton>
				<Heading paddingLeft={4} size="1.3rem">
					Course's Name
				</Heading>
				<Spacer />
				<Flex gap={2}>
					<AuthoringOutlineButton>Back</AuthoringOutlineButton>
					<AuthoringOutlineButton>Next</AuthoringOutlineButton>
					<AuthoringOutlineButton>
						<ListBulletIcon width="1.5rem" height="1.5rem" />
					</AuthoringOutlineButton>
				</Flex>
			</Flex>
			<Flex color="ampPrimaryText">
				<Flex
					alignItems="flex-start"
					flexDirection="column"
					gap={6}
					alignSelf="stretch"
					flex={1}>
					<ModuleTypeBadge type={module.type} />
					<Flex alignItems="center" gap={6} alignSelf="stretch">
						{editingTitle ? (
							<Input
								defaultValue={module.name}
								variant="flushed"
								fontSize="4xl"
								autoFocus={true}
								onBlur={() => {
									// TODO save updated name
									setEditingTitle(false);
								}}
								onChange={(e) => {
									// TODO update name in store
									console.log(e.target.value); // new name value
								}}
							/>
						) : (
							<>
								<Heading>{module.name ?? 'Name placeholder'}</Heading>
								<EditButton />
							</>
						)}
					</Flex>
					<Flex alignItems="center" gap="6" alignSelf="stretch">
						{editingDescription ? (
							<Textarea
								defaultValue={module.descriptionHtml}
								autoFocus={true}
								variant="flushed"
								fontSize="lg"
								rows={5}
								onBlur={() => {
									// TODO save updated description
									setEditingDescription(false);
								}}
								onChange={(e) => {
									// TODO update description in store
									console.log(e.target.value);
								}}
							/>
						) : (
							<>
								<Box fontSize="lg">
									<VerbatimHtml
										html={module.descriptionHtml ?? 'Description placeholder'}
									/>
								</Box>
								<EditButton />
							</>
						)}
					</Flex>
				</Flex>
				<Flex>
					<Flex gap="1">
						<AuthoringOutlineButton>
							<ChatBubbleIcon width="1.5rem" height="1.5rem" />
						</AuthoringOutlineButton>
						<AuthoringOutlineButton>
							<DotsVerticalIcon width="1.5rem" height="1.5rem" />
						</AuthoringOutlineButton>
					</Flex>
				</Flex>
			</Flex>

			<Flex direction="column" gap={20}>
				<Flex direction="column" gap={6}>
					<Heading size="lg">Module Introduction Page</Heading>
					<ContentBlockToolbar />
					{module.introductionContentBlocks
						? module.introductionContentBlocks.map(
								(cb: AuthoringContentBlock) => {
									return <VerbatimHtml html={cb.contentHtml} />;
								},
						  )
						: 'No introduction'}
				</Flex>
				<Flex direction="column" gap={6}>
					<Heading size="lg">Module Conclusion Page</Heading>
					<ContentBlockToolbar />
					{module.conclusionContentBlocks
						? module.conclusionContentBlocks.map(
								(cb: AuthoringContentBlock) => {
									return <VerbatimHtml html={cb.contentHtml} />;
								},
						  )
						: 'No conclusion'}
					<Flex direction="row" gap={6}>
						<Flex direction="column" flex={1} gap={2}>
							<Text fontSize="1rem" fontWeight="600">
								Conclusion Button Text
							</Text>
							<Flex
								borderColor="ampNeutral.400"
								borderRadius="xl"
								borderWidth="1px"
								padding={6}
								gap={6}
								color="ampTertiaryText">
								<Text>
									{module.conclusionButtonText ?? 'Button text placeholder'}
								</Text>
								<EditButton />
							</Flex>
						</Flex>
						<Flex direction="column" flex={1} gap={2}>
							<Text fontSize="1rem" fontWeight="600">
								Conclusion Button URL
							</Text>
							<Flex
								borderColor="ampNeutral.400"
								borderRadius="xl"
								borderWidth="1px"
								padding={6}
								gap={6}
								color="ampTertiaryText">
								<Text>
									{module.conclusionButtonUrl ?? 'Button URL placeholder'}
								</Text>
								<EditButton />
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</AuthoringLayout>
	);
};

export default ModuleView;

// END
