import { useState } from 'react';
import {
	Flex,
	Card,
	Text,
	CardFooter,
	CardBody,
	Button,
	useTheme,
	IconButton,
	MenuButton,
	Menu,
	MenuList,
	MenuItem,
	useDisclosure,
	Input,
	Collapse,
	Badge,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	DragHandleDots2Icon,
	ChevronUpIcon,
	ChevronDownIcon,
} from '@radix-ui/react-icons';
import QuestionCard from './QuestionCard';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { formatDate } from '../../../lib/utils';
import { updateModule } from '../../../store/slices/authoring/courseContentSlice';
import { AppDispatch } from '../../../store/store';
import { useRevalidator } from 'react-router-dom';
import { Module } from '../../../store/slices/authoring/courseContentSlice';

interface ModuleCardProps {
	module: Module;
}

const ModuleCard = ({ module }: ModuleCardProps) => {
	const { name, type, modifiedTime, children, modifiedUserFullName, uid } =
		module;
	const dispatch = useDispatch<AppDispatch>();
	const [editingModuleTitle, setEditingModuleTitle] = useState(false);
	const { colors } = useTheme();
	const { isOpen, onToggle } = useDisclosure();
	const { month, day, year } = formatDate(modifiedTime);
	const { revalidate } = useRevalidator();

	return (
		<>
			<Card
				variant="authoringCard"
				justifyContent="space-between"
				flexDirection="row"
				alignItems="center"
				padding={4}>
				<CardBody
					alignItems="center"
					display="flex"
					flexDirection="row"
					gap={4}>
					<DragHandleDots2Icon
						width="24px"
						height="24px"
						color={colors.ampNeutral[200]}
					/>
					<Flex flexDirection="column" alignItems="flex-start" gap={1}>
						{editingModuleTitle ? (
							<Input
								fontSize="lg"
								defaultValue={name}
								variant="flushed"
								fontWeight="semibold"
								autoFocus={true}
								onBlur={(e) => {
									e.target.value = e.target.value.trim();
									setEditingModuleTitle(false);
									dispatch(
										updateModule({
											moduleUid: uid,
											updates: {
												...module,
												name: e.target.value.trim(),
											},
										}),
									).then(() => revalidate());
								}}
							/>
						) : (
							<Flex alignItems="center" gap={1}>
								<Text fontSize="lg" fontWeight="semibold">
									{name}
								</Text>
								<Button
									size="xs"
									variant="ghost"
									fontWeight="normal"
									color="ampTertiaryText"
									onClick={() => setEditingModuleTitle(true)}>
									Edit
								</Button>
							</Flex>
						)}

						<Flex flexDirection="row" alignItems="center" gap={2}>
							<Badge flexGrow="0">{type}</Badge>
							<Text fontSize="sm" fontWeight="normal">
								{children.length} Questions
							</Text>
							<Text color="ampTertiaryText" fontSize="xs" fontWeight="normal">
								Last Edited {month} {day}, {year} by {modifiedUserFullName}
							</Text>
						</Flex>
					</Flex>
				</CardBody>
				<CardFooter alignItems="center">
					<Button
						textDecoration="none"
						as={RouterLink}
						variant="ampOutline"
						fontSize="sm"
						size="sm">
						Open
					</Button>
					<IconButton
						aria-label="Open Card"
						icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
						variant="ghost"
						onClick={onToggle}
					/>
					<Menu>
						<MenuButton
							as={IconButton}
							icon={<DotsVerticalIcon />}
							border="none"
							variant="ghost"
							display="flex"
							zIndex={2}
							right="0px"
							size="xs"
							paddingTop={1}
							paddingBottom={1}
						/>
						<MenuList zIndex={3}>
							<MenuItem>Info</MenuItem>
							<MenuItem>History</MenuItem>
							<MenuItem>Analytics</MenuItem>
						</MenuList>
					</Menu>
				</CardFooter>
			</Card>
			<Collapse in={isOpen} animateOpacity>
				<Flex gap={4} flexDirection="column">
					{children.map((question: any) => {
						console.log(question);
						return <QuestionCard name={question.name} />;
					})}
				</Flex>
			</Collapse>
		</>
	);
};

export default ModuleCard;
