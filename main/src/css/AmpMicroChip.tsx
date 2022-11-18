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
		| 'ampSecondaryDot'
		| 'ampNeutralUnfilled';
}

function AmpMicroChip({ variant }: InterfaceAmpChip): JSX.Element {
	const getDot = () => {
		switch (variant) {
			case 'ampDarkSuccessOutlineDot': {
				return (
					<Circle size={'6px'} margin="0 auto" bg="ampSuccess.500"></Circle>
				);
				break;
			}
			case 'ampDarkSuccessDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampWhite"></Circle>;
				break;
			}
			case 'ampNeutralFilledDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampWhite"></Circle>;
				break;
			}
			case 'ampWarningOutlineDot': {
				return (
					<Circle size={'6px'} margin="0 auto" bg="ampWarning.600"></Circle>
				);
				break;
			}
			case 'ampDarkErrorOutlineDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampError.700"></Circle>;
				break;
			}
			case 'ampDarkErrorDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampWhite"></Circle>;
				break;
			}
			case 'ampSecondaryDot': {
				return (
					<Circle size={'6px'} margin="0 auto" bg="ampSecondary.500"></Circle>
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
					? '1px'
					: '1px'
			}
			borderRadius="30"
			variant={variant}
			minHeight={'12px !important'}
			minWidth={'12px !important'}
			padding={'0px'}>
			{getDot()}
		</Tag>
	);
}

export default AmpMicroChip;
