import {
	Flex,
	Card,
	Text,
	CardFooter,
	CardBody,
	useTheme,
	IconButton,
	MenuButton,
	Menu,
	MenuList,
	MenuItem,
	Box,
} from '@chakra-ui/react';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import ModuleCard from './ModuleCard';
import {
	Module,
	Section,
} from '../../../store/slices/authoring/courseContentSlice';

const SectionCard = ({ section }: { section: Section }) => {
	const { colors } = useTheme();
	return (
		<>
			<Card
				variant="authoringCard"
				justifyContent="space-between"
				flexDirection="row"
				alignItems="center"
				padding={4}
				backgroundColor="ampSecondary.700">
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
						<Flex alignItems="center" gap={1}>
							<Text fontSize="lg" fontWeight="normal" color="white">
								{section.name}
							</Text>
						</Flex>
					</Flex>
				</CardBody>
				<CardFooter alignItems="center">
					<Menu>
						<MenuButton
							as={IconButton}
							icon={<DotsVerticalIcon />}
							color="white"
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
							<MenuItem>Edit section</MenuItem>
							<MenuItem>Add modules</MenuItem>
							<MenuItem>Remove section</MenuItem>
						</MenuList>
					</Menu>
				</CardFooter>
			</Card>
			<Box marginLeft={16}>
				{section.modules.map((module: Module) => (
					<ModuleCard module={module} />
				))}
			</Box>
		</>
	);
};

export default SectionCard;
