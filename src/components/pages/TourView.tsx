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
import Step1ModalGraphic from '../../introImage.svg';
import { Cookies } from 'react-cookie-consent';
import StaticAssignmentView from './AssignmentView/StaticAssignmentView';

type Step1ModalProps = {
	tourStep: number;
	setTourStep: (value: ((prevState: number) => number) | number) => void;
};

function Step1Modal({ tourStep, setTourStep }: Step1ModalProps) {
	const { isOpen } = useDisclosure({ defaultIsOpen: true });
	const nav = useNavigate();

	return (
		<>
			<Modal isOpen={isOpen} onClose={() => nav(-1)} size={'xl'}>
				<ModalOverlay />
				<ModalContent p="24px" w="720px">
					<ModalCloseButton />
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
							How to use Amplifire
						</ModalHeader>
						<Text>
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
							<Text
								as="u"
								color="rgba(0, 0, 0, 0.5)"
								mr={3}
								cursor="pointer"
								onClick={() => {
									nav(-1);
								}}>
								Skip the tour
							</Text>

							<Button
								onClick={() => {
									setTourStep(tourStep + 1);
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
			<Step1Modal tourStep={tourStep} setTourStep={setTourStep} />
			<StaticAssignmentView />
		</>
	);
};
export default TourView;
