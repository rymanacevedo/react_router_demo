import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import AmpBox from '../../standard/container/AmpBox';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
	Confidence,
	QuestionInFocus,
} from '../../pages/AssignmentView/AssignmentTypes';
import { findQuestionInFocus } from '../../pages/AssignmentView/findQuestionInFocus';

export default function Submission() {
	const { t: i18n } = useTranslation();
	const navigate = useNavigate();
	const {
		questionTrigger,
		assignmentUid,
		moduleInfoAndQuestions,
		roundData,
		setSelectedAnswer,
		setQuestionInFocus,
	} = useOutletContext<any>();

	const handleNavigation = (question: QuestionInFocus) => {
		setQuestionInFocus(
			findQuestionInFocus(
				moduleInfoAndQuestions,
				roundData,
				false,
				false,
				question.displayOrder - 1,
			),
		);
		const answerInFocus = question.answerList.find((answer) => answer.selected);

		const selectedAnswerObj = answerInFocus
			? { id: answerInFocus.id, confidence: question.confidence! }
			: question.confidence === Confidence.NotSure
			? { id: 1, confidence: Confidence.NotSure }
			: { id: null, confidence: Confidence.NA };

		setSelectedAnswer(selectedAnswerObj);
		navigate(
			`/learning/timedAssessment/${assignmentUid}/${questionTrigger.id.toString()}`,
		);
	};
	useEffect(() => {
		if (!!questionTrigger) {
			handleNavigation(questionTrigger);
		}
	}, [questionTrigger]);
	return (
		<AmpBox>
			<Heading as="h2" fontSize="2xl" mb={6}>
				{i18n('reviewAndSubmit')}
			</Heading>

			<ButtonGroup>
				<Button>{i18n('submitAndFinish')}</Button>
				<Button colorScheme="ampSecondary" variant="ghost">
					{i18n('returnToQuestions')}
				</Button>
			</ButtonGroup>
		</AmpBox>
	);
}
