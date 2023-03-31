//@ts-nocheck
import { useState } from 'react';
import { Box, Container, HStack, useMediaQuery } from '@chakra-ui/react';
import TestProgressBarMenu from '../../ui/TestProgressBarMenu';
import ProgressMenu from '../../ui/ProgressMenu';
import Question from '../../ui/Question';

import AnswerArea from '../../ui/AnswerInput/AnswerArea';

const StaticAssignmentView = () => {
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const questionData: any[] = [];
	const currentRoundQuestionListData: any[] = [];
	const questionInFocus: any[] = [];
	const currentRoundAnswerOverLayData: any[] = [];

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
					currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
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
							w="100%"
							maxWidth={726}
							h={isSmallerThan1000 ? '' : '745px'}
							overflow="hidden"
							borderRadius={24}
							p={'72px'}>
							<Question questionInFocus={questionInFocus} />
						</Box>
						<AnswerArea
							isOpen={isInstructionalOverlayOpen}
							onClose={onClose}
							smallerThan1000={isSmallerThan1000}
							initialFocusRef={initRef}
							showOverlay={showOverlay}
							questionInFocus={questionInFocus}
							selectedAnswers={selectedAnswers}
							selectedAnswersState={setSelectedAnswers}
							clearSelection={clearSelection}
							clearSelectionState={setClearSelection}
							currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
							onClick={continueBtnFunc}
							clearSelectionFunction={clearSelectionButtonFunc}
							IDKResponse={IDKResponse}
							setIDKResponse={setIDKResponse}
						/>
					</HStack>
					<ProgressMenu
						isMenuOpen={isMenuOpen}
						currentRoundQuestionListData={currentRoundQuestionListData}
						currentRoundAnswerOverLayData={currentRoundAnswerOverLayData}
					/>
				</HStack>
			</Container>
		</main>
	);
};

export default StaticAssignmentView;
