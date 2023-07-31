import { Circle, Tag } from '@chakra-ui/react';

type AmpChip = {
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
		| 'ampNeutralUnfilled'
		| any;
};

function AmpMicroChip({ variant }: AmpChip): JSX.Element {
	const getDot = () => {
		switch (variant) {
			case 'ampDarkSuccessOutlineDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampSuccess.500" />;
			}
			case 'ampDarkSuccessDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampWhite" />;
			}
			case 'ampNeutralFilledDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampWhite" />;
			}
			case 'ampWarningOutlineDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampWarning.600" />;
			}
			case 'ampDarkErrorOutlineDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampError.700" />;
			}
			case 'ampDarkErrorDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampWhite" />;
			}
			case 'ampSecondaryDot': {
				return <Circle size={'6px'} margin="0 auto" bg="ampSecondary.500" />;
			}
		}
	};
	return (
		<Tag
			border="1px"
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
