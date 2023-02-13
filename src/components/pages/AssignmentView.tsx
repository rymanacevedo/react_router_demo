import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	HStack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../ui/TestProgressBarMenu';
import ProgressMenu from '../ui/ProgressMenu';
import Question from '../ui/Question';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import useModuleContentService from '../../services/coursesServices/useModuleContentService';
import MultipleChoiceAnswers from '../ui/MultipleChoiceAnswers';
import useCurrentRoundService from '../../services/coursesServices/useGetCurrentRound';

export interface AnswerObject {
	answerId: number | string;
	confidence: number;
	selectedOptionId: number;
	self: any;
}

export interface QuestionType1 {
	totalQuestionCount: number;
	masteredQuestionCount: number;
	roundNumber: number | any;
	roundPhase: string | any;
}

const AssignmentView = () => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isOpen, setIsOpen] = useState(false);
	const [questionData, setQuestionData] = useState({
		learningUnits: [{ questions: [] }],
		kind: '',
		name: '',
	});
/* eslint-disable */
const [currentRoundQuestionData, setCurrentRoundQuestionData] = useState<QuestionType1>();
	/* eslint-enable */

	const [questionInFocus, setQuestionInFocus] = useState({
		questionRc: '',
		answers: [{ answerRc: '', id: '' }],
	});

	const [selectedAnswers, setSelectedAnswers] = useState<AnswerObject[]>([]);
	const [clearSelection, setClearSelection] = useState(false);
	const { assignmentKey } = useParams();

	const { fetchModuleQuestions } = useModuleContentService();
	const { getCurrentRound } = useCurrentRoundService();
	const location = useLocation();

	useEffect(() => {
		const fetchModuleQuestionsData = async () => {
			try {
				let [currentRoundQuestionsResponse, moduleQuestionsResponse] = [
					await getCurrentRound(assignmentKey),
					await fetchModuleQuestions(assignmentKey),
				];
				setQuestionData(moduleQuestionsResponse);
				setCurrentRoundQuestionData(currentRoundQuestionsResponse);
			} catch (error) {
				console.error(error);
			}
		};
		if (assignmentKey) {
			fetchModuleQuestionsData();
		}
	}, [assignmentKey]);

	useEffect(() => {
		if (questionData?.learningUnits?.length) {
			setQuestionInFocus(questionData.learningUnits[0].questions[0]);
		}
	}, [questionData]);

	const progressPercent = currentRoundQuestionData
		? currentRoundQuestionData.totalQuestionCount /
		  currentRoundQuestionData.masteredQuestionCount
		: 0;

	const estimatedTimeRemaining = () => {
		const time = location?.state?.estimatedTimeToComplete;
		let hour = 0;
		let min = 0;

		if (time == null || time <= 0) {
			return '';
		}

		if (time >= 3600) {
			// over an hour
			hour = time / 3600;
			min = Math.ceil((time % 3600) / 60);

			return `About ${hour} hr ${min} mins remaining.`;
		} else {
			// under one hour
			min = Math.ceil(time / 60);

			return `About ${min} mins remaining.`;
		}
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
				<TestProgressBarMenu
					assignmentType={questionData.kind}
					title={questionData.name}
					timeLeft={estimatedTimeRemaining()}
					progress={progressPercent}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					roundNumber={currentRoundQuestionData?.roundNumber}
					roundPhase={currentRoundQuestionData?.roundPhase}
					totalQuestionCount={currentRoundQuestionData?.totalQuestionCount}
				/>
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
							<MultipleChoiceAnswers
								questionInFocus={questionInFocus}
								selectedAnswers={selectedAnswers}
								setSelectedAnswers={setSelectedAnswers}
								clearSelection={clearSelection}
								setClearSelection={setClearSelection}
							/>
							<HStack
								justifyContent={'space-between'}
								display={'flex'}
								marginTop={'12px'}>
								<Button variant={'ampSolid'} w="150px">
									<Text>{i18n('submitBtnText')}</Text>
								</Button>
								<Button
									_hover={{ backgroundColor: 'white' }}
									height="12px"
									variant="ghost"
									onClick={() => {
										setSelectedAnswers([]);
										setClearSelection(true);
									}}>
									<Text fontSize={'14px'} color={'ampSecondary.500'}>
										{i18n('clearSelection')}
									</Text>
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
