import { HStack, Heading, Center, Box } from '@chakra-ui/react';
import AmpChip from '../../css/AmpChip';

const ExplanationTitle = ({ answer }: any) => {
	type ExplanationAnswerType = {
		[key: string]: string;
	};
	const textLookup: { [key: string]: any } = {
		SureCorrect: 'You knew this one!',
		SureIncorrect: 'You didn’t know this one, let’s dig in.',
		UnsureCorrect: 'You knew this one! You just weren’t sure.',
		UnsureIncorrect: 'You didn’t know this one, let’s dig in.',
		PartSurePartiallyCorrect: 'You got part of this one correct.',
		NotSureNoAnswerSelected: 'You didn’t know this one, let’s take a look.',
		OneAnswerPartSureIncorrect: 'You didn’t know this one, let’s dig in.',
		OneAnswerPartSureCorrect: 'You knew this one! You just weren’t sure.',
		PartSureIncorrect: 'You didn’t know this one, let’s dig in.',
		NANoAnswerSelected: 'You didn’t know this one, let’s take a look.',
		PartSureCorrect: 'You knew this one! You just weren’t sure.',
	};

	const iconLookup: { [key: string]: any } = {
		SureCorrect: 'ampDarkSuccess',
		SureIncorrect: 'ampDarkError',
		UnsureCorrect: 'ampDarkSuccessOutline',
		UnsureIncorrect: 'ampDarkErrorOutline',
		PartSurePartiallyCorrect: 'ampWarningOutline',
		NotSureNoAnswerSelected: 'ampNeutralFilled',
		OneAnswerPartSureIncorrect: 'ampDarkErrorOutline',
		OneAnswerPartSureCorrect: 'ampDarkSuccessOutline',
		PartSureIncorrect: 'ampDarkErrorOutline',
		NANoAnswerSelected: 'ampNeutralFilled',
		PartSureCorrect: 'ampDarkSuccessOutline',
	};

	const variant: string = iconLookup[answer as keyof ExplanationAnswerType];
	const text: string = textLookup[answer as keyof ExplanationAnswerType];

	return (
		<Box pt="5">
			<Center>
				<HStack>
					<AmpChip variant={variant} size="lg" />
					<Heading as="h2">{text}</Heading>
				</HStack>
			</Center>
		</Box>
	);
};

export default ExplanationTitle;
