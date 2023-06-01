import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	ButtonGroup,
	Collapse,
	Divider,
	FormControl,
	Heading,
	HStack,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Text,
	Textarea,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import RichContentComponent from './RichContentComponent';
import {
	ChevronDownIcon,
	ChevronRightIcon,
	Pencil1Icon,
} from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { QuestionInFocus } from '../pages/AssignmentView/AssignmentTypes';
import { useFetcher } from 'react-router-dom';
import { ActionData } from '../login/LoginForm';
import { QuestionFeedbackFields } from '../../routes/QuestionFeedback';

const WhatYouNeedToKnowComponent = ({
	questionInFocus,
	courseKey,
	assignmentKey,
	onClick,
	isModal,
}: {
	questionInFocus: QuestionInFocus;
	courseKey: string | null;
	assignmentKey: string;
	onClick?: () => void;
	isModal?: boolean;
}) => {
	const { isOpen, onToggle } = useDisclosure();
	const { t: i18n } = useTranslation();
	const [radioValue, setRadioValue] = useState('');
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	const fetcher = useFetcher();
	const data = fetcher.data as ActionData<QuestionFeedbackFields>;

	return (
		<Box
			style={{
				backgroundColor: 'white',
			}}
			boxShadow={isSafari ? 'none' : 'xl'}
			w="100%"
			minH="40vh"
			overflow="hidden"
			borderRadius={24}
			padding={'34px 120px'}
			maxW="1496">
			<Heading as="h2">{i18n('whatYouNeedToKnow')}</Heading>
			<Stack paddingTop={'16px'} paddingBottom={'16px'}>
				<RichContentComponent content={questionInFocus?.explanationRc} />
			</Stack>
			{questionInFocus?.moreInformationRc?.length && (
				<>
					<Accordion allowMultiple>
						<AccordionItem style={{ borderStyle: 'none' }}>
							{({ isExpanded }) => (
								<>
									<Heading as="h2">
										<AccordionButton padding={'0'}>
											{isExpanded ? (
												<ChevronDownIcon
													style={{
														color: '#255A83',
														height: '30px',
														width: '30px',
													}}
												/>
											) : (
												<ChevronRightIcon
													style={{
														color: '#255A83',
														height: '30px',
														width: '30px',
													}}
												/>
											)}
											<Box
												as="span"
												flex="1"
												marginLeft={'24px'}
												textAlign="left">
												<Text fontSize={'24px'} textColor={'ampPrimary.600'}>
													{i18n('addLearn')}
												</Text>
											</Box>
										</AccordionButton>
									</Heading>
									<AccordionPanel padding={'0px'}>
										<RichContentComponent
											content={questionInFocus?.moreInformationRc}
										/>
									</AccordionPanel>
								</>
							)}
						</AccordionItem>
					</Accordion>
					<Stack paddingTop={'16px'} paddingBottom={'16px'}></Stack>
				</>
			)}

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
							w={'130px'}
							marginTop="-60px"
							rightIcon={<Pencil1Icon style={{ color: '#257CB5' }} />}
							onClick={onToggle}>
							<Text fontSize={'14px'} color={'ampSecondary.500'}>
								{i18n('leaveFeedback')}
							</Text>
						</Button>
					</HStack>
					<ButtonGroup
						width="100%"
						style={{ marginTop: '24px' }}
						justifyContent={'space-between'}>
						<Box>
							<Button variant="ampOutline">
								<Text>{i18n('yes')}</Text>
							</Button>
							<Button marginLeft="16px" variant="ampOutline">
								<Text>{i18n('no')}</Text>
							</Button>
						</Box>
						<Button
							display={isModal ? 'block' : 'none'}
							variant="ampSolid"
							onClick={onClick}>
							<Text>{i18n('gotIt')}</Text>
						</Button>
					</ButtonGroup>
				</VStack>
			</Collapse>
			<Collapse in={isOpen} animateOpacity>
				<Box
					color="black"
					bg="ampNeutral.50"
					borderRadius={'12px'}
					boxSizing="border-box"
					p="24px"
					marginTop={'16px'}>
					<Heading as="h3" size="md">
						{i18n('leaveFeedbackText')}
					</Heading>
					<fetcher.Form method="post" action="/feedback">
						<FormControl isRequired>
							<RadioGroup
								id="feedbackType"
								name="feedbackType"
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
						<FormControl
							isRequired={radioValue === 'other'}
							isInvalid={Boolean(data?.errors?.fieldErrors.feedback)}>
							<Textarea
								id="feedback"
								name="feedback"
								maxLength={500}
								bg="ampWhite"
								marginTop="16px"
								minHeight="150px"
								placeholder={i18n('placeHolderText')}
							/>
						</FormControl>
						<FormControl hidden={true}>
							<Input
								readOnly={true}
								id="id"
								name="id"
								value={questionInFocus.publishedQuestionId}
							/>
						</FormControl>
						<FormControl hidden={true}>
							<Input
								readOnly={true}
								id="questionVersionId"
								name="questionVersionId"
								value={questionInFocus.questionVersionId}
							/>
						</FormControl>
						<FormControl hidden={true}>
							<Input
								readOnly={true}
								id="questionUid"
								name="questionUid"
								value={questionInFocus.publishedQuestionAuthoringKey}
							/>
						</FormControl>
						<FormControl hidden={true}>
							<Input
								readOnly={true}
								id="courseKey"
								name="courseKey"
								value={courseKey ?? ''}
							/>
						</FormControl>
						<FormControl hidden={true}>
							<Input
								readOnly={true}
								id="assignmentKey"
								name="assignmentKey"
								value={assignmentKey}
							/>
						</FormControl>

						<ButtonGroup width="100%" marginTop={'16px'}>
							<Button type="submit" variant="ampSolid">
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
					</fetcher.Form>
				</Box>
			</Collapse>
		</Box>
	);
};

export default WhatYouNeedToKnowComponent;
