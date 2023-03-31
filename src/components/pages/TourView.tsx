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
} from '@chakra-ui/react';
import Step1ModalGraphic from '../../introImage.svg';
import { Cookies } from 'react-cookie-consent';

type Step1ModalProps = {
	tourStep: number;
	setTourStep: (value: ((prevState: number) => number) | number) => void;
};

function Step1Modal({ tourStep, setTourStep }: Step1ModalProps) {
	const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
	const nav = useNavigate();

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>How to use Amplifire</ModalHeader>
					<ModalCloseButton
						onClick={() => {
							nav(-1);
						}}
					/>
					<ModalBody p="8">
						<Image src={Step1ModalGraphic} alt="How to use Amplifire" />
						<Text mt="5">
							Our goal is to provide you with a focused, efficient path to
							mastering and retaining the information you need to be successful.
							The adaptive system you are using was developed based on
							scientific studies of how people can learn most efficiently. Click
							through the tour to get to know how Amplifire works.
						</Text>
					</ModalBody>

					<ModalFooter justifyContent="flex-start">
						<Text color="rgba(0, 0, 0, 0.5)" mr="auto">
							Step {tourStep} of 6
						</Text>
						<HStack>
							<Text color="rgba(0, 0, 0, 0.5)" mr={3}>
								Skip the tour
							</Text>
							{/* <Button colorScheme='blue' mr={3} onClick={onClose}>
				Close
			  </Button> */}

							<Button
								onClick={() => {
									setTourStep(tourStep + 1);
									nav(-1);
								}}>
								Next
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
	useEffect(() => {
		Cookies.set('seen_tour', window.btoa('seen_tour'), {
			path: '/',
		});
	}, []);

	return (
		<>
			<Step1Modal tourStep={tourStep} setTourStep={setTourStep} />;
		</>
	);
};
export default TourView;
