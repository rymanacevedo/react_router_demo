import {
	Card,
	Text,
	CardFooter,
	CardBody,
	Button,
	useTheme,
	Flex,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

const QuestionCard = ({ name }: { name: string }) => {
	const { colors } = useTheme();
	return (
		<Card
			variant="authoringCard"
			justifyContent="space-between"
			flexDirection="row"
			alignItems="center"
			marginLeft={16}>
			<CardBody alignItems="center" display="flex" flexDirection="row" gap={4}>
				<DragHandleDots2Icon
					width="24px"
					height="24px"
					color={colors.ampNeutral[200]}
				/>
				<Flex flexDirection="column">
					<Text fontSize="lg" fontWeight="normal">
						{name}
					</Text>
				</Flex>
			</CardBody>
			<CardFooter>
				<Button
					to="/authoring/folder"
					textDecoration="none"
					as={RouterLink}
					variant="ampOutline"
					fontSize="sm"
					size="sm">
					Open
				</Button>
			</CardFooter>
		</Card>
	);
};

export default QuestionCard;
