import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	HStack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useModuleContentService from '../../../services/coursesServices/useModuleContentService';
import MultipleChoiceAnswers from '../../ui/MultipleChoiceAnswers';
import useCurrentRoundService from '../../../services/coursesServices/useCurrentRoundService';
import MultipleChoiceOverLay from '../../ui/MultipleChoiceOverLay';
import {
	AnswerData,
	CurrentRoundAnswerOverLayData,
	CurrentRoundQuestionListData,
	QuestionInFocus,
	SelectedAnswers,
} from './AssignmentViewTypes';
import { findQuestionInFocus } from './findQuestionInFocus';

const AssignmentView = () => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isOpen, setIsOpen] = useState(false);
	const [questionInFocus, setQuestionInFocus] = useState<QuestionInFocus>({
		id: '',
		questionRc: '',
		publishedQuestionId: '',
		answerList: [{ answerRc: '', id: '' }],
	});

	const [currentRoundQuestionListData, setCurrentRoundQuestionListData] =
		useState<CurrentRoundQuestionListData>({
			id: '',
			questionList: [
				{
					publishedQuestionId: '',
					id: '',
					questionRc: '',
					answerList: [{ id: '', answerRc: '' }],
				},
			],
		});

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
	const [showoverLay, setShowOverLay] = useState(false);
	const [answerData, setAnswerData] = useState<AnswerData>({
		answerDate: '',
		answerList: [],
		avatarMessage: null,
		completionAlgorithmType: null,
		completionPercentage: 0,
		confidence: null,
		correctAnswerIds: null,
		correctness: null,
		informedCount: 0,
		masteredQuestionCount: 0,
		misinformedCount: 0,
		moduleComplete: false,
		notSureCount: 0,
		onceCorrectCount: 0,
		questionSeconds: 0,
		questionsMastered: 0,
		reviewSeconds: 0,
		self: null,
		totalQuestionCount: 0,
		twiceCorrectCount: 0,
		uninformedCount: 0,
		unseenCount: 0,
	});
	const [clearSelection, setClearSelection] = useState(false);
	const [questionSeconds, setQuestionSeconds] = useState(0);
	const { assignmentKey } = useParams();

	const { fetchModuleQuestions } = useModuleContentService();
	const { getCurrentRound, putCurrentRound } = useCurrentRoundService();
	useEffect(() => {
		const intervalId = setInterval(() => {
			setQuestionSeconds((prevSeconds) => prevSeconds + 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);
	useEffect(() => {
		const fetchModuleQuestionsData = async () => {
			try {
				let [currentRoundQuestionsResponse, moduleQuestionsResponse] = [
					await getCurrentRound(assignmentKey?.slice(1)),
					await fetchModuleQuestions(assignmentKey?.slice(1)),
				];
				setCurrentRoundQuestionListData(currentRoundQuestionsResponse);
				if (moduleQuestionsResponse && currentRoundQuestionsResponse) {
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
		if (assignmentKey) {
			fetchModuleQuestionsData();
		}
	}, [assignmentKey]);

	useEffect(() => {
		const putCurrentRoundRes = async () => {
			const overLayData = await putCurrentRound(
				currentRoundQuestionListData.id,
				questionInFocus.id,
				answerData,
			);
			setCurrentRoundAnswerOverLayData(overLayData);
			setShowOverLay(true);
		};
		if (currentRoundQuestionListData?.id && questionInFocus?.id && answerData) {
			putCurrentRoundRes();
		}
	}, [answerData]);

	const submitAnswer = () => {
		setAnswerData((answerDataArg: any) => {
			const findDateData = () => {
				const now = new Date();
				const offset = now.getTimezoneOffset() * -1;
				const offsetHours = Math.floor(offset / 60);
				const offsetMinutes = offset % 60;
				const offsetString = ` ${offset >= 0 ? '+' : '-'}${Math.abs(offsetHours)
					.toString()
					.padStart(2, '0')}${offsetMinutes.toString().padStart(2, '0')}`;
				const year = now.getFullYear();
				const month = (now.getMonth() + 1).toString().padStart(2, '0');
				const day = now.getDate().toString().padStart(2, '0');
				const hours = now.getHours().toString().padStart(2, '0');
				const minutes = now.getMinutes().toString().padStart(2, '0');
				const seconds = now.getSeconds().toString().padStart(2, '0');

				const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetString}`;
				return dateString;
			};

			return {
				...answerDataArg,
				answerDate: findDateData(),
				questionSeconds: questionSeconds,
				answerList: [...selectedAnswers],
			};
		});
		setQuestionSeconds(0);
	};

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
							<Question questionInFocus={questionInFocus} />
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
							{!showoverLay ? (
								<MultipleChoiceAnswers
									questionInFocus={questionInFocus}
									selectedAnswers={selectedAnswers}
									setSelectedAnswers={setSelectedAnswers}
									clearSelection={clearSelection}
									setClearSelection={setClearSelection}
								/>
							) : (
								<MultipleChoiceOverLay
									questionInFocus={questionInFocus}
									selectedAnswers={selectedAnswers}
									setSelectedAnswers={setSelectedAnswers}
									clearSelection={clearSelection}
									setClearSelection={setClearSelection}
									currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
								/>
							)}
							<HStack
								justifyContent={'space-between'}
								display={'flex'}
								marginTop={'12px'}>
								<Button
									onClick={() => {
										submitAnswer();
									}}
									variant={'ampSolid'}
									w="150px">
									<Text>
										{i18n(showoverLay ? 'continueBtnText' : 'submitBtnText')}
									</Text>
								</Button>
								<Button
									_hover={{ backgroundColor: 'white' }}
									height="12px"
									variant="ghost"
									onClick={() => {
										setSelectedAnswers([]);
										setClearSelection(true);
									}}>
									{!showoverLay && (
										<Text fontSize={'14px'} color={'ampSecondary.500'}>
											{i18n('clearSelection')}
										</Text>
									)}
								</Button>
							</HStack>
						</Box>
					</HStack>
					<ProgressMenu isOpen={isOpen} />
				</HStack>
			</Container>
		</main>
	);
};

export default AssignmentView;
