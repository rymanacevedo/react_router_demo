import {
	Badge,
	Button,
	Checkbox,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Spacer,
	Text,
} from '@chakra-ui/react';
import CoursesFilterBadge from './CoursesFilterBadge';
import React, { useState } from 'react';
import {
	ALERT_BADGE_HAS_ISSUES,
	ALERT_BADGE_HAS_UNPUBLISHED_EDITS,
	STATUS_BADGE_DRAFT,
	STATUS_BADGE_PUBLISHED,
} from '../../../lib/authoring/constants';
import {
	selectCourseListFilter,
	selectCreators,
	updateCourseListFilter,
} from '../../../store/slices/authoring/coursesViewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

interface FilterBadgeButtonProps {
	onClick: () => void;
	variant: string;
	label: string;
	icon?: any;
}

const FilterBadgeButton = ({
	onClick,
	variant,
	label,
	icon,
}: FilterBadgeButtonProps) => {
	return (
		<Button variant="ghost" padding="0" margin="0" onClick={onClick}>
			<Badge
				variant={variant}
				display="flex"
				gap={2}
				height="100%"
				alignItems="center">
				{icon ? React.createElement(icon) : null}
				{label}
			</Badge>
		</Button>
	);
};

interface CourseFilterModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const CoursesFilterModal = ({ isOpen, onClose }: CourseFilterModalProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const creatorsState = useSelector(selectCreators);
	const filterState = useSelector(selectCourseListFilter);

	const [isPublished, setIsPublished] = useState(filterState.isPublished);
	const [isDraft, setIsDraft] = useState(filterState.isDraft);
	const [hasRecommendations, setHasRecommendations] = useState(
		filterState.hasRecommendations,
	);
	const [hasIssues, setHasIssues] = useState(filterState.hasIssues);
	const [hasUnpublishedEdits, setHasUnpublishedEdits] = useState(
		filterState.hasUnpublishedEdits,
	);
	const [selectedCreators, setSelectedCreators] = useState(
		creatorsState.creators.map((creator) =>
			filterState.creatorUids.includes(creator.uid),
		),
	);

	const count =
		+isPublished +
		+isDraft +
		+hasRecommendations +
		+hasIssues +
		+hasUnpublishedEdits +
		selectedCreators.reduce(
			(accumulator, selectedCreator) => +selectedCreator + accumulator,
			0,
		);

	const resetAll = () => {
		setIsPublished(filterState.isPublished);
		setIsDraft(filterState.isDraft);
		setHasRecommendations(filterState.hasRecommendations);
		setHasIssues(filterState.hasIssues);
		setHasUnpublishedEdits(filterState.hasUnpublishedEdits);
		setSelectedCreators(
			creatorsState.creators.map((creator) =>
				filterState.creatorUids.includes(creator.uid),
			),
		);
	};

	const clearAll = () => {
		setIsPublished(false);
		setIsDraft(false);
		setHasRecommendations(false);
		setHasIssues(false);
		setHasUnpublishedEdits(false);
		setSelectedCreators(creatorsState.creators.map(() => false));
	};

	const handeCancel = () => {
		resetAll();
		onClose();
	};

	const handleApply = () => {
		dispatch(
			updateCourseListFilter({
				isPublished,
				isDraft,
				hasRecommendations,
				hasIssues,
				hasUnpublishedEdits,
				creatorUids: selectedCreators
					.map((selected, index) =>
						selected ? creatorsState.creators[index].uid : null,
					)
					.filter((uid) => uid) as string[], // keep TS happy
			}),
		);
		navigate('/authoring');
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true} onEsc={resetAll}>
			<ModalOverlay background="rgba(41, 61, 89, 0.8)" />
			<ModalContent>
				<ModalHeader>
					<Flex direction="row" alignItems="center" marginBottom={4}>
						<Text fontSize="2xl" fontWeight="600" color="ampSecondaryText">
							Filter by
						</Text>
						<Spacer />
						<CoursesFilterBadge count={count} />
						<Text fontSize="sm" fontWeight="normal">
							filters applied
						</Text>
					</Flex>
				</ModalHeader>
				<ModalBody>
					<Flex paddingBottom={6} direction="column">
						<Text fontSize="xl" fontWeight="600" color="ampSecondaryText">
							Status
						</Text>
						<Flex direction="row" gap={2}>
							<FilterBadgeButton
								onClick={() => setIsPublished(!isPublished)}
								variant={
									isPublished
										? STATUS_BADGE_PUBLISHED.selectedVariant
										: STATUS_BADGE_PUBLISHED.unselectedVariant
								}
								label={STATUS_BADGE_PUBLISHED.label}
							/>
							<FilterBadgeButton
								onClick={() => setIsDraft(!isDraft)}
								variant={
									isDraft
										? STATUS_BADGE_DRAFT.selectedVariant
										: STATUS_BADGE_DRAFT.unselectedVariant
								}
								label={STATUS_BADGE_DRAFT.label}
							/>
						</Flex>
					</Flex>
					<Flex paddingBottom={6} direction="column">
						<Text fontSize="xl" fontWeight="600" color="ampSecondaryText">
							Alerts
						</Text>
						<Flex direction="row" gap={2}>
							<FilterBadgeButton
								onClick={() => setHasUnpublishedEdits(!hasUnpublishedEdits)}
								variant={
									hasUnpublishedEdits
										? ALERT_BADGE_HAS_UNPUBLISHED_EDITS.selectedVariant
										: ALERT_BADGE_HAS_UNPUBLISHED_EDITS.unselectedVariant
								}
								label={ALERT_BADGE_HAS_UNPUBLISHED_EDITS.label}
								icon={ALERT_BADGE_HAS_UNPUBLISHED_EDITS.icon}
							/>
							<FilterBadgeButton
								onClick={() => setHasIssues(!hasIssues)}
								variant={
									hasIssues
										? ALERT_BADGE_HAS_ISSUES.selectedVariant
										: ALERT_BADGE_HAS_ISSUES.unselectedVariant
								}
								label={ALERT_BADGE_HAS_ISSUES.label}
								icon={ALERT_BADGE_HAS_ISSUES.icon}
							/>
						</Flex>
					</Flex>
					<Flex paddingBottom={6} direction="column">
						<Text fontSize="xl" fontWeight="600" color="ampSecondaryText">
							Author
						</Text>
						<SimpleGrid columns={2}>
							{creatorsState.creators.map((creator, index) => {
								return (
									<Checkbox
										isChecked={selectedCreators[index]}
										onChange={() => {
											setSelectedCreators([
												...selectedCreators.slice(0, index),
												!selectedCreators[index],
												...selectedCreators.slice(index + 1),
											]);
										}}
										variant="formCheckbox">
										{creator.firstName} {creator.lastName}
									</Checkbox>
								);
							})}
						</SimpleGrid>
					</Flex>
				</ModalBody>
				<ModalFooter justifyContent="flex-start" gap={2}>
					<Button
						variant="outline"
						color="ampPrimary.600"
						borderColor="ampPrimary.300"
						onClick={handleApply}>
						Apply
					</Button>
					<Button variant="ghost" color="ampPrimary.600" onClick={handeCancel}>
						Cancel
					</Button>
					<Spacer />
					<Button variant="ghost" color="ampPrimary.600" onClick={clearAll}>
						Clear all
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CoursesFilterModal;
