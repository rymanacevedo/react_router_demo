import { useState } from 'react';
import {
	Box,
	Button,
	Container,
	Divider,
	Heading,
	HStack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../ui/TestProgressBarMenu';
import ProgressMenu from '../ui/ProgressMenu';
import Question from '../ui/Question';
import AnswerInput from '../ui/AnswerInput';
import { useTranslation } from 'react-i18next';
import { ArrowRightIcon } from '@radix-ui/react-icons';

const AssignmentView = () => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isOpen, setIsOpen] = useState(false);

	return (
		<main id="learning-assignment">
			<Container
				id={'learning-assignment'}
				margin="0"
				padding="0"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<TestProgressBarMenu isOpen={isOpen} setIsOpen={setIsOpen} />
				<HStack width="100%">
					<HStack
						w="100%"
						p="12px"
						justifyContent={'center'}
						flexWrap={isSmallerThan1000 ? 'wrap' : 'nowrap'}>
						<Question
							title="Question"
							questionIntro={
								'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'
							}
							questionStem={
								'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'
							}
						/>
						<Box
							style={{
								backgroundColor: 'white',
							}}
							boxShadow="2xl"
							maxW="xl"
							h={isSmallerThan1000 ? '' : '745px'}
							display={'flex'}
							flexDirection="column"
							justifyContent={'space-between'}
							w="100%"
							maxWidth={726}
							m="12px"
							overflow="hidden"
							borderRadius={24}
							p={'72px'}>
							<Box>
								<Heading as="h2">{'Answer'}</Heading>
								<Box
									marginTop="34px"
									display="flex"
									flexDirection={'column'}
									justifyContent="space-between"
									h="100%">
									<AnswerInput />
									<AnswerInput />
									<AnswerInput />
									<AnswerInput />
								</Box>
								<Divider
									display={isSmallerThan1000 ? 'none' : 'block'}
									marginTop="43px"
								/>
							</Box>

							<HStack
								justifyContent={'space-between'}
								display={isSmallerThan1000 ? 'none' : 'flex'}>
								<Button variant={'ampSolid'}>
									<Text>{i18n('submitBtnText')}</Text>
								</Button>
								<Button
									_hover={{ backgroundColor: 'white' }}
									height="12px"
									variant="ghost">
									<Text fontSize={'14px'} color={'ampSecondary.500'}>
										{i18n('clearSelection')}
									</Text>
								</Button>
							</HStack>
						</Box>
						<Box
							display={isSmallerThan1000 ? 'flex' : 'none'}
							style={{
								backgroundColor: 'white',
								marginTop: '12px',
							}}
							boxShadow="2xl"
							maxW="xl"
							h={isSmallerThan1000 ? '' : '745px'}
							flexDirection="column"
							justifyContent={'space-between'}
							w="100%"
							maxWidth={726}
							m="12px"
							overflow="hidden"
							borderRadius={24}
							p={'24px'}>
							<Button variant={'ampSolid'} rightIcon={<ArrowRightIcon />}>
								<Text>{i18n('nextQ')}</Text>
							</Button>
						</Box>
					</HStack>
					<ProgressMenu isOpen={isOpen} />
				</HStack>
			</Container>
		</main>
	);
};

export default AssignmentView;
