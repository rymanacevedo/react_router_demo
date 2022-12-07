import React, { useState } from 'react';
import {
	Box,
	Button,
	HStack,
	Progress,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';
import AmpMicroChip from '../../css/AmpMicroChip';
import { useTranslation } from 'react-i18next';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons';
import ProgressMessageComponent from './ProgressMessageComponent';

const TestProgressBarMenu = () => {
	const { t: i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const toast = useToast();
	const id = 'progress-toast';

	return (
		<Box width="100vw" boxSizing="border-box">
			<HStack
				borderBottom={'1px'}
				borderBottomColor="ampSecondary.300"
				zIndex="2"
				position={'absolute'}
				width="100%"
				height={'80px'}
				bg={'transparent'}
				justify="space-between"
				paddingLeft="24px"
				paddingRight="24px">
				<VStack align={'left'}>
					<Text fontSize={'21px'} fontWeight={'600'}>
						{i18n('theScienceOfLearning')}
					</Text>
					<Text fontSize={'16px'} color="ampNeutral.800">
						{`${i18n('about')} 24 ${i18n('minsLeft')}`}
					</Text>
				</VStack>
				<VStack>
					<Text fontSize={'20px'} fontWeight={'600'}>
						{`Round 1: ${i18n('questions')}`}
					</Text>
					<HStack>
						<AmpMicroChip variant="ampDarkSuccess" />
						<AmpMicroChip variant="ampDarkSuccess" />
						<AmpMicroChip variant="ampDarkSuccess" />
						<AmpMicroChip variant="ampDarkErrorOutline" />
						<AmpMicroChip variant="ampDarkError" />
						<AmpMicroChip variant="ampSecondaryDot" />
						<AmpMicroChip variant="ampNeutralUnfilled" />
					</HStack>
				</VStack>
<<<<<<< HEAD
				<Popover>
					<PopoverTrigger>
						<Button
							variant={'outline'}
							borderColor={'ampPrimary.300'}
							bg="ampWhite"
							width="200px"
							leftIcon={isOpen ? <ExitIcon /> : <EnterIcon />}
							onClick={() => setIsOpen(!isOpen)}>
							<Text fontSize={'16px'} fontWeight="600">
								{isOpen ? i18n('hideProgress') : i18n('showProgress')}
							</Text>
						</Button>
					</PopoverTrigger>
					<PopoverContent borderRadius={'24px'} width={'375px'}>
						<ProgressMessageComponent />
						<Button
							variant={'outline'}
							borderColor={'ampPrimary.300'}
							bg="ampWhite"
							width="325px"
							height="40px"
							margin="24px">
							<Text fontSize={'16px'} fontWeight="600">
								{i18n('viewMoreProgress')}
							</Text>
						</Button>
					</PopoverContent>
				</Popover>
=======
				<Button
					variant={'outline'}
					borderColor={'ampPrimary.300'}
					bg="ampWhite"
					width="200px"
					leftIcon={isOpen ? <ExitIcon /> : <EnterIcon />}
					onClick={() => {
						if (!toast.isActive(id)) {
							toast({
								position: 'top-right',
								duration: 10000,
								isClosable: true,
								id,
								render: () => (
									<Box
										marginTop={'160px'}
										padding={'24px'}
										paddingRight={'400px'}
										borderRadius={'24px'}
										width={'375px'}
										marginLeft="200px"
										bg="ampWhite">
										<Box
											width="325px"
											bg="ampSuccess.50"
											borderRadius={'12px'}
											padding="20px">
											<HStack>
												<AvatarGroup spacing="4px">
													<Avatar bg="teal.500" />
												</AvatarGroup>
												<Text fontSize={'16px'}>
													You’re doing a great job at knowing what you are sure
													and unsure about.
												</Text>
											</HStack>
										</Box>
										<Button
											variant={'outline'}
											borderColor={'ampPrimary.300'}
											bg="ampWhite"
											width="325px"
											height="40px"
											marginTop="24px"
											onClick={() => {
												setIsOpen(!isOpen);
												toast.close(id);
											}}>
											<Text fontSize={'16px'} fontWeight="600">
												{i18n('viewMoreProgress')}
											</Text>
										</Button>
									</Box>
								),
							});
						}
					}}>
					<Text fontSize={'16px'} fontWeight="600">
						{isOpen ? i18n('hideProgress') : i18n('showProgress')}
					</Text>
				</Button>
>>>>>>> 4f964410d (Feat: updated logic for open close, switch from pop over to toast, added additional style logic)
			</HStack>
			<Progress
				value={80}
				height={'80px'}
				colorScheme="gray"
				zIndex={'1'}
				width="100%"
				bg="ampNeutral.50"
			/>
		</Box>
	);
};

export default TestProgressBarMenu;
