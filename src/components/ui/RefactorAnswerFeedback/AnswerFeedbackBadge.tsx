import { Badge, Flex, Text } from '@chakra-ui/react';
import {
	CheckIcon,
	Cross1Icon,
	MinusCircledIcon,
	QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import { Confidence, Correctness } from './AnswerFeedback';

export type BadgeVariantValues =
	| 'ampDarkSuccessOutline'
	| 'ampNeutralFilled'
	| 'ampDarkSuccess'
	| 'ampWarningOutline'
	| 'ampDarkErrorOutline'
	| 'ampDarkError';

type Props = {
	variant: BadgeVariantValues | undefined;
	confidence: Confidence | null;
	correctness: Correctness | null;
};
export default function AnswerFeedbackBadge({
	variant,
	confidence,
	correctness,
}: Props) {
	const badgeIcon = (v: BadgeVariantValues | undefined) => {
		switch (v) {
			case 'ampDarkSuccessOutline': {
				return <CheckIcon />;
			}
			case 'ampNeutralFilled': {
				return <QuestionMarkCircledIcon />;
			}
			case 'ampDarkSuccess': {
				return <CheckIcon />;
			}
			case 'ampWarningOutline': {
				return <MinusCircledIcon />;
			}
			case 'ampDarkErrorOutline': {
				return <Cross1Icon />;
			}
			case 'ampDarkError': {
				return <Cross1Icon />;
			}
		}
	};

	return (
		<Flex>
			{confidence === 'idk' ? (
				<Text mr={2}>You answered</Text>
			) : (
				<>
					<Text>You were</Text>
					<Badge ml={2} variant={variant}>
						{confidence}
					</Badge>
					<Flex display="inline-flex" mr={2} ml={2}>
						and
					</Flex>
				</>
			)}
			<Badge variant={variant}>
				<Flex align="center">
					{badgeIcon(variant)} <Text paddingLeft={'5px'}>{correctness}</Text>
				</Flex>
			</Badge>
		</Flex>
	);
}
