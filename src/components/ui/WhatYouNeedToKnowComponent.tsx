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
import ReviewContentRender from './Review/ReviewContentRender';
import {
	ChevronDownIcon,
	ChevronRightIcon,
	Pencil1Icon,
} from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import Overlay from './Overlay';
import { ActionData } from '../login/LoginForm';
import { QuestionFeedbackFields } from '../../routes/QuestionFeedback';
import { QuestionInFocus } from '../../lib/validator';

const WhatYouNeedToKnowComponent = ({
	questionInFocus,
	courseKey,
	assignmentKey,
	onClick,
	isModal,
	isInReviewView,
}: {
	questionInFocus: QuestionInFocus;
	courseKey: string | null;
	assignmentKey: string;
	onClick?: () => void;
	isModal?: boolean;
	isInReviewView?: boolean;
}) => {
	const { isOpen, onToggle } = useDisclosure();
	const { t: i18n } = useTranslation();
	const [radioValue, setRadioValue] = useState('');
	const fetcher = useFetcher();
	const data = fetcher.data as ActionData<QuestionFeedbackFields>;
	const ref = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (fetcher.state === 'idle' && fetcher.data?.response?.ok && ref.current) {
			ref.current.reset();
		}
	}, [fetcher]);

	return (
		<Box
			bgColor="ampWhite"
			boxShadow="md"
			w="100%"
			minH="40vh"
			overflow="hidden"
			borderRadius={24}
			padding={'34px 120px'}
			maxW="1496">
			<Heading as="h2" fontSize="xl">
				{i18n('whatYouNeedToKnow')}
			</Heading>
			<Stack paddingTop={'16px'} paddingBottom={'16px'}>
				<ReviewContentRender content={questionInFocus?.explanationRc} />
			</Stack>
			{questionInFocus?.moreInformationRc?.length && (
				<>
					<Accordion allowMultiple>
						<AccordionItem style={{ borderStyle: 'none' }}>
							{({ isExpanded }) => (
								<>
									<Heading as="h2" fontSize="xl">
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
												<Text fontSize="2xl" textColor={'ampPrimary.600'}>
													{i18n('addLearn')}
												</Text>
											</Box>
										</AccordionButton>
									</Heading>
									<AccordionPanel padding={'0px'}>
										<ReviewContentRender
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

			{!isInReviewView && <Divider />}
			<Collapse in={!isOpen} animateOpacity>
				<VStack marginTop={'16px'} display={isInReviewView ? 'none' : 'flex'}>
					<HStack justifyContent={'space-between'} width="100%" spacing="20px">
						<Text float="left" fontSize="xs">
							{i18n('wasThisExplanationHelpful')}
						</Text>
						<Button
							colorScheme="ampSecondary"
							variant="ghost"
							rightIcon={<Pencil1Icon style={{ color: 'ampSecondary.500' }} />}
							onClick={onToggle}>
							{i18n('leaveFeedback')}
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
					position="relative"
					color="black"
					bg="ampNeutral.50"
					borderRadius={'12px'}
					boxSizing="border-box"
					p="24px"
					marginTop={'16px'}>
					<Heading as="h3" size="md">
						{i18n('leaveFeedbackText')}
					</Heading>
					{fetcher.state === 'idle' && data ? (
						data?.response?.ok ? (
							<Overlay
								isOpen={fetcher.data?.response?.ok}
								text={i18n('thankYouForYourFeedback')}
							/>
						) : data?.errors ? (
							<Text>{fetcher.data?.errors}</Text>
						) : null
					) : null}
					<fetcher.Form ref={ref} method="POST" action="/feedback">
						<FormControl isRequired>
							<RadioGroup
								id="feedbackType"
								name="feedbackType"
								marginTop={'16px'}
								onChange={setRadioValue}
								value={radioValue}>
								<HStack spacing={40}>
									<VStack alignItems={'left'}>
										<Radio value="I disagree with the answer">
											{i18n('IDisagreeWithTheAnswer')}
										</Radio>
										<Radio value="This question could be improved">
											{i18n('thisQuestionCouldBeImproved')}
										</Radio>
									</VStack>
									<VStack alignItems={'left'}>
										<Radio value="I still don't understand">
											{i18n('iStillDontUnderstand')}
										</Radio>
										<Radio value="Other">{i18n('other')}</Radio>
									</VStack>
								</HStack>
							</RadioGroup>
						</FormControl>
						<FormControl
							isRequired={radioValue === 'Other'}
							isInvalid={Boolean(fetcher.data?.errors?.fieldErrors.feedback)}>
							<Textarea
								id="feedback"
								name="feedback"
								maxLength={500}
								bg="ampWhite"
								marginTop="16px"
								minHeight="150px"
								placeholder={'Type your comments here (500 character limit).'}
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
						{/*TODO: we need to add a story for Healthcare discipline*/}
						<FormControl hidden={true}>
							<Input
								readOnly={true}
								id="discipline"
								name="discipline"
								value="Standard"
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
