import { Circle, Tag } from '@chakra-ui/react';

interface InterfaceAmpChip {
	variant:
		| 'ampDarkSuccessOutline'
		| 'ampDarkSuccessOutlineDot'
		| 'ampDarkSuccess'
		| 'ampDarkSuccessDot'
		| 'ampNeutralFilled'
		| 'ampNeutralFilledDot'
		| 'ampWarningOutline'
		| 'ampWarningOutlineDot'
		| 'ampDarkErrorOutline'
		| 'ampDarkErrorOutlineDot'
		| 'ampDarkError'
		| 'ampDarkErrorDot'
		| 'ampSecondary'
		| 'ampSecondaryDot';
	size: 'sm' | 'lg';
}

function AmpMiniChip({ variant }: InterfaceAmpChip): JSX.Element {
	const getDot = () => {
		switch (variant) {
			case 'ampDarkSuccessOutlineDot': {
				return <Circle size={'12px'} bg="ampSuccess.500"></Circle>;
				break;
			}
			case 'ampDarkSuccessDot': {
				return <Circle size={'12px'} bg="ampWhite"></Circle>;
				break;
			}
			case 'ampNeutralFilledDot': {
				return <Circle size={'12px'} bg="ampWhite"></Circle>;
				break;
			}
			case 'ampWarningOutlineDot': {
				return <Circle size={'12px'} bg="ampWarning.600"></Circle>;
				break;
			}
			case 'ampDarkErrorOutlineDot': {
				return <Circle size={'12px'} bg="ampError.700"></Circle>;
				break;
			}
			case 'ampDarkErrorDot': {
				return <Circle size={'12px'} bg="ampWhite"></Circle>;
				break;
			}
			case 'ampSecondaryDot': {
				return <Circle size={'12px'} bg="ampSecondary.500"></Circle>;
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
					? '4px'
					: '0px'
			}
			borderRadius="30"
			variant={variant}
			height={'12px'}
			width={'12px'}
			padding={'2px'}>
			{getDot()}
		</Tag>
	);
}

export default AmpMiniChip;
