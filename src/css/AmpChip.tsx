import { Tag } from '@chakra-ui/react';
import {
	CheckIcon,
	Cross1Icon,
	MinusIcon,
	QuestionMarkIcon,
} from '@radix-ui/react-icons';

interface InterfaceAmpChip {
	variant:
		| 'ampDarkSuccessOutline'
		| 'ampDarkSuccess'
		| 'ampNeutralFilled'
		| 'ampWarningOutline'
		| 'ampDarkErrorOutline'
		| 'ampDarkError';
	size: 'sm' | 'lg';
}

function AmpChip({ variant, size }: InterfaceAmpChip): JSX.Element {
	const getIcon = () => {
		switch (variant) {
			case 'ampDarkSuccessOutline': {
				return (
					<CheckIcon
						height={size === 'lg' ? 40 : 20}
						width={size === 'lg' ? 25 : 12}
					/>
				);
				break;
			}
			case 'ampDarkSuccess': {
				return (
					<CheckIcon
						height={size === 'lg' ? 40 : 20}
						width={size === 'lg' ? 25 : 12}
					/>
				);
				break;
			}
			case 'ampNeutralFilled': {
				return (
					<QuestionMarkIcon
						height={size === 'lg' ? 40 : 20}
						width={size === 'lg' ? 25 : 12}
					/>
				);
				break;
			}
			case 'ampWarningOutline': {
				return (
					<MinusIcon
						height={size === 'lg' ? 40 : 20}
						width={size === 'lg' ? 25 : 12}
					/>
				);
				break;
			}
			case 'ampDarkErrorOutline': {
				return (
					<Cross1Icon
						height={size === 'lg' ? 40 : 20}
						width={size === 'lg' ? 25 : 12}
					/>
				);
				break;
			}
			case 'ampDarkError': {
				return (
					<Cross1Icon
						height={size === 'lg' ? 40 : 20}
						width={size === 'lg' ? 25 : 12}
					/>
				);
				break;
			}
		}
	};
	return (
		<Tag
			border={
				Boolean(
					variant === 'ampDarkSuccessOutline' ||
						'ampWarningOutline' ||
						'ampDarkErrorOutline',
				)
					? size === 'lg'
						? '2px'
						: '1px'
					: '0px'
			}
			size={size}
			borderRadius="30"
			variant={variant}>
			{getIcon()}
		</Tag>
	);
}

export default AmpChip;
