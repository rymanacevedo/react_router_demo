import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Image,
	Text,
	HStack,
	Center,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Step1ModalGraphic from '../../introImage.svg';
import { Cookies } from 'react-cookie-consent';
import StaticAssignmentView from './AssignmentView/StaticAssignmentView';

type Step1ModalProps = {
	tourStep: number;
	setTourStep: (value: ((prevState: number) => number) | number) => void;
	setAnsIndex: (value: ((prevState: number) => number) | number) => void;
};

function Step1Modal({ tourStep, setTourStep, setAnsIndex }: Step1ModalProps) {
	const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	const nav = useNavigate();
	const { t: i18n } = useTranslation();

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
				<ModalOverlay bg="rgba(41, 61, 89, 0.8)" backdropFilter="auto" />
				<ModalContent p="24px" w="720px">
					<ModalCloseButton
						onClick={() => {
							nav(-1);
						}}
					/>
					<ModalBody p="24px">
						<Center>
							<Image
								align="center"
								pl="5"
								src={Step1ModalGraphic}
								alt="How to use Amplifire"
							/>
						</Center>

						<ModalHeader pl="0" fontSize={24}>
							{i18n('step1ModalTitle')}
						</ModalHeader>
						<Text>{i18n('step1ModalContent')}</Text>
					</ModalBody>

					<ModalFooter justifyContent="flex-start">
						<Text color="rgba(0, 0, 0, 0.5)" mr="auto">
							{i18n('step')} {tourStep} {i18n('of6')}
						</Text>
						<HStack>
							<Text
								as="u"
								color="rgba(0, 0, 0, 0.5)"
								mr={3}
								cursor="pointer"
								onClick={() => {
									nav(-1);
								}}>
								{i18n('skipTour')}
							</Text>

							<Button
								onClick={() => {
									setTourStep(tourStep + 1);
									setAnsIndex(1500);
									onClose();
								}}>
								{i18n('nextBtn')}
							</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

const TourView = () => {
	const [tourStep, setTourStep] = useState(1);
	const [ansIndex, setAnsIndex] = useState(0);
	const [barIndex, setBarIndex] = useState(0);
	useEffect(() => {
		Cookies.set('seen_tour', window.btoa('seen_tour'), {
			path: '/',
		});
	}, []);

	return (
		<>
			<Step1Modal
				tourStep={tourStep}
				setTourStep={setTourStep}
				setAnsIndex={setAnsIndex}
			/>
			<StaticAssignmentView
				tourStep={tourStep}
				setTourStep={setTourStep}
				ansIndex={ansIndex}
				setAnsIndex={setAnsIndex}
				barIndex={barIndex}
				setBarIndex={setBarIndex}
			/>
		</>
	);
};
export default TourView;
