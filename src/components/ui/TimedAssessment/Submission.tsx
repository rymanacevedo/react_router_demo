import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import AmpBox from '../../standard/container/AmpBox';

export default function Submission() {
	return (
		<AmpBox>
			<Heading as="h2" fontSize="2xl">
				Review & Submit
			</Heading>

			<ButtonGroup>
				<Button>Submit and finish</Button>
				<Button colorScheme="ampSecondary" variant="ghost">
					Return to questions
				</Button>
			</ButtonGroup>
		</AmpBox>
	);
}
