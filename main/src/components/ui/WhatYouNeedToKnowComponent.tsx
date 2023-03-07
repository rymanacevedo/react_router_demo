import {
	Box,
	Heading,
	VStack,
	Text,
	Button,
	Stack,
	Divider,
	ButtonGroup,
	HStack,
	useDisclosure,
	Collapse,
	RadioGroup,
	Radio,
	Textarea,
	FormControl,
} from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const WhatYouNeedToKnowComponent = ({
	introductionRc,
}: {
	introductionRc: any;
}) => {
	const { isOpen, onToggle } = useDisclosure();
	const { t: i18n } = useTranslation();
	const [radioValue, setRadioValue] = useState('');
	const [textAreaValue, setTextAreaValue] = useState('');

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<Box
			style={{
				backgroundColor: 'white',
			}}
			boxShadow="2xl"
			w="100%"
			maxWidth="1093px"
			minH="40vh"
			overflow="hidden"
			borderRadius={24}
			p={8}>
			<Heading as="h2">{i18n('whatYouNeedToKnow')}</Heading>
			<Stack paddingTop={'16px'} paddingBottom={'16px'}>
				<RichContentComponent content={introductionRc} />
			</Stack>
			<Divider />
			<Collapse in={!isOpen} animateOpacity>
				<VStack marginTop={'16px'}>
					<HStack justifyContent={'space-between'} width="100%" spacing="20px">
						<Text float="left" fontSize="14px">
							{i18n('wasThisExplanationHelpful')}
						</Text>
						<Button
							_hover={{ backgroundColor: 'white' }}
							height="12px"
							variant="ghost"
							marginTop="-60px"
							leftIcon={<Pencil1Icon style={{ color: '#257CB5' }} />}
							onClick={onToggle}>
							<Text fontSize={'14px'} color={'ampSecondary.500'}>
								{i18n('leaveFeedback')}
							</Text>
						</Button>
					</HStack>
					<ButtonGroup width="100%">
						<Button variant="ampOutline">
							<Text>{i18n('yes')}</Text>
						</Button>
						<Button variant="ampOutline">
							<Text>{i18n('no')}</Text>
						</Button>
					</ButtonGroup>
				</VStack>
			</Collapse>
			<Collapse in={isOpen} animateOpacity>
				<Box
					as="form"
					onSubmit={submitHandler}
					color="black"
					bg="ampNeutral.50"
					borderRadius={'12px'}
					boxSizing="border-box"
					p="24px"
					marginTop={'16px'}>
					<Heading fontWeight={'600'} fontSize={'21px'}>
						{i18n('leaveFeedbackText')}
					</Heading>
					<FormControl isRequired={true}>
						<RadioGroup
							marginTop={'16px'}
							onChange={setRadioValue}
							value={radioValue}>
							<HStack spacing={40}>
								<VStack alignItems={'left'}>
									<Radio value="disagree">
										{i18n('IDisagreeWithTheAnswer')}
									</Radio>
									<Radio value="qImprove">
										{i18n('thisQuestionCouldBeImproved')}
									</Radio>
								</VStack>
								<VStack alignItems={'left'}>
									<Radio value="idk">{i18n('iStillDontUnderstand')}</Radio>
									<Radio value="other">{i18n('other')}</Radio>
								</VStack>
							</HStack>
						</RadioGroup>
					</FormControl>
					<FormControl isRequired={radioValue === 'other'}>
						<Textarea
							maxLength={500}
							bg="ampWhite"
							marginTop="16px"
							minHeight="150px"
							value={textAreaValue}
							placeholder={i18n('placeHolderText')}
							onChange={(e) => {
								setTextAreaValue(e.target.value);
							}}
						/>
					</FormControl>

					<ButtonGroup width="100%" marginTop={'16px'}>
						<Button variant="ampSolid" type="submit">
							<Text>{i18n('submitBtnText')}</Text>
						</Button>
						<Button
							variant="ampOutline"
							onClick={() => {
								onToggle();
								setRadioValue('');
							}}>
							<Text>{i18n('cancelBtnText')}</Text>
						</Button>
					</ButtonGroup>
				</Box>
			</Collapse>
		</Box>
	);
};

export default WhatYouNeedToKnowComponent;
