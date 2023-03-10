import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import MultipleChoiceOverLay from '../../ui/MultipleChoiceOverLay';
import {
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	QuestionInFocus,
	SelectedAnswers,
} from '../AssignmentView/AssignmentTypes';
import { findQuestionInFocus } from '../AssignmentView/findQuestionInFocus';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import WhatYouNeedToKnowComponent from '../../ui/WhatYouNeedToKnowComponent';

const AssignmentView = () => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [questionInFocus, setQuestionInFocus] = useState<QuestionInFocus>({
		id: '',
		questionRc: '',
		publishedQuestionId: '',
		answerList: [{ answerRc: '', id: '' }],
	});

	// eslint-disable-next-line
	const [localQuestionHistory, setLocalQuestionHistory] = useLocalStorage(
		'questionHistory',
		null,
	);

	const [currentRoundQuestionListData, setCurrentRoundQuestionListData] =
		useState<CurrentRoundQuestionListData>();
	const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers[]>([]);
	const [currentRoundAnswerOverLayData, setCurrentRoundAnswerOverLayData] =
		useState<CurrentRoundAnswerOverLayData>({
			self: null,
			totalQuestionCount: 0,
			masteredQuestionCount: 0,
			unseenCount: 0,
			misinformedCount: 0,
			uninformedCount: 0,
			notSureCount: 0,
			informedCount: 0,
			onceCorrectCount: 0,
			twiceCorrectCount: 0,
			completionPercentage: 0,
			completionAlgorithmType: '',
			questionsMastered: 0,
			questionSeconds: 0,
			reviewSeconds: 0,
			answerDate: '',
			correctness: '',
			confidence: '',
			correctAnswerIds: [],
			moduleComplete: false,
			avatarMessage: null,
			answerList: [],
		});
	const [questionData, setQuestionData] = useState({
		learningUnits: [{ questions: [] }],
		kind: '',
		name: '',
	});

	const [clearSelection, setClearSelection] = useState(false);
	const { assignmentKey } = useParams();
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { fetchModuleQuestions } = useModuleContentService();
	const { getCurrentRound } = useCurrentRoundService();

	const fetchModuleQuestionsData = async () => {
		try {
			let [currentRoundQuestionsResponse, moduleQuestionsResponse] = [
				await getCurrentRound(assignmentKey),
				await fetchModuleQuestions(assignmentKey),
			];

			if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
				const savedData = localQuestionHistory?.roundQuestionsHistory?.find(
					(questionHistory: { answeredQuestionId: any }) => {
						return (
							questionHistory.answeredQuestionId ===
							findQuestionInFocus(
								moduleQuestionsResponse,
								currentRoundQuestionsResponse,
							).id
						);
					},
				);
				setSelectedAnswers(savedData.answersChosen);
				setCurrentRoundAnswerOverLayData((roundAnswerOverLayData) => {
					return {
						...roundAnswerOverLayData,
						correctAnswerIds: [...savedData.correctAnswerIds],
					};
				});
				setQuestionData(moduleQuestionsResponse);
				setCurrentRoundQuestionListData(currentRoundQuestionsResponse);
				setQuestionInFocus(
					findQuestionInFocus(
						moduleQuestionsResponse,
						currentRoundQuestionsResponse,
					),
				);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (assignmentKey) {
			fetchModuleQuestionsData();
		}
	}, [assignmentKey]);

	return (
		<main id="learning-assignment">
			<Container
				id={'learning-assignment'}
				margin="0"
				padding="0"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<TestProgressBarMenu
					questionData={questionData}
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={setIsMenuOpen}
					currentRoundQuestionListData={currentRoundQuestionListData}
					currentQuestion={questionInFocus}
				/>{' '}
				<HStack width="100%">
					<HStack
						w="100%"
						p="12px"
						justifyContent={'center'}
						flexWrap={isSmallerThan1000 ? 'wrap' : 'nowrap'}>
						<Box
							style={{
								backgroundColor: 'white',
								margin: '6px',
							}}
							boxShadow="2xl"
							maxW="xl"
							w="100%"
							maxWidth={726}
							h={isSmallerThan1000 ? '' : '745px'}
							overflow="hidden"
							borderRadius={24}
							p={'72px'}>
							<Question
								questionInFocus={questionInFocus}
								review={true}
								currentRoundQuestionListData={currentRoundQuestionListData}
							/>
						</Box>
						<Box
							style={{
								backgroundColor: 'white',
								margin: '6px',
								minHeight: '745px',
							}}
							boxShadow="2xl"
							maxW="xl"
							h={isSmallerThan1000 ? '' : '100%'}
							display={'flex'}
							flexDirection="column"
							justifyContent={'space-between'}
							w="100%"
							maxWidth={726}
							overflow="hidden"
							borderRadius={24}
							p={'72px'}>
							<MultipleChoiceOverLay
								questionInFocus={questionInFocus}
								selectedAnswers={selectedAnswers}
								setSelectedAnswers={setSelectedAnswers}
								clearSelection={clearSelection}
								setClearSelection={setClearSelection}
								currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
							/>

							<HStack
								justifyContent={'space-between'}
								display={'flex'}
								marginTop={'12px'}>
								<Button onClick={onOpen} variant={'ampSolid'} w="200px">
									<Text>{i18n('explainBtnText')}</Text>
								</Button>
							</HStack>
						</Box>
					</HStack>
					<ProgressMenu
						isMenuOpen={isMenuOpen}
						currentRoundQuestionListData={currentRoundQuestionListData}
					/>
					<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
            <WhatYouNeedToKnowComponent introductionRc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
				</HStack>
			</Container>
		</main>
	);
};

export default AssignmentView;
