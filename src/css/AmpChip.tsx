import { Center, Icon, Tag } from '@chakra-ui/react';
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
			case 'ampDarkSuccessOutline':
			case 'ampDarkSuccess': {
				return (
					<Icon as={CheckIcon} boxSize={size === 'lg' ? '25px' : '12px'} />
				);
			}
			case 'ampNeutralFilled': {
				return (
					<Icon
						as={QuestionMarkIcon}
						boxSize={size === 'lg' ? '25px' : '12px'}
					/>
				);
			}
			case 'ampWarningOutline': {
				return (
					<Icon as={MinusIcon} boxSize={size === 'lg' ? '25px' : '12px'} />
				);
			}
			case 'ampDarkErrorOutline':
			case 'ampDarkError': {
				return (
					<Icon as={Cross1Icon} boxSize={size === 'lg' ? '24px' : '13px'} />
				);
			}
		}
	};
	return (
		<Tag
			borderRadius="full"
			height={size === 'lg' ? '48px' : '24px'}
			width={size === 'lg' ? '48px' : '24px'}
			size={size}
			variant={variant}
			padding={0}
			border={
				variant === 'ampDarkSuccessOutline' ||
				variant === 'ampWarningOutline' ||
				variant === 'ampDarkErrorOutline'
					? size === 'lg'
						? '2px'
						: '1px'
					: '0px'
			}>
			<Center width={size === 'lg' ? '48px' : '24px'}>{getIcon()}</Center>
		</Tag>
	);
}

export default AmpChip;
