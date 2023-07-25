import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import AmpBox from '../../standard/container/AmpBox';
import { useTranslation } from 'react-i18next';

export default function Submission() {
	const { t: i18n } = useTranslation();
	return (
		<AmpBox>
			<Heading as="h2" fontSize="2xl">
				{i18n('reviewAndSubmit')}
			</Heading>

			<ButtonGroup>
				<Button>{i18n('submitAndFinish')}</Button>
				<Button colorScheme="ampSecondary" variant="ghost">
					{i18n('returnToQuestions')}
				</Button>
			</ButtonGroup>
		</AmpBox>
	);
}
