import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import AmpBox from '../../standard/container/AmpBox';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../../routes/TimedAssessment';
import { findQuestionInFocus } from '../../pages/AssignmentView/findQuestionInFocus';

export default function Submission() {
	const { t: i18n } = useTranslation();
	const {
		questionTrigger,
		setQuestionTrigger,
		handleNavigation,
		moduleInfoAndQuestions,
		roundData,
	} = useOutletContext<OutletContext>();

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
				<Button
					onClick={() => {
						setQuestionTrigger(
							findQuestionInFocus(
								moduleInfoAndQuestions,
								roundData,
								false,
								false,
							),
						);
					}}
					colorScheme="ampSecondary"
					variant="ghost">
					{i18n('returnToQuestions')}
				</Button>
			</ButtonGroup>
		</AmpBox>
	);
}
