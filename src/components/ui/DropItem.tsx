import { Center, Flex, Text } from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';
import { useTranslation } from 'react-i18next';

type DropItemProps = {
	title: string | null;
};

const DropItem = ({ title }: DropItemProps) => {
	const { t: i18n } = useTranslation();

	return (
		<>
			<Text as="div" fontSize="lg" fontWeight="normal" mb={4}>
				{<RichContentComponent content={title} />}
			</Text>
			<Flex
				bgColor="ampWhite"
				border="1.5px dashed"
				borderColor="ampTertiaryText"
				borderRadius="md"
				maxH="200px"
				h="60px"
				mb={12}
				paddingLeft={4}
				paddingRight={6}
				py={2.5}
				w="398px">
				<Center w="100%">
					<Text
						border="2px solid #FBE8AB"
						color="ampTertiaryText"
						fontSize="xs"
						fontWeight="semibold">
						{i18n('dragHere')}
					</Text>
				</Center>
			</Flex>
		</>
	);
};

export default DropItem;
