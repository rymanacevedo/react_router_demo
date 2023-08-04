import { Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { QuestionInFocus } from '../../lib/validator';
import AmpBox from '../standard/container/AmpBox';
import DragItem from './DragItem';
import DropItem from './DropItem';

type Props = { questionInFocus: QuestionInFocus };
//will remove es-lint disable when we start using data in this component
// eslint-disable-next-line
export default function Matching({ questionInFocus }: Props) {
	const { t: i18n } = useTranslation();

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
						ml={[0, 0, 0, 30]}>
						<DragItem />
						<DragItem />
						<DragItem />
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
						<DropItem />
						<DropItem />
						<DropItem />
					</Flex>
				</Flex>
			</AmpBox>
		</Flex>
	);
}
