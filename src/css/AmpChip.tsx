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
		| 'ampDarkError'
		| string;
	size: 'sm' | 'lg';
}

function AmpChip({ variant, size }: InterfaceAmpChip): JSX.Element {
	const getIcon = () => {
		switch (variant) {
			case 'ampDarkSuccessOutline': {
				return (
					<CheckIcon
						height={size === 'lg' ? '40px' : '20px'}
						width={size === 'lg' ? '25px' : '12px'}
					/>
				);
				break;
			}
			case 'ampDarkSuccess': {
				return (
					<CheckIcon
						height={size === 'lg' ? '40px' : '20px'}
						width={size === 'lg' ? '25px' : '12px'}
					/>
				);
				break;
			}
			case 'ampNeutralFilled': {
				return (
					<QuestionMarkIcon
						height={size === 'lg' ? '40px' : '20px'}
						width={size === 'lg' ? '25px' : '12px'}
					/>
				);
				break;
			}
			case 'ampWarningOutline': {
				return (
					<MinusIcon
						height={size === 'lg' ? '40px' : '20px'}
						width={size === 'lg' ? '25px' : '12px'}
					/>
				);
				break;
			}
			case 'ampDarkErrorOutline': {
				return (
					<Cross1Icon
						height={size === 'lg' ? '40px' : '20px'}
						width={size === 'lg' ? '25px' : '12px'}
					/>
				);
				break;
			}
			case 'ampDarkError': {
				return (
					<Cross1Icon
						height={size === 'lg' ? '40px' : '20px'}
						width={size === 'lg' ? '25px' : '12px'}
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
			height={size === 'lg' ? '48px' : '20px'}
			width={size === 'lg' ? '48px' : '12px'}
			borderRadius="30"
			variant={variant}>
			{getIcon()}
		</Tag>
	);
}

export default AmpChip;
