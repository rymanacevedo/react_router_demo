import React, { useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Box, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type ProgressMessageComponentPropsType = {
	closeToast?: () => void;
	textPrompt?: string;
};

const ProgressMessageComponent = (props: ProgressMessageComponentPropsType) => {
	const { closeToast, textPrompt } = props;
	const [toastText, setToastText] = useState<string>('');
	const { t: i18n } = useTranslation();

	useEffect(() => {
		switch (textPrompt) {
			case 'FIVE_FAST_ANSWERS':
				setToastText(i18n('fiveFastAnswers'));
				break;
			case 'FIVE_CONSEC_SI':
				// handle FIVE_CONSEC_SI case
				break;
			case 'SIX_DK_IN_ROUND':
				// handle SIX_DK_IN_ROUND case
				break;
			case 'FIVE_CONSEC_SC':
				// handle FIVE_CONSEC_SC case
				break;
			default:
				setToastText(
					'You’re doing a great job at knowing what you are sure and unsure about.',
				);
		}
	}, [textPrompt]);
	return (
		<Box
			bg="ampSuccess.50"
			borderRadius={'12px'}
			padding="10px 20px 30px 20px"
			margin="24px">
			<div
				className="close"
				style={{ textAlignLast: 'right', cursor: 'pointer' }}
				onClick={closeToast}>
				<span style={{ fontSize: '20px' }}>&times;</span>
			</div>
			<HStack>
				<AvatarGroup spacing="4px">
					<Avatar bg="teal.500" />
				</AvatarGroup>
				<Text fontSize={'16px'}>{toastText}</Text>
			</HStack>
		</Box>
	);
};

export default ProgressMessageComponent;
