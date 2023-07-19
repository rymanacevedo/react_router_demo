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

	const setPossitiveFeedback = () => {
		setBgColor('ampSuccess.50');
		setIcon(<GreenIcon />);
	};

	useEffect(() => {
		switch (textPrompt) {
			case 'FIVE_FAST_ANSWERS':
				//priority 2000
				setToastText(i18n('fiveFastAnswers'));
				setNegativeFeedback();
				break;
			case 'FIVE_FAST_REVIEWS':
				//priority 1900
				setToastText(i18n('fiveFastReviews'));
				setNegativeFeedback();
				break;
			case 'TWO_NPA_ON_LU':
				// priority 1800
				setToastText(i18n('twoNpaOnLu'));
				setNegativeFeedback();
				break;
			case 'TWO_NPA_IN_ROUND':
				//priority 1700
				setToastText(i18n('twoNpaInRound'));
				setEncouragementFeedback();
				break;
			case 'TWO_FAST_REVIEWS_IN_LU':
				//priority 1600
				setToastText(i18n('twoFastReviewsInLu'));
				setNegativeFeedback();
				break;
			case 'SIX_DK_IN_ROUND':
				// priority 1500
				setToastText(i18n('sixDontKnowInRound'));
				setEncouragementFeedback();
				break;
			case 'TWO_IDENTICAL_SI':
				//priority 1200
				setToastText(i18n('twoIdenticalSureIncorrects'));
				setNegativeFeedback();
				break;
			case 'FIVE_CONSEC_SI':
				//priority 1000
				setToastText(i18n('fiveSureIncorrectAnswers'));
				setNegativeFeedback();
				break;
			case 'FULL_ROUND_OF_SC':
				//priority 700
				setToastText(i18n('fullRoundSureCorrect'));
				setPossitiveFeedback();
				break;
			case 'FIVE_CONSEC_SC':
				//priority 500
				setToastText(i18n('fiveSureCorrectAnswers'));
				setPossitiveFeedback();
				break;
			case 'TEN_LONG_REVIEWS':
				//priority 400
				setToastText(i18n('tenLongReviews'));
				setPossitiveFeedback();
				break;
			default:
				// TODO: we should throw an error here
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
				<Text fontSize="md">{toastText}</Text>
			</HStack>
		</Box>
	);
};

export default ProgressMessageComponent;
