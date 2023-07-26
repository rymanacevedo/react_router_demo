import { Flex, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { QuestionInFocus } from '../../lib/validator';

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
			<Flex
				bgColor="ampWhite"
				h="3xs"
				m={6}
				borderRadius="3xl"
				p={12}
				boxShadow="md">
				<Heading as="h2" fontSize="xl" ml={67.5}>
					{i18n('dragMatch')}
				</Heading>
			</Flex>
			<Flex direction="row" mx={6} mb={6} boxShadow="md" borderRadius="3xl">
				<Flex
					w="50%"
					height="500px"
					bgColor="ampWhite"
					p={12}
					borderLeftRadius="3xl">
					<Heading as="h2" fontSize="xl" ml={67.5}>
						{i18n('options')}
					</Heading>
				</Flex>
				<Flex
					w="50%"
					height="500px"
					bgColor="ampWhite"
					p={12}
					borderRightRadius="3xl">
					<Heading as="h2" fontSize="xl">
						{i18n('answers')}
					</Heading>
				</Flex>
			</Flex>
		</Flex>
	);
}
