import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
} from '@chakra-ui/react';
import { PlusIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { createModule } from '../../../store/slices/authoring/courseContentSlice';
import { AppDispatch } from '../../../store/store';
import { useRevalidator } from 'react-router';

interface AddModuleProps {
	courseUid: string;
}

const AddModule = ({ courseUid }: AddModuleProps) => {
	const dispatch = useDispatch<AppDispatch>();
	const { revalidate } = useRevalidator();
	return (
		<Menu matchWidth={true}>
			<MenuButton
				as={Button}
				variant="outline"
				color="ampPrimary.600"
				paddingX="6"
				paddingY="2"
				fontWeight="semibold"
				rightIcon={<PlusIcon fill="ampPrimary.600" />}
				aria-label="Add new module">
				Add module
			</MenuButton>
			<MenuList>
				<MenuItem
					alignItems="center"
					gap={4}
					color="ampSecondaryText"
					onClick={() =>
						dispatch(
							createModule({
								parentUid: courseUid,
								name: 'Untitled Module',
								type: 'Standard',
							}),
						).then(() => revalidate())
					}>
					<PlusIcon />
					<Box>
						<Text fontWeight="semibold">Dynamic learning</Text>
						<Text>
							Question based learning that alternates between response and
							content review.
						</Text>
					</Box>
				</MenuItem>
				<MenuItem
					alignItems="center"
					gap={4}
					color="ampSecondaryText"
					onClick={() =>
						dispatch(
							createModule({
								parentUid: courseUid,
								name: 'Untitled Module',
								type: 'TimedAssessment',
							}),
						).then(() => revalidate())
					}>
					<PlusIcon />
					<Box>
						<Text fontWeight="semibold">Gap finder</Text>
						<Text>
							Question based learning that alternates between response and
							content review.
						</Text>
					</Box>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default AddModule;
