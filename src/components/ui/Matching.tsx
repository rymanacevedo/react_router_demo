import { Box, Flex, Heading } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StricModeDroppable';
import { useTranslation } from 'react-i18next';
import { QuestionInFocus } from '../../lib/validator';
import AmpBox from '../standard/container/AmpBox';

import DragItem from './DragItem';
import DropItem from './DropItem';
import useArray from '../../hooks/useArray';

type Props = { questionInFocus: QuestionInFocus };
type InitialOptions = {
	publishedOptionId: string | number | null;
	optionRc: string | null;
};

type InitialAnswers = {
	publishedAnswerId: string | number | null;
	answerRc: string | null;
};

export default function Matching({ questionInFocus }: Props) {
	const { t: i18n } = useTranslation();
	const { array: initialOptions } = useArray<InitialOptions>(
		questionInFocus.answerList.map((obj) => ({
			publishedOptionId: obj.publishedOptionId,
			optionRc: obj.optionRc,
		})),
	);

	const { array: initialAnswers } = useArray<InitialAnswers>(
		questionInFocus.answerList.map((obj) => ({
			publishedAnswerId: obj.publishedAnswerId,
			answerRc: obj.answerRc,
		})),
	);

	const { array: droppedItems, set: setDroppedItems } =
		useArray<InitialOptions>([]);

	//this function is just a placeholder for now, the source and destination logic wil be in another story
	const handleDragEnd = (result: any) => {
		if (!result.destination) return;

		const { source, destination } = result;

		if (
			source.droppableId === 'draggableItems' &&
			destination.droppableId === 'dropTargets'
		) {
			const newDroppedItems = [...droppedItems];
			newDroppedItems[destination.index] = initialOptions[source.index];
			setDroppedItems(newDroppedItems);
		}
	};

	return (
		<Flex
			bgColor="ampNeutral.50"
			w="100%"
			h="auto"
			direction="column"
			maxW="1496px">
			<AmpBox minH="3xs" m={6}>
				<Heading as="h2" fontSize="xl" ml={[0, 0, 0, 67.5]}>
					{i18n('dragMatch')}
				</Heading>
			</AmpBox>

			<AmpBox h="auto" mx={6} mb={6} direction="row" wrap="wrap">
				<DragDropContext onDragEnd={handleDragEnd}>
					<Flex
						bgColor="ampWhite"
						w={['100%', '100%', '100%', '50%', '50%', '50%']}
						direction="column">
						<Heading as="h2" fontSize="xl" ml={[0, 0, 0, 67.5]} mb={10}>
							{i18n('options')}
						</Heading>
						<Flex
							p={4}
							w="400px"
							h="auto"
							direction="column"
							bgColor="ampNeutral.50"
							borderRadius="xl"
							ml={[0, 0, 0, 67.5]}>
							<StrictModeDroppable droppableId="draggableItems">
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{initialOptions.map((option, index) => (
											<DragItem
												key={option.publishedOptionId!.toString()}
												keyToUse={option.publishedOptionId!.toString()}
												draggableId={option.publishedOptionId!.toString()}
												index={index}
												option={option}
											/>
										))}
										{provided.placeholder}
									</div>
								)}
							</StrictModeDroppable>
						</Flex>
					</Flex>
					<Flex
						bgColor="ampWhite"
						w={['100%', '100%', '100%', '50%', '50%', '50%']}
						direction="column">
						<Heading as="h2" fontSize="xl" mb={10}>
							{i18n('answers')}
						</Heading>
						<Flex
							px={4}
							pb={4}
							pt={0}
							w="500px"
							h="auto"
							direction="column"
							borderRadius="xl">
							<StrictModeDroppable droppableId="dropTargets">
								{(provided) => (
									<Box ref={provided.innerRef} {...provided.droppableProps}>
										{initialAnswers.map((answer: InitialAnswers) => (
											<DropItem
												key={answer.publishedAnswerId}
												title={answer.answerRc}
											/>
										))}
										{provided.placeholder}
									</Box>
								)}
							</StrictModeDroppable>
						</Flex>
					</Flex>
				</DragDropContext>
			</AmpBox>
		</Flex>
	);
}
