import React, { ReactElement, useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Box, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Cross1Icon } from '@radix-ui/react-icons';
import BlueIcon from './Icons/BlueIcon';
import RedIcon from './Icons/RedIcon';
import GreenIcon from './Icons/GreenIcon';

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

	const setNegativeFeedback = () => {
		setBgColor('red.100');
		setIconColor('red.500');
		setIcon(<RedIcon />);
	};

	const setEncouragementFeedback = () => {
		setBgColor('blue.100');
		setIcon(<BlueIcon />);
	};

	useEffect(() => {
		switch (textPrompt) {
			case 'FIVE_FAST_ANSWERS':
				setToastText(i18n('fiveFastAnswers'));
				setNegativeFeedback();
				break;
			case 'FIVE_CONSEC_SI':
				setToastText(i18n('fiveSureIncorrectAnswers'));
				setNegativeFeedback();
				break;
			case 'SIX_DK_IN_ROUND':
				setToastText(i18n('sixDontKnowInRound'));
				setEncouragementFeedback();
				break;
			case 'FIVE_CONSEC_SC':
				setToastText(i18n('fiveSureCorrectAnswers'));
				setBgColor('ampSuccess.50');
				setIcon(<GreenIcon />);
				break;
			case 'FULL_ROUND_OF_SC':
				setToastText(i18n('fullRoundSureCorrect'));
				setBgColor('ampSuccess.50');
				setIcon(<GreenIcon />);
				break;
			case 'FIVE_FAST_REVIEWS':
				setToastText(i18n('fiveFastReviews'));
				setNegativeFeedback();
				break;
			case 'TWO_FAST_REVIEWS_IN_LU':
				setToastText(i18n('twoFastReviewsInLu'));
				setNegativeFeedback();
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
