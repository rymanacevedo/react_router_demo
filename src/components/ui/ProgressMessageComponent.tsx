import React, { ReactElement, useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Box, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Cross1Icon } from '@radix-ui/react-icons';
import RedIcon from './RedIcon';
import GreenIcon from './GreenIcon';

type ProgressMessageComponentPropsType = {
	closeToast?: () => void;
	textPrompt?: string;
	isMenuOpen: boolean;
};

const ProgressMessageComponent = (props: ProgressMessageComponentPropsType) => {
	const { closeToast, textPrompt, isMenuOpen } = props;
	const [toastText, setToastText] = useState<string>('');
	const [bgColor, setBgColor] = useState<string>('ampSuccess.50');
	const [icon, setIcon] = useState<ReactElement<any, any> | undefined>(
		<Cross1Icon />,
	);
	const [iconColor, setIconColor] = useState<string>('teal.500');
	const { t: i18n } = useTranslation();

	useEffect(() => {
		switch (textPrompt) {
			case 'FIVE_FAST_ANSWERS':
				setToastText(i18n('fiveFastAnswers'));
				setBgColor('red.100');
				setIconColor('red.500');
				setIcon(<RedIcon />);
				break;
			case 'FIVE_CONSEC_SI':
				// handle FIVE_CONSEC_SI case
				break;
			case 'SIX_DK_IN_ROUND':
				// handle SIX_DK_IN_ROUND case
				break;
			case 'FIVE_CONSEC_SC':
				setToastText(i18n('fiveSureCorrectAnswers'));
				setBgColor('ampSuccess.50');
				setIcon(<GreenIcon />);
				break;
			default:
				setToastText(
					'You’re doing a great job at knowing what you are sure and unsure about.',
				);
				setIcon(undefined);
				setIconColor('teal.500');
				setBgColor('ampSuccess.50');
		}
	}, [textPrompt]);
	return (
		<Box
			bg={bgColor}
			borderRadius={'12px'}
			padding={isMenuOpen ? '30px 20px 30px 20px' : '10px 20px 30px 20px'}
			margin="24px">
			{!isMenuOpen && (
				<div
					className="close"
					style={{ textAlignLast: 'right', cursor: 'pointer' }}
					onClick={closeToast}>
					<span style={{ fontSize: '20px' }}>&times;</span>
				</div>
			)}
			<HStack>
				<AvatarGroup spacing="4px">
					<Avatar bg={iconColor} icon={icon}></Avatar>
				</AvatarGroup>
				<Text fontSize={'16px'}>{toastText}</Text>
			</HStack>
		</Box>
	);
};

export default ProgressMessageComponent;
